import { useEffect } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

export default function Pagination() {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentPage = Number(searchParam.get("page"));

  const totalPages = 10;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const nextPage = () => {
    let newPage = currentPage + 1;
    if (newPage > totalPages) {
      newPage = 1;
    }

    searchParam.set("page", newPage.toString());
    setSearchParam(searchParam);
  };

  const prevPage = () => {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      newPage = totalPages;
    }

    searchParam.set("page", newPage.toString());
    setSearchParam(searchParam);
  };

  const randomPage = (pageNumber) => {
    searchParam.set("page", pageNumber.toString());
    setSearchParam(searchParam);
  };

  useEffect(() => {
    if (!currentPage) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [currentPage, searchParam, setSearchParam]);

  return (
    <div className="my-6 flex items-center justify-between gap-5">
      <button
        className="bg-brand-green grid h-10 w-10 place-items-center text-white"
        onClick={prevPage}
      >
        <HiChevronDoubleLeft />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`${
            currentPage === page
              ? "text-brand-green bg-brand-white"
              : "bg-brand-green text-white"
          } grid h-10 w-10 place-items-center max-md:hidden`}
          onClick={() => randomPage(page)}
        >
          {page}
        </button>
      ))}

      <div className="hidden max-md:block">
        <span className="text-brand-green">{currentPage}</span> of {totalPages}
      </div>

      <button
        className="bg-brand-green grid h-10 w-10 place-items-center text-white"
        onClick={nextPage}
      >
        <HiChevronDoubleRight />
      </button>
    </div>
  );
}
