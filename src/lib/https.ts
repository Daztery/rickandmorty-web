import { headers } from "next/headers";

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}
async function resolveUrl(input: string): Promise<string> {
  if (/^https?:\/\//i.test(input)) return input;
  if (typeof window !== "undefined") return input;

  try {
    const h = await headers(); // 👈 ahora sí
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
    return `${proto}://${host}${input}`;
  } catch {
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.SITE_URL ??
      "http://localhost:3000";
    return `${base}${input}`;
  }
}

export async function httpGet<T>(
  url: string,
  init?: RequestInit & { revalidate?: number }
): Promise<ApiResult<T>> {
  const { revalidate = 60, ...rest } = init ?? {};
  const finalUrl = await resolveUrl(url);

  try {
    const res = await fetch(finalUrl, { ...rest, next: { revalidate } });
    const status = res.status;
    const body = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      data?: T;
      message?: string;
    };

    if (!res.ok || body.success === false) {
      return {
        success: false,
        error: body.message || `HTTP ${status}`,
        status,
      };
    }
    return { success: true, data: body.data as T, status };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return { success: false, error: message, status: 0 };
  }
}
