import "./pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const createPages = () => {
        const pages = [];
        const delta = 2;
        const range = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        let l;
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    pages.push(l + 1);
                } else if (i - l > 2) {
                    pages.push("...");
                }
            }
            pages.push(i);
            l = i;
        }

        return pages;
    };

    const pages = createPages();

    return (
        <div className="pagination">
            <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            {pages.map((page, idx) =>
                page === "..." ? (
                    <span key={idx} className="dots">
                        ...
                    </span>
                ) : (
                    <button
                        key={idx}
                        className={`page-btn ${currentPage === page ? "active" : ""}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
