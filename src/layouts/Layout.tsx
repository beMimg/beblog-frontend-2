import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 flex flex-col p-4 py-10">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
