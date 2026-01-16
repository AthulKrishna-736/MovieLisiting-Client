import React from "react";
import { PaginationProps } from "../types/component.types";

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const createPages = (): Array<number | "..."> => {
        const pages: Array<number | "..."> = [];
        const delta = 2;
        const range: number[] = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        let last: number | undefined;

        for (const i of range) {
            if (last !== undefined) {
                if (i - last === 2) {
                    pages.push(last + 1);
                } else if (i - last > 2) {
                    pages.push("...");
                }
            }
            pages.push(i);
            last = i;
        }

        return pages;
    };

    const pages = createPages();

    return (
        <div className="flex bg-white p-4 rounded-md items-center justify-center gap-1 mt-6">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-1 text-sm border rounded disabled:opacity-40 cursor-pointer"
            >
                Prev
            </button>

            {pages.map((page, idx) =>
                page === "..." ? (
                    <span
                        key={`dots-${idx}`}
                        className="px-2 text-sm text-neutral-500"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={`page-${page}`}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 text-sm border rounded cursor-pointer ${page === currentPage ? "bg-black text-white border-black" : "hover:bg-neutral-100"}`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-1 text-sm border rounded disabled:opacity-40 cursor-pointer"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;