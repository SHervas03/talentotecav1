import { Outlet, useLocation } from "react-router";
import Nav from "../components/layout/nav/Nav";
import Footer from "../components/layout/footer/Footer";
import { useEffect } from "react";

function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Inicio";
        break;
      case "/Recetas":
        document.title = "Recetas";
        break;
      case "/FAQ":
        document.title = "FAQ";
        break;
      case "/Registro":
        document.title = "Registro";
        break;
      case "/Mascotas":
        document.title = "Mascotas";
        break;
      case "/Tienda":
        document.title = "Tienda";
        break;
      default:
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
