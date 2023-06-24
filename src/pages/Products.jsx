import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import RangeInput from "../components/RangeInput.jsx";
import notify from "../hooks/useNotification.jsx";
import SkeletonRow from "../components/SkeletonRow.jsx";

function Products({ Categories, BaseURL }) {
  const MIN = 0;
  const MAX = 10000;
  const [product, setProduct] = useState([]);
  const pageSize = 6;
  const [noOfPages, setNoOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState();
  const [Values, setValues] = useState([MIN, MAX]);
  const [isPorductsLoading, setIsProductsLoading] = useState(false);
  // const [CurrentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(null);
  const [items, setItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentCountry, setCurrentCountry] = useState(0);
  const [price, setPrice] = useState([]);
  const { id } = useParams();
  let countries = ["Egypt", "Ismailia", "Portsaid", "Alexandria"];
  let url = `${BaseURL}/api/v1/products?`;
  const [verify, setVerify] = useState(0);
  /// get data
  useEffect(() => {
    setIsProductsLoading(true);
    async function getData() {
      try {
        if (currentCategory != 0) {
          url += `category=${currentCategory}&`;
        }
        if (currentCountry != 0) {
          console.log(currentCountry);
          url += `country=${currentCountry}&`;
          console.log(url);
        }
        if (currentCategory == 0) {
          url = `${BaseURL}/api/v1/products?`;
          console.log(url);
        }
        if (price.length) {
          url = url.replace(/price\[gte\]=\d+&?/, "");
          url = url.replace(/price\[lte\]=\d+&?/, "");
          url += `price[gte]=${price[0]}&price[lte]=${price[1]}`;
          console.log(url);
          console.log(price);
        }
        if (verify === 0) {
          url = `${BaseURL}/api/v1/products?`;
        }
        if (verify !== 0) {
          url += `verified=${verify}&`;
        }
        console.log(url);
        const { data } = await axios.get(`${url}`, {
          headers: {
            role: "admin",
          },
        });
        console.log(data);
        setIsProductsLoading(false);
        setCurrentPage(1);
        setProduct(data.data);
        setNoOfPages(Math.ceil(data.data.length / pageSize));
      } catch (error) {
        setIsProductsLoading(false);
        console.log(error);
      }
    }
    getData();
  }, [currentCategory, currentCountry, price, verify]);

  /// pagination
  const pages = Array(noOfPages)
    .fill(0)
    .map((item, i) => i + 1);
  const start = currentPage * pageSize - pageSize;
  const end = start + pageSize;
  const itemsToRender = product?.slice(start, end);
  const changeCurrentPage = (page) => {
    setCurrentPage(page);
  };
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      accept: "application/json",
    },
  };
  /// handle delete
  async function handleDelete(id) {
    try {
      const res = await axios.delete(
        `https://bekya.onrender.com/api/v1/products/${id}`,
        config
      );

      const newProductList = product.filter((pro) => pro._id !== id);
      setProduct(newProductList);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleVerify(id) {
    try {
      const { data } = await axios.put(
        `${BaseURL}/api/v1/products/verify/${id}`,
        {
          verified: "true",
        },
        config
      );
      notify("Verified Successfully", "success");
      const newProducts = product.filter((p) => p._id !== id);
      console.log("new products", newProducts);
      setProduct([data.data, ...newProducts]);

      console.log("product", product);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-between border-b border-base-300">
        <h1 className="font-bold text-lg uppercase text-center mb-5">
          Products
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mt-5">
        <div className="rounded-lg border-[2px] border-[#ECE8E8] lg:col-span-3 lg:min-w-[15rem] w-20px col-span-12 h-fit font-['Roboto'] px-10">
          <h2 className="text-xl text-primary font-[700] mb-2 mt-3">
            Categories
          </h2>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="radio"
                name="radio-6"
                className="radio radio-primary mr-5 radio-xs"
                defaultChecked
                value={"All"}
                onClick={(event) => {
                  console.log(event.target.value);
                  setCurrentCategory(0);
                }}
              />
              <span className="label-text text-base text-[#2D2D2D] font-[700]">
                All
              </span>
            </label>
          </div>
          {Categories?.map((category, index) => {
            return (
              <div className="form-control" key={index}>
                <label className="label cursor-pointer justify-start">
                  <input
                    type="radio"
                    name="radio-6"
                    value={category.name}
                    className="radio radio-primary mr-5 radio-xs"
                    checked={currentCategory === category?._id}
                    onClick={(event) => {
                      console.log(event.target.value);
                      setCurrentCategory(category?._id);
                    }}
                  />
                  <span className="label-text text-base text-[#2D2D2D] font-[700]">
                    {category?.name}
                  </span>
                </label>
              </div>
            );
          })}

          <hr></hr>
          <h2 className="text-xl text-primary font-[700] my-3">Country</h2>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="radio"
                name="radio-7"
                className="radio radio-primary mr-5 radio-xs"
                defaultChecked
                onClick={() => {
                  console.log("here");
                  setCurrentCountry(0);
                }}
              />
              <span className="label-text text-base text-[#2D2D2D] font-[700]">
                All
              </span>
            </label>
          </div>
          {countries.map((item, index) => {
            return (
              <div className="form-control" key={index}>
                <label className="label cursor-pointer justify-start">
                  <input
                    type="radio"
                    name="radio-7"
                    className="radio radio-primary mr-5 radio-xs"
                    onClick={() => {
                      console.log(item);
                      setCurrentCountry(item);
                    }}
                  />
                  <span className="label-text text-base text-[#2D2D2D] font-[700]">
                    {item}
                  </span>
                </label>
              </div>
            );
          })}

          <hr></hr>
          <h2 className="text-xl text-primary font-[700] my-3">Status</h2>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="radio"
                name="radio-8"
                className="radio radio-primary mr-5 radio-xs"
                defaultChecked
                onClick={() => {
                  console.log("here");
                  setVerify(0);
                }}
              />
              <span className="label-text text-base text-[#2D2D2D] font-[700]">
                All
              </span>
            </label>
            <label className="label cursor-pointer justify-start">
              <input
                type="radio"
                name="radio-8"
                className="radio radio-primary mr-5 radio-xs"
                onClick={() => {
                  setVerify(true);
                  console.log("here");
                }}
              />
              <span className="label-text text-base text-[#2D2D2D] font-[700]">
                Verified
              </span>
            </label>
            <label className="label cursor-pointer justify-start">
              <input
                type="radio"
                name="radio-8"
                className="radio radio-primary mr-5 radio-xs"
                onClick={() => {
                  setVerify(false);
                  console.log("here");
                }}
              />
              <span className="label-text text-base text-[#2D2D2D] font-[700]">
                Not verified
              </span>
            </label>
          </div>
          <hr></hr>
          <h2 className="text-xl text-primary font-[700] mt-3 mb-2">
            Price Range
          </h2>
          <div className="flex flex-col mb-4">
            <RangeInput
              Values={Values}
              setValues={setValues}
              MIN={MIN}
              MAX={MAX}
            />
            <button
              onClick={() => setPrice(Values)}
              className="btn btn-primary mt-6 text-white w-full uppercase"
            >
              apply price
            </button>
          </div>
        </div>
        <div className="flex flex-col ">
          {/* <div className="flex justify-between border-b border-base-300">
            <h1 className="font-bold text-lg uppercase text-center">
              Products Page
            </h1>
          </div> */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="table table-fixed">
              <thead>
                <tr>
                  <th className="sm:w-1/4">Name</th>
                  <th className="sm:w-1/4">Description</th>
                  <th className="sm:w-1/4">Price</th>
                  <th className="sm:w-1/4">Status</th>
                  <th className="sm:w-1/4">Delete</th>
                  <th className="sm:w-1/4">verification</th>
                </tr>
              </thead>
              {isPorductsLoading ? (
                <SkeletonRow />
              ) : (
                <tbody>
                  {itemsToRender?.length > 0 ? (
                    <>
                      {itemsToRender?.map((ele) => {
                        const truncatedDescription =
                          ele?.description?.length > 10
                            ? ele.description.substring(0, 10) + "..." // Truncate and add ellipsis
                            : ele.description;
                        return (
                          <tr>
                            <td>
                              <div className="flex items-center space-x-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img
                                      src={ele?.images[0]?.image}
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="capitalize font-bold">
                                    {ele.title}
                                  </div>
                                  <div className="text-xs ">
                                    {ele.category.name}
                                  </div>{" "}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="truncate">
                                {truncatedDescription}
                              </div>{" "}
                              <br />
                            </td>
                            <td>{ele.price}</td>
                            <th>
                              <div>
                                {ele.verified ? (
                                  <div className="badge w-fit h-fit badge-success gap-2">
                                    Verified
                                  </div>
                                ) : (
                                  <div className="badge w-fit h-fit badge-error gap-2">
                                    Not Verified
                                  </div>
                                )}
                              </div>
                            </th>
                            <th>
                              <label
                                className="btn btn-sm join-item text-red-600"
                                htmlFor={`my_modal_${ele._id}`}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </label>

                              <input
                                type="checkbox"
                                id={`my_modal_${ele._id}`}
                                className="modal-toggle"
                              />
                              <div className="modal">
                                <div className="modal-box flex flex-col items-center">
                                  <h3 className="font-bold text-3xl text-primary">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                  </h3>
                                  <p className="py-4">
                                    Are you sure you want to delete this
                                    Product?
                                  </p>
                                  <div className="flex gap-3 modal-action">
                                    <label
                                      className="btn btn-error"
                                      onClick={() => handleDelete(ele._id)}
                                      htmlFor={`my_modal_${ele._id}`}
                                    >
                                      Yes
                                    </label>
                                    <label
                                      className="btn btn-gray"
                                      htmlFor={`my_modal_${ele._id}`}
                                    >
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </th>
                            <th>
                              <div>
                                {ele.verified ? (
                                  <div></div>
                                ) : (
                                  <div>
                                    <label
                                      className="btn btn-sm join-item text-green-600"
                                      htmlFor={`my_modal_v${ele._id}`}
                                    >
                                      Verify
                                    </label>

                                    <input
                                      type="checkbox"
                                      id={`my_modal_v${ele._id}`}
                                      className="modal-toggle"
                                    />
                                    <div className="modal">
                                      <div className="modal-box flex flex-col items-center">
                                        <h3 className="font-bold text-3xl text-primary">
                                          <i className="fa-solid fa-circle-exclamation"></i>
                                        </h3>
                                        <p className="py-4">
                                          Are you sure you want to verify this
                                          Product?
                                        </p>
                                        <div className="flex gap-3 modal-action">
                                          <label
                                            className="btn btn-success"
                                            onClick={() =>
                                              handleVerify(ele._id)
                                            }
                                            htmlFor={`my_modal_v${ele._id}`}
                                          >
                                            Yes
                                          </label>
                                          <label
                                            className="btn btn-gray"
                                            htmlFor={`my_modal_v${ele._id}`}
                                          >
                                            No
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </th>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <div className="flex items-center justify-center p-8">
                      <p className="text-lg text-primary">
                        There is no Products available.
                      </p>
                    </div>
                  )}
                </tbody>
              )}
            </table>

            {pages.length > 1 && (
              <div className="btn-group flex justify-center mt-6  w-full mb-6">
                {pages.map((page) => (
                  <button
                    onClick={() => changeCurrentPage(page)}
                    key={page}
                    className={`btn ${
                      currentPage === page ? "btn-active" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
