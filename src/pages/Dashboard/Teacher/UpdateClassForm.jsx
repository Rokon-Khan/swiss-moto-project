import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateClassForm = () => {
  const { id } = useParams(); // Get the class ID from the route
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch class data for default values
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const { data } = await axiosSecure.get(`/classes/${id}`);
        setClassData(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch class data. Please try again.");
      }
    };

    fetchClassData();
  }, [id, axiosSecure]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const image = form.image.value || classData?.image; // Use the current image if not changed

    const updatedClass = {
      name,
      description,
      price,
      image,
    };

    try {
      await axiosSecure.put(`/classes/${id}`, updatedClass);
      Swal.fire("Success!", "Class updated successfully!", "success");
      navigate("/dashboard/my-classes");
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        "Failed to update the class. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Update Class | Dashboard</title>
      </Helmet>

      {classData ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto p-8 bg-gray-50 shadow rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-6">Update Class</h2>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Class Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-2 border rounded"
              defaultValue={classData.name}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              className="w-full px-4 py-2 border rounded"
              defaultValue={classData.description}
              required
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="w-full px-4 py-2 border rounded"
              defaultValue={classData.price}
              required
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              id="image"
              className="w-full px-4 py-2 border rounded"
              defaultValue={classData.image}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Class"}
          </button>
        </form>
      ) : (
        <p>Loading class details...</p>
      )}
    </div>
  );
};

export default UpdateClassForm;
