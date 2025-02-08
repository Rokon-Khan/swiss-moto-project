import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { uploadToCloudinary } from "../../api/utlis";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddEventFrom from "./AddEventFrom";

const AddEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload Image" },
  });
  console.log(uploadImage);
  const [loading, setLoading] = useState(false);
  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const startDate = form.startDate.value;
    const endingtDate = form.endingDate.value;

    const image = form.image.files[0];
    const imageUrl = await uploadToCloudinary(image);

    // seller info
    const eventManager = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // Create plant data object
    const artData = {
      title,
      category,
      description,
      startDate,
      endingtDate,
      image: imageUrl,
      eventManager,
    };

    console.table(artData);
    // save plant in db
    try {
      // post req
      await axiosSecure.post("/events", artData);
      Swal.fire({
        title: "Success!",
        text: "Your Art Product has been added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // 6. Navigate to homepage
      navigate("/dashboard/products");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      Swal.fire({
        title: "Error!",
        text: err.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Art | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddEventFrom
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      />
    </div>
  );
};

export default AddEvent;
