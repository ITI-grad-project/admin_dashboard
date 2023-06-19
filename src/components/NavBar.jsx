import { NavLink } from "react-router-dom";
import Avatar from "./avatar";

function NavBar() {
  return (
    <>
      <div className="navbar flex justify-between ">
        <div className=" form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered input-primary w-28 sm:w-80"
          />
        </div>
        <div className="flex gap-2 ">
          <div>
            <h1 className="text-sm font-semibold">Youssef Saied</h1>
            <p className="text-xs">Admin Profile</p>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-primary btn-circle avatar">
              <div className="w-10 rounded-full">
                <Avatar />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
          <div className="drawer sm:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="btn  drawer-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side z-10">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 h-full bg-secondary text-white">
                <li className="text-center text-xl">MYReFurB</li>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary flex items-center p-2  rounded-lg "
                        : "flex items-center p-2  rounded-lg text-white hover:text-primary"
                    }
                  >
                    <i class="fa-solid fa-house-chimney"></i>
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
                    <i class="fa-solid fa-receipt"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap ">
                      Orders
                    </span>
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
                    <i class="fa-solid fa-dolly"></i>
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
                    <i class="fa-solid fa-table-list"></i>
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
                    <i class="fa-solid fa-users"></i>
                    <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
