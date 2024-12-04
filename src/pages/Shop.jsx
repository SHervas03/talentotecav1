import { useState, useEffect } from "react";
import ShopData from "../data/Tienda";

function Shop() {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petCount, setPetCount] = useState(0); // Número de mascotas

  // Cargar el número de mascotas y el carrito desde sessionStorage al montar el componente
  useEffect(() => {
    const storedPets = JSON.parse(sessionStorage.getItem("pets")) || [];
    setPetCount(storedPets.length);

    const storedCart = JSON.parse(sessionStorage.getItem("cart"));
    if (storedCart && storedCart.length > 0) {
      setCart(storedCart); // Cargar el carrito solo si no está vacío
    }
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  // Guardar el carrito en sessionStorage cada vez que cambie
  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    } else {
      sessionStorage.removeItem("cart");
    }
  }, [cart]);

  // Función para calcular el precio total con descuento basado en el número de mascotas
  const calculateTotalPrice = () => {
    const basePrice = cart.reduce((total, item) => total + item.price, 0);  // Sumar los precios de todos los productos en el carrito

    // Variables para los descuentos
    let discount = 0;
    //if (petCount >= 3 && petCount < 20) {
      //discount = basePrice * 0.3;  
    //} else if (petCount > 1 && petCount <= 2) {
      //discount = basePrice * 0.2;  
    //}

    const totalPrice = basePrice - discount; // Aplicar el descuento
    return { totalPrice, discount };
  };

  // Calcular el precio total y el descuento
  const { totalPrice, discount } = calculateTotalPrice();

  // Añadir producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Eliminar producto del carrito
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Abrir/Cerrar modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Botón Cesta */}
      {cart.length > 0 && (
        <div className="flex w-full justify-end p-4">
          <button
            onClick={toggleModal}
            className="rounded-md bg-kelloggs px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-kelloggsHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Cesta
          </button>
        </div>
      )}

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-3">
        {ShopData.map((product) => (
          <div key={product.id}>
            <div className="max-w-auto bg-white border border-gray-200 rounded-lg shadow">
              <div className="p-5">
                {/* Título */}
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
                  {product.title}
                </h5>

                {/* Descripción */}
                <p className="mb-3 font-normal text-gray-700 line-clamp-2">
                  {product.description}
                </p>

                {/* Precio */}
                <p className="mb-4 text-lg font-semibold text-gray-800">
                  Precio: ${product.price.toFixed(2)}
                </p>

                {/* Botón añadir */}
                <button
                  onClick={() => addToCart(product)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-kelloggs rounded-lg hover:bg-kelloggsHover focus:ring-4 focus:outline-none focus:ring-indigo-600"
                >
                  Añadir a la cesta
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Tu Cesta</h3>
            {cart.length > 0 ? (
              <div>
                <ul className="space-y-3">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <h4 className="text-sm font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 text-sm font-semibold hover:underline"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-bold mt-4">
                  Total: ${totalPrice.toFixed(2)}
                </p>
                {discount > 0 && (
                  <p>Descuento aplicado: -${discount.toFixed(2)}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-600">Tu cesta está vacía.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleModal}
                className="bg-gray-300 px-4 py-2 rounded-md text-sm font-semibold text-gray-800 hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
