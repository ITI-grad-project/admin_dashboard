import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Users() {
  const [UsersList, setUsersList] = useState([]);

  const BaseURL = "https://bekya.onrender.com";
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    async function getAllUsers() {
      const { data } = await axios.get(
        `${BaseURL}/api/v1/user/AllUserData`,
        config
      );
      setUsersList(data.data);
      console.log(data.data);
    }
    getAllUsers();
  }, []);

  const handleDeleteUser = async (UserID) => {
    try {
      const res = await axios.delete(
        `${BaseURL}/api/v1/user/${UserID}`,
        config
      );
      console.log(res);
      const newUsersList = UsersList.filter((User) => User._id !== UserID);
      setUsersList(newUsersList);
      notify("The user has deleted successfully", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between border-b border-base-300 p-2 items-center mb-4 pt-16">
        <h1 className="font-bold text-lg uppercase text-center">Users LIST</h1>
        {/* <Link
          to="/adduser/add"
          className="btn btn-outline btn-primary btn-sm"
        >
          <i className="fa-solid fa-circle-plus"></i>
          Add Category
        </Link> */}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-[16px]">
              <th>Users</th>
              <th>Register Date</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Total Orders</th>
              <th>Total Products</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {UsersList?.filter(
              (filteredUser) => filteredUser?.role === "user"
            ).map((user) => {
              return (
                <tr key={user?._id} className="cursor-pointer">
                  <td>
                    <div className="flex items-center space-x-3">
                      <Link to={`/users/userDetails/${user?._id}`}>
                        <div className="avatar">
                          <div className="rounded-full w-12 h-12">
                            <img
                              src={user?.profileImg}
                              alt="Avatar Tailwind CSS Component"
                              className="object-cover object-center"
                            />
                          </div>
                        </div>
                      </Link>
                      <Link to={`/users/userDetails/${user?._id}`}>
                        <div className="font-bold capitalize">
                          {user?.userName}
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td>{user?.createdAt}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="join flex justify-center">
                      {/* <Link
                        to="/edituser"
                        className="btn btn-sm join-item text-emerald-500"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link> */}
                      <label
                        className="join-item text-red-600"
                        htmlFor={`my_modal_${user?._id}`}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </label>
                    </div>
                    <input
                      type="checkbox"
                      id={`my_modal_${user?._id}`}
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box flex flex-col items-center">
                        <h3 className="font-bold text-3xl text-primary">
                          <i className="fa-solid fa-circle-exclamation"></i>
                        </h3>
                        <p className="py-4">
                          Are you sure you want to delete this user?
                        </p>
                        <div className="flex gap-3 modal-action">
                          <label
                            className="btn btn-error"
                            onClick={() => handleDeleteUser(user?._id)}
                            htmlFor={`my_modal_${user?._id}`}
                          >
                            Yes
                          </label>
                          <label
                            className="btn btn-gray"
                            htmlFor={`my_modal_${user?._id}`}
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
