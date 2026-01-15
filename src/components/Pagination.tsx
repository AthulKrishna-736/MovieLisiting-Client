import { PaginationProps } from "../types/favorites.types";

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
        <div>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            {pages.map((page, idx) =>
                page === "..." ? (
                    <span key={`dots-${idx}`} >
                        ...
                    </span>
                ) : (
                    <button
                        key={`page-${page}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;