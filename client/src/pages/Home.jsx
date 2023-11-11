import BookList from "../components/BookList";
import Environment from "../components/Environment";
import SliderWrapper from "../components/SliderWrapper";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <section>
        <SliderWrapper />
      </section>
      <section>
        <Environment />
      </section>
      <section>
        <BookList />
      </section>
      <section>
        <Testimonials />
      </section>
    </>
  );
}
