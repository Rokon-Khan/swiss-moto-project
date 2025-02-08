// import { Helmet } from "react-helmet-async";
// import AddClass from "../../../components/Form/AddClass";

// const AddPlant = () => {
//   return (
//     <div>
//       <Helmet>
//         <title>Add Class | Dashboard</title>
//       </Helmet>

//       {/* Form */}
//       {/* <AddPlantForm /> */}
//       <AddClass></AddClass>
//     </div>
//   );
// };

// export default AddPlant;

import { Helmet } from "react-helmet-async";
// import AddPlantForm from '../../../components/Form/AddPlantForm'
import { useState } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "../../../api/utils";
import AddClassForm from "../../../components/Form/AddClassForm";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddPlant = () => {
  const { user } = useAuth();
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
      toast.success("Data Added Successfully!");
    } catch (err) {
      console.log(err);
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
      {/* <AddClass
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      /> */}
      <AddClassForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      />
    </div>
  );
};

export default AddPlant;
