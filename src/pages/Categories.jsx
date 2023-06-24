import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import notify from "../hooks/useNotification";
import { useState } from "react";
import SkeletonRow from "../components/SkeletonRow";

function Categories({
  categoriesList,
  setCategoriesList,
  BaseURL,
  config,
  isCategoriesLoading,
}) {
  const navigate = useNavigate();
  // console.log("catLoading", isCategoriesLoading);
  const handleDeleteCategory = async (categoryID) => {
    try {
      const res = await axios.delete(
        `${BaseURL}/api/v1/categories/${categoryID}`,
        config
      );
      console.log(res);
      const newCategoriesList = categoriesList.filter(
        (category) => category._id !== categoryID
      );
      notify("The category deleted successfully", "success");
      setCategoriesList(newCategoriesList);
      navigate("/categories");
    } catch (error) {
      let errors = [];
      console.log(error);
      if (error.errors) {
        errors = error.errors.map((err) => err);
      }
      errors.forEach((err) => notify(err, "error"));
      console.dir(errors);
    }
  };

  return (
    <>
      <div className="flex justify-between border-b border-base-300 p-2 items-center mb-4">
        <h1 className="font-bold text-lg uppercase text-center">
          Categories LIST
        </h1>
        <Link
          to="/categories/addcategory/add"
          className="btn btn-outline btn-primary btn-sm"
        >
          <i className="fa-solid fa-circle-plus"></i>
          Add Category
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>CATEGORY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          {isCategoriesLoading ? (
            <SkeletonRow />
          ) : (
            <tbody>
              {categoriesList?.length === 0 ? (
                <h1 className="border-b-2 border-base-300 pb-20 pt-4">
                  No Categories to show ...
                </h1>
              ) : (
                categoriesList?.map((category) => {
                  return (
                    <tr key={category?._id}>
                      <td>{category?._id}</td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={category?.image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div className="font-bold capitalize">
                            {category?.name}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="join">
                          <Link
                            to={`/categories/addcategory/${category?._id}`}
                            className="btn btn-sm join-item text-emerald-500"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <label
                            className="btn btn-sm join-item text-red-600"
                            htmlFor={`my_modal_${category?._id}`}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </label>
                        </div>
                        <input
                          type="checkbox"
                          id={`my_modal_${category?._id}`}
                          className="modal-toggle"
                        />
                        <div className="modal">
                          <div className="modal-box flex flex-col items-center">
                            <h3 className="font-bold text-3xl text-primary">
                              <i className="fa-solid fa-circle-exclamation"></i>
                            </h3>
                            <p className="py-4">
                              Are you sure you want to delete this category?
                            </p>
                            <div className="flex gap-3 modal-action">
                              <label
                                className="btn btn-error"
                                onClick={() =>
                                  handleDeleteCategory(category?._id)
                                }
                                htmlFor={`my_modal_${category?._id}`}
                              >
                                Yes
                              </label>
                              <label
                                className="btn btn-gray"
                                htmlFor={`my_modal_${category?._id}`}
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default Categories;
