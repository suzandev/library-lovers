import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function Pagination({ pages }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentPage = Number(searchParam.get("page")) || 1;

  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  const nextPage = () => {
    let newPage = currentPage + 1;
    if (newPage > pages) {
      newPage = 1;
    }

    searchParam.set("page", newPage.toString());
    setSearchParam(searchParam);
  };

  const prevPage = () => {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      newPage = pages;
    }

    searchParam.set("page", newPage.toString());
    setSearchParam(searchParam);
  };

  const randomPage = (pageNumber) => {
    searchParam.set("page", pageNumber.toString());
    setSearchParam(searchParam);
  };

  return (
    <div className="my-6 flex items-center justify-between gap-5">
      <button
        className="grid h-10 w-10 place-items-center bg-brand-green text-white"
        onClick={prevPage}
      >
        <HiChevronDoubleLeft />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`${
            currentPage === page
              ? "bg-brand-white text-brand-green"
              : "bg-brand-green text-white"
          } grid h-10 w-10 place-items-center max-md:hidden`}
          onClick={() => randomPage(page)}
        >
          {page}
        </button>
      ))}

      <div className="hidden max-md:block">
        <span className="text-brand-green">{currentPage}</span> of {pages}
      </div>

      <button
        className="grid h-10 w-10 place-items-center bg-brand-green text-white"
        onClick={nextPage}
      >
        <HiChevronDoubleRight />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
};
