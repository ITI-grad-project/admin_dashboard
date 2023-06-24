import { Link, NavLink, useNavigate } from "react-router-dom";

function AsideBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // setLoginState(false);
    // window.location.href = "/";
    navigate("/login");
  };
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 h-[100vh]  rounded-lg transition-transform hidden md:block"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col px-3 py-4 justify-between overflow-y-auto bg-secondary rounded-tr-xl rounded-br-xl ">
          <div>
            <Link to="/" className="flex items-center pl-2.5 mb-5">
              <img src="../../public/images/logoo.png" className="w-52" />
            </Link>

            <ul className="space-y-2 font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary flex items-center p-2  rounded-lg "
                      : "flex items-center p-2  rounded-lg text-white hover:text-primary"
                  }
                >
                  <i className="fa-solid fa-house-chimney"></i>
                  <span className="ml-3">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary flex items-center p-2  rounded-lg "
                      : "flex items-center p-2  rounded-lg text-white hover:text-primary"
                  }
                >
                  <i className="fa-solid fa-receipt"></i>
                  <span className="flex-1 ml-3 whitespace-nowrap ">Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary flex items-center p-2  rounded-lg "
                      : "flex items-center p-2  rounded-lg text-white hover:text-primary"
                  }
                >
                  <i className="fa-solid fa-dolly"></i>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Products
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary flex items-center p-2  rounded-lg "
                      : "flex items-center p-2  rounded-lg text-white hover:text-primary"
                  }
                >
                  <i className="fa-solid fa-table-list"></i>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Categories
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary flex items-center p-2  rounded-lg "
                      : "flex items-center p-2  rounded-lg text-white hover:text-primary"
                  }
                >
                  <i className="fa-solid fa-users"></i>
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            onClick={handleLogout}
            className="flex items-center p-2 text-white text-xl hover:text-primary hover:cursor-pointer border-t-2"
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AsideBar;
