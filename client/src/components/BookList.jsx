import { categories } from "../constant";
import BookCard from "./BookCard";
import SectionHeading from "./SectionHeading";

export default function BookList() {
  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <SectionHeading
          titleSmall="LATEST BOOKS"
          titleBlue="Best books from"
          titleGreen="Our best categories"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 max-sm:grid-cols-2 sm:grid-cols-3">
        {categories.map((category) => (
          <BookCard key={category.name} book={category} />
        ))}
      </div>
    </div>
  );
}
