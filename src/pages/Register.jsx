import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    sessionStorage.setItem("isRegistered", "true"); // Guarda el estado en sessionStorage
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <div className="flex items-center justify-center sm:py-32 py-2">
      <form onSubmit={handleSubmit} className="max-w-xl w-full p-6 bg-white">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-5 py-2.5 text-sm font-medium text-white bg-kelloggs rounded-lg hover:bg-kelloggsHover focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Register;
