import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { object, string, mixed } from "yup";
import notify from "../hooks/useNotification";
import { useEffect } from "react";

function AddCategory({ BaseURL, token, categoriesList, setCategoriesList }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState();

  const [onChangeInputImage, setOnChangeInputImage] = useState(false);

  const [errors, setErrors] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  // console.log(categoryImage);
  const onChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.categoryName;
    setErrors(newErrors);
  };
  const onChangeCategoryImage = (e) => {

    setOnChangeInputImage(true);
    // setCategoryImage(true);

    // console.log(e.target.files[0]);
    setCategoryImage(e.target.files[0]);
    console.log(categoryImage);
    const newErrors = { ...errors };
    delete newErrors.categoryImage;
    setErrors(newErrors);
  };

  const AddNewCategorySchema = object({
    categoryName: string().min(5).max(30).required(),
    categoryImage: mixed().required(),
  });

  useEffect(() => {
    async function getCategoryById() {
      const { data } = await axios.get(`${BaseURL}/api/v1/categories/${id}`);
      // console.log(data);
      setCategoryName(data.data.name);
      setCategoryImage(data.data.image);
    }
    if (id !== "add") {
      getCategoryById();
    }

  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await AddNewCategorySchema.validate(
        {
          categoryName,
          categoryImage,
        },
        { abortEarly: false }
      );
      const formData = new FormData();
      formData.append("name", result.categoryName);
      formData.append("image", result.categoryImage);
      // console.log("result", result);
      if (id === "add") {
        const { data } = await axios.post(
          `${BaseURL}/api/v1/categories`,
          formData,
          config
        );
        notify(data.message, "success");

        setTimeout(() => {
          // console.log("helloo");
          navigate("/categories");
        }, 1000);
        setCategoriesList([...categoriesList, data.data]);
        setOnChangeInputImage(false);
        // console.log(data);
      } else {
        // console.log("clicked");
        if (onChangeInputImage) {
          const imageFormData = new FormData();
          imageFormData.append("image", categoryImage);
          // console.log(categoryImage);
          const responseImage = await axios.put(
            `${BaseURL}/api/v1/categories/updatePhoto/${id}`,
            imageFormData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(responseImage.data);
          setOnChangeInputImage(false);
        }
        const { data } = await axios.put(
          `${BaseURL}/api/v1/categories/${id}`,
          { ...(categoryName && { name: categoryName }) },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        notify("Category Updated Successfully", "success");
        setTimeout(() => {
          // console.log("helloo");
          navigate("/categories");
        }, 1000);
        const newUpdatedCategoryList = categoriesList?.filter(
          (category) => category._id !== id
        );
        setCategoriesList([data.data, ...newUpdatedCategoryList]);

      }
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
          {id === "add" ? "Add New Category" : "Edit Category"}
        </h1>
        <Link to="/categories" className="btn btn-outline btn-primary btn-sm">
          <i className="fa-solid fa-chevron-left"></i>
          Back
        </Link>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <img
            className="w-40 h-40 rounded-lg self-center"
            src={`${
              id === "add"
                ? categoryImage
                  ? URL.createObjectURL(categoryImage)
                  : "https://www.xeratekuae.com/wp-content/uploads/2016/09/default-product-image-500x383@2x.jpg"
                : categoryImage
            }`}
          />

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-semibold">
                Upload Category Image
              </span>
            </label>
            <input
              type="file"
              onChange={onChangeCategoryImage}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
          </div>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Category Name</span>
          </label>
          <input
            value={categoryName}
            onChange={onChangeCategoryName}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <button className="btn btn-primary mt-4" type="submit">
          {id === "add" ? "Create Category" : "Update Category"}
        </button>
      </form>
    </>
  );
}

export default AddCategory;
