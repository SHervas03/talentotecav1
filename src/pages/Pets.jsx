import { useState, useEffect } from "react";

function Pets() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pets, setPets] = useState([]); // Estado para las mascotas
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    weight: "",
    age: "",
    illnesses: "",
    physicalActivity: "",
    size: "Grande",
    preferences: "",
  });

  // Comprobar el valor de isRegistered al montar el componente
  useEffect(() => {
    const registeredStatus = sessionStorage.getItem("isRegistered");
    setIsRegistered(registeredStatus === "true");
  }, []);

  // Recuperar mascotas desde sessionStorage al montar el componente
  useEffect(() => {
    const storedPets = JSON.parse(sessionStorage.getItem("pets")) || [];
    if (storedPets.length > 0) {
      setPets(storedPets); // Solo cargar si hay mascotas válidas
    }
  }, []);

  // Guardar mascotas en sessionStorage cada vez que se actualice el estado de pets
  useEffect(() => {
    sessionStorage.setItem("pets", JSON.stringify(pets));
  }, [pets]);

  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Función para guardar la mascota
  const savePet = () => {
    setPets((prevPets) => [...prevPets, petData]);
    setPetData({
      name: "",
      breed: "",
      weight: "",
      age: "",
      size: "Grande",
    });
    closeModal();
  };

  // Función para eliminar una mascota
  const deletePet = (index) => {
    setPets((prevPets) => prevPets.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center">
      {isRegistered ? (
        <>
          <div className="flex w-full justify-end p-4">
            <button
              onClick={openModal}
              className="rounded-md bg-kelloggs px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-kelloggsHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Añadir Mascota
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-full p-4">
            {pets.map((pet, index) => (
              <div
                key={index}
                className="max-w-auto bg-white border border-gray-200 rounded-lg shadow"
              >
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold text-gray-900">{pet.name}</h5>
                  <p className="mb-3 text-sm text-gray-700">Raza: {pet.breed}</p>
                  <p className="mb-3 text-sm text-gray-700">Peso: {pet.weight} kg</p>
                  <p className="mb-3 text-sm text-gray-700">Edad: {pet.age} años</p>
                  <p className="mb-3 text-sm text-gray-700">Tamaño: {pet.size}</p>
                  <button
                    onClick={() => deletePet(index)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1 className="my-4 text-xl font-bold text-gray-800">Necesario registrarse</h1>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="relative w-full max-w-xl bg-white p-5 rounded-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-900">Añadir Mascota</h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
              >
                ×
              </button>
            </div>
            {/* Modal Body */}
            <div className="py-4">
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={petData.name}
                  onChange={handleChange}
                  className="w-full border-gray-300 border border-gray-300 rounded-md p-2"
                />
                <input
                  type="text"
                  name="breed"
                  placeholder="Raza"
                  value={petData.breed}
                  onChange={handleChange}
                  className="w-full border-gray-300 border border-gray-300 rounded-md p-2"
                />
                <input
                  type="number"
                  name="weight"
                  placeholder="Peso (kg)"
                  value={petData.weight}
                  onChange={handleChange}
                  className="w-full border-gray-300 border border-gray-300 rounded-md p-2"
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Edad (años)"
                  value={petData.age}
                  onChange={handleChange}
                  className="w-full border-gray-300 border border-gray-300 rounded-md p-2"
                />                
                <select
                  name="size"
                  value={petData.size}
                  onChange={handleChange}
                  className="w-full border-gray-300 border border-gray-300 rounded-md p-2"
                >
                  <option value="Grande">Grande</option>
                  <option value="Mediano">Mediano</option>
                  <option value="Pequeño">Pequeño</option>
                </select>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="flex justify-end">
              <button
                onClick={savePet}
                className="rounded-md bg-kelloggs px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-kelloggsHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Guardar Mascota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pets;
