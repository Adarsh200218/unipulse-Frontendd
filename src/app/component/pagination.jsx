// src/components/Pagination.jsx

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    // 🔥 Show only nearby pages (current ±2)
    const getPageNumbers = () => {
        const pages = [];

        for (
            let i = Math.max(1, currentPage - 2);
            i <= Math.min(totalPages, currentPage + 2);
            i++
        ) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex justify-end items-center gap-2 mt-6 mb-10">

            {/* 🔙 Prev Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
            >
                Prev
            </button>

            {/* 🔢 Page Numbers */}
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 border rounded ${currentPage === page
                            ? "bg-green-600 text-white"
                            : "bg-white"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* 🔜 Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
            >
                Next
            </button>

        </div>
    );
}