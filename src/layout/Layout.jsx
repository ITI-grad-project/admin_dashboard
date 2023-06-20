import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import AsideBar from "../components/AsideBar";

const Layout = () => {
  const location = useLocation();

  // Check if the current route is the login route
  const isLoginRoute = location.pathname === "/login";
  //   const isErrorRoute = location.pathname === "/*";

  if (isLoginRoute) {
    return <Outlet />;
  } else {
    return (
      <>
        <div className="grid grid-cols-12 gap-8 mx-12 my-4">
          <div className="col-span-3">
            <AsideBar />
          </div>
          <div className="col-span-9">
            <NavBar />
            <Outlet />
          </div>
        </div>
      </>
    );
  }
};

export default Layout;
