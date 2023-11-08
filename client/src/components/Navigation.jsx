import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { navMenuItems } from "../constant/index";

export default function Navigation({ smallDev }) {
  return (
    <nav className={`${smallDev ? "" : "max-md:hidden"}`}>
      <ul className={`${smallDev ? "gap-4` flex flex-col" : "flex gap-4"}`}>
        {navMenuItems.map((item) => (
          <li key={item.name} className="font-bold">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-brand-green"
                  : "text-brand-text hover:text-brand-text"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  smallDev: PropTypes.bool,
};
