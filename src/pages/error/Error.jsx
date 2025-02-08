import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import error from "../../assets/404.gif";
const Error = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col my-6">
      <div className="max-w-[1024px] h-full mx-auto">
        <img className="w-full" src={error} alt="error" />
      </div>
      <div>
        <Link
          to="/"
          className="btn bg-blue-500 text-white tex-xl font-bold hover:bg-green-600"
        >
          {" "}
          <FaArrowLeftLong /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
