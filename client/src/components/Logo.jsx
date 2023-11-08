import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <div>
      <Link to="/">
        <img
          src="/library-lovers-logo.png"
          alt="company logo"
          className="h-14 max-md:h-10"
        />
      </Link>
    </div>
  );
}
