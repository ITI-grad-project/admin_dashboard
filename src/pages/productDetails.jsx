import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import StarIcon from "../assets/icons/StarIcon";

import LocationIcon from "../assets/icons/LocationIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";

const schema = yup.object({
  question: yup
    .string()
    .required("required field")
    .min(5, "Answer must be at least 5 characters"),
});

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexActive, setIndexActive] = useState(0);
  const [showFav, setShowFav] = useState(false);

  useEffect(() => {
    async function getProductDetails() {
      try {
        const { data } = await axios.get(
          `https://bekya.onrender.com/api/v1/products/${productId}`
        );
        console.log(data.data);
        setProduct(data?.data);
        setQuestions(data?.data?.questions);
        // setImages(data?.data?.images);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    }

    getProductDetails();
    // getProductQuestions();
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formSubmit = async (dataForm) => {
    try {
      setLoading(true);
      // Call Backend
      const { data } = await axios.post(
        `https://bekya.onrender.com/api/v1/questions/${product?._id}`,
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(data.questionData);
      handleAddNewQuestion(data?.questionData);
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between border-b border-base-300 p-2 items-center mb-4">
        <h1 className="font-bold text-lg uppercase text-center">
          Product Details
        </h1>
        <Link to="/products" className="btn btn-outline btn-primary btn-sm">
          <i className="fa-solid fa-chevron-left"></i>
          Back
        </Link>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start">
          {/* Images */}
          <div className="flex flex-col gap-6 lg:w-2/4">
            <div className="relative">
              <img
                src={product?.images[indexActive]?.image}
                alt=""
                className="w-full h-full object-cover aspect-square rounded-xl"
              />
            </div>
            <ul className="flex justify-evenly items-center flex-wrap">
              {product?.images?.map((image, index) => (
                <li
                  key={image._id}
                  onClick={() => setIndexActive(index)}
                  className={`${
                    index === indexActive &&
                    "ring ring-primary ring-offset-base-100 ring-offset-2 p-2 scale-75 transition-all duration-300 opacity-75"
                  } rounded-2xl overflow-hidden cursor-pointer`}
                >
                  <img
                    src={image?.image}
                    alt=""
                    className="w-28 h-28 rounded-md object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
          {/* INFO */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <h5 className="capitalize badge py-3 px-6 badge-primary badge-outline font-semibold tracking-wider">
              {product?.category?.name}
            </h5>
            <h3 className="text-secondary font-bold text-3xl capitalize">
              {product?.title}
            </h3>
            <p className="text-[#404040] text-lg capitalize">
              {product?.description}
            </p>
            <h4 className="text-secondary font-bold text-3xl my-3">
              EGP {product?.price}
            </h4>
            <div className="flex gap-2 items-center">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src={
                      product?.user?.profileImg ||
                      "https://www.pinclipart.com/picdir/big/394-3949395_stacey-scott-icono-de-mi-cuenta-png-clipart.png"
                    }
                    alt="user"
                  />
                </div>
              </div>
              <div>
                <h6 className="font-semibold">{product?.user?.userName}</h6>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-5"} h={"h-5"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-5"} h={"h-5"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-5"} h={"h-5"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-5"} h={"h-5"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-5"} h={"h-5"} />
                    </span>
                  </div>
                  <div className="text-[#404040] font-medium">
                    {"(0 Reviews)"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex ">
              <span className="pr-2 text-center">
                <LocationIcon w={"w-6"} h={"h-6"} />
              </span>
              {product?.country}
            </div>
            <div className="flex">
              <span className="pr-2 text-center">
                <PhoneIcon w={"w-6"} h={"h-6"} />
              </span>
              +2{product?.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
