import React, { useContext, useState } from "react";
import { Link } from "react-scroll";
import { ThemeContext } from "../themeProvider";
import { motion, AnimatePresence } from "framer-motion";
import Hamburger from "hamburger-react";

const Navbar = () => {
  const theme = useContext(ThemeContext);
  const [toggle, setToggle] = useState(false);
  const darkMode = theme.state.darkMode;

  const links = [
    { name: "Home", route: "home" }, // FIXED: changed "/" to "home"
    { name: "About", route: "about" },
    { name: "Services", route: "services" },
    { name: "Projects", route: "projects" },
    { name: "Contact", route: "contact" },
  ];

  function toggleTheme() {
    theme.dispatch({ type: darkMode ? "LIGHTMODE" : "DARKMODE" });
  }

  return (
    <>
      <nav className={darkMode ? "bg-white shadow-lg fixed w-full top-0 z-50" : "bg-gray-700 shadow-lg fixed w-full top-0 z-50"}>
        <div className="flex justify-between items-center py-4 px-4 mx-auto max-w-7xl">
          <div className="flex items-center cursor-pointer">
            <a href="/hello" className={darkMode ? "text-xl font-medium text-black" : "text-xl font-medium text-white"}>
              {`<Ɽ₳J₳₮  гａＪ𝔸ᵗ />`}
            </a>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <ul className="flex space-x-6 text-md font-medium">
              {links.map((el) => (
                <li key={el.route} className="cursor-pointer">
                  <Link
                    to={el.route}
                    activeClass="text-white bg-blue-500"
                    spy={true}
                    smooth={true}
                    offset={-70} // for fixed navbar adjustment
                    duration={500}
                    className={darkMode ? "py-2 px-3 text-black hover:bg-blue-500 hover:text-white rounded-md" : "py-2 px-3 text-white hover:bg-blue-500 hover:text-black rounded-md"}
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div onClick={toggleTheme}>
              {darkMode ? (
                <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-sun-lighting-flaticons-flat-flat-icons.png" className="w-6 cursor-pointer" alt="Sun" />
              ) : (
                <img src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-moon-astrology-and-symbology-prettycons-lineal-color-prettycons.png" className="w-6 cursor-pointer" alt="Moon" />
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center">
            <div onClick={toggleTheme} className="mr-4">
              {darkMode ? (
                <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-sun-lighting-flaticons-flat-flat-icons.png" className="w-6 cursor-pointer" alt="Sun" />
              ) : (
                <img src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-moon-astrology-and-symbology-prettycons-lineal-color-prettycons.png" className="w-6 cursor-pointer" alt="Moon" />
              )}
            </div>

            <Hamburger toggled={toggle} toggle={setToggle} size={22} duration={0.8} distance="lg" color={darkMode ? "#000000" : "#ffffff"} />
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0, transition: { type: "spring" } }}
            exit={{ x: 200, transition: { type: "spring" } }}
            className={darkMode ? "bg-white fixed top-16 right-2 w-40 rounded-lg shadow-lg z-50 py-2" : "bg-black fixed top-16 right-2 w-40 rounded-lg shadow-lg z-50 py-2"}
          >
            <ul>
              {links.map((el) => (
                <Link
                  key={el.route}
                  to={el.route}
                  activeClass="text-white bg-blue-500"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={() => setToggle(false)}
                  className={darkMode ? "block px-3 py-2 text-black hover:bg-blue-500 hover:text-white rounded-md" : "block px-3 py-2 text-white hover:bg-blue-500 hover:text-black rounded-md"}
                >
                  <li>{el.name}</li>
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
