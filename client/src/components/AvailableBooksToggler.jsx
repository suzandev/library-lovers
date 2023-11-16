import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AvailableBooksToggler() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [availAbleBooks, setAvailAbleBooks] = useState(false);

  useEffect(() => {
    if (availAbleBooks) {
      searchParam.set("abo", "true");
    } else {
      searchParam.delete("abo");
    }
    setSearchParam(searchParam);
  }, [availAbleBooks, searchParam, setSearchParam]);

  return (
    <div className="flex  items-center gap-2 max-sm:mb-6">
      <span className="text-brand-text">Available books only</span>
      <input
        type="checkbox"
        className="toggle checked:bg-brand-green checked:border-brand-green bg-zinc-500"
        checked={availAbleBooks}
        onChange={() => setAvailAbleBooks(!availAbleBooks)}
      />
    </div>
  );
}
