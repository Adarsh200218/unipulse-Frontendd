import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";

export default function Page() {

    const {
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages
    } = usePagination();

    return (
        <>
            {/* tera data UI */}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
}