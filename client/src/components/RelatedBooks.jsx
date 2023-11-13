import { sliderContent } from "../constant";
import BookCard from "./BookCard";

export default function RelatedBooks() {
  return (
    <div className="my-6">
      <h1 className="text-brand-text my-4 text-3xl max-sm:text-lg">
        Related Books
      </h1>
      <div className="grid gap-4 max-sm:grid-cols-2 sm:grid-cols-3">
        {sliderContent.slice(0, 3).map((category) => (
          <BookCard key={category.name} book={category} type="book" />
        ))}
      </div>
    </div>
  );
}
