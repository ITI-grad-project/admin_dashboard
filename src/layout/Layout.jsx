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
        <div className="grid grid-rows-3 grid-flow-col mx-12">
          <div className="row-span-3">
            <AsideBar />
          </div>
          <div className="col-span-3">
            <NavBar />
          </div>
          <div className="row-span-2 col-span-3">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
};

export default Layout;
