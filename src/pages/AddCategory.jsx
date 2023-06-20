function AddCategory() {
  return (
    <>
      <h1>Add Category Page</h1>
      <form>
        <div>
          <img
            className="w-40 h-40 rounded-lg"
            src="https://www.pinclipart.com/picdir/big/98-985554_ew-plant-upload-clipart.png"
          />

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Upload Category Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
          </div>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Category Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <button className="btn btn-primary mt-4">Create Category</button>
      </form>
    </>
  );
}

export default AddCategory;
