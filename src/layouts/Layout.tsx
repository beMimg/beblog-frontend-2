import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 flex flex-col p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
