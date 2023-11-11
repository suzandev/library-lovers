import PropTypes from "prop-types";
import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout({ children }) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="overflow-auto">
        <main className="mx-auto max-w-6xl max-xl:px-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
