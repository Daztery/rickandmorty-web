"use client";

import Link from "next/link";
import { useMemo } from "react";

export interface PaginationProps {
  page: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({
  page,
  totalPages,
  basePath = "",
}: PaginationProps) {
  const pages = useMemo(() => {
    const w = 2;
    const s = new Set<number>([1, totalPages]);
    for (let p = page - w; p <= page + w; p++) {
      if (p >= 1 && p <= totalPages) s.add(p);
    }
    return Array.from(s).sort((a, b) => a - b);
  }, [page, totalPages]);

  const href = (p: number) => `${basePath}/?page=${p}`;

  return (
    <nav aria-label="Pagination" className="flex items-center gap-2">
      <Link
        href={href(page - 1)}
        aria-disabled={page <= 1}
        className={`px-3 py-1 rounded border ${
          page <= 1 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Prev
      </Link>

      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const gap = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center">
            {gap && <span className="mx-1">…</span>}
            <Link
              href={href(p)}
              aria-current={p === page ? "page" : undefined}
              className={`px-3 py-1 rounded border ${
                p === page ? "bg-black text-white" : ""
              }`}
            >
              {p}
            </Link>
          </span>
        );
      })}

      <Link
        href={href(page + 1)}
        aria-disabled={page >= totalPages}
        className={`px-3 py-1 rounded border ${
          page >= totalPages ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
