import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { imageUpload } from "../../../api/utils";
import AddClassForm from "../../../components/Form/AddClassForm";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddClass = () => {
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
    const name = form.name.value;
    const description = form.description.value;
    // const category = form.category.value;
    const price = parseFloat(form.price.value);
    // const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    // seller info
    const teacher = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // Create class data object
    const classData = {
      name,
      description,
      price,
      image: imageUrl,
      teacher,
      status: "pending",
    };

    console.table(classData);
    // save plant in db
    try {
      // post req
      await axiosSecure.post("/allclasses", classData);

      // toast.success("Data Added Successfully!");
      Swal.fire({
        title: "Success!",
        text: "Your account has been created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/dashboard/my-class");
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
        <title>Add Class | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddClassForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
        user={user}
      />
    </div>
  );
};

export default AddClass;
