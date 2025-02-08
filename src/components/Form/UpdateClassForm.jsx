import PropTypes from "prop-types";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload } from "../../api/utils";

const UpdateClassForm = ({ handleUpdate, classData }) => {
  const [uploadImage, setUploadImage] = useState({
    image: null,
    url: classData?.image || "",
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage({
        image: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    let uploadedImage = null;

    if (uploadImage?.image) {
      try {
        uploadedImage = await imageUpload(uploadImage.image);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    await handleUpdate(e, uploadedImage);
    setLoading(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Class Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                defaultValue={classData.name}
                placeholder="Class Name"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Class Description
              </label>
              <textarea
                id="description"
                placeholder="Write class description here..."
                className="block rounded-md focus:blue-300 w-full h-32 px-4 py-3 text-gray-800 border border-blue-300 bg-white focus:outline-blue-500"
                name="description"
                defaultValue={classData.description}
              ></textarea>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Price */}
            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Class Price
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="price"
                id="price"
                type="number"
                defaultValue={classData.price}
                placeholder="Price"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="p-4 w-full m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={handleImageChange}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500">
                      {uploadImage?.image?.name || "Upload Image"}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {uploadImage?.url && (
              <div className="flex gap-5 items-center">
                <img className="w-20" src={uploadImage.url} alt="Uploaded" />
                <p>
                  {uploadImage.image
                    ? `Image Size: ${uploadImage.image.size} Bytes`
                    : "Current Image"}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Update Class"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

UpdateClassForm.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  classData: PropTypes.object.isRequired,
};

export default UpdateClassForm;
