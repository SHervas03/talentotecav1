import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import navLinks from "../../../data/NavLinks"
import logo from "../../../assets/logo.png"

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRegistered = sessionStorage.getItem("isRegistered");

  const handleLogout = () => {
    sessionStorage.removeItem("isRegistered"); // Establecer en false
    navigate("/"); // Redirige a la página de inicio o donde necesites
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para asignar clases condicionales
  const classNamePath = (path) => {
    const isActive =
      path === "/" ? location.pathname === path : location.pathname.startsWith(path);
    return isActive
      ? "text-kelloggs"
      : "text-black hover:text-kelloggsHover duration-300";
  };
  const classNamePathsm = (path) => {
    const isActive =
      path === "/" ? location.pathname === path : location.pathname.startsWith(path);
    return isActive
      ? "text-kelloggs"
      : "text-white hover:text-kelloggsHover duration-300";
  };


  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={logo}
            className="h-8"
            alt="Logo"
          />
        </Link>

        {/* Buttons and Menu Toggle */}
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
          {isRegistered && (
            <button
              onClick={handleLogout}
              className="text-white bg-kelloggs hover:bg-kelloggsHover focus:ring-4 focus:outline-none focus:ring-kelloggs font-medium rounded-lg text-sm px-4 py-2"
            >
              Cerrar sesión
            </button>
          )}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <div
          className={`hidden md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : ""
            }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium">
            {navLinks.map((link) => {
              if (link.name === "Registro" && isRegistered) {
                return null; // Si está registrado, no mostrar el enlace de Registro
              }
              return (
                <li key={link.name}>
                  <Link to={link.to} className={classNamePath(link.path)}>
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Fullscreen Navigation Menu for Mobile */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-90 flex items-center justify-center text-white md:hidden">
          <button
            type="button"
            className="absolute top-6 right-4 text-gray-400 hover:text-white"
            onClick={toggleMenu}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <ul className="flex flex-col items-center space-y-6 text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`${classNamePathsm(link.path)} text-lg`}
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
