import footerLinks from "../../../data/NavLinks"
import logo from "../../../assets/logo.png"

function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4">
      <div className="w-full  mx-auto p-4 md:py-8">
        {/* Logo y enlaces */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              className="h-8"
              alt="Logo"
            />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="hover:underline me-4 md:me-6">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Separador */}
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

        {/* Derechos reservados */}
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2024{" "}
          <a href="/" className="hover:underline">
            talent-T-JUN2024™
          </a>
          . Todos los Derechos Reservados
        </span>
      </div>
    </footer>
  );
}

export default Footer;
