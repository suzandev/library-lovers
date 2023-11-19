import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AvailableBooksToggler() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [availAbleBooks, setAvailAbleBooks] = useState(false);

  function getAvailAbleBooks() {
    if (!availAbleBooks) {
      searchParam.set("abo", !availAbleBooks);
    } else {
      searchParam.delete("abo");
    }
    setAvailAbleBooks(!availAbleBooks);
    setSearchParam(searchParam);
  }

  return (
    <div className="flex  items-center gap-2 max-sm:mb-6">
      <span className="text-brand-text">Available books only</span>
      <input
        type="checkbox"
        className="toggle bg-zinc-500 checked:border-brand-green checked:bg-brand-green"
        checked={availAbleBooks}
        onChange={getAvailAbleBooks}
      />
    </div>
  );
}
