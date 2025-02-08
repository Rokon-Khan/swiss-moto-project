import { useState } from "react";
import { BsFingerprint } from "react-icons/bs";
import { TbUsersPlus } from "react-icons/tb";
import BecomeSellerModal from "../../../Modal/BecomeSellerModal";
import MenuItem from "./MenuItem";
const StudentMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Enroll Classes"
        address="my-enroll-classes"
      />

      <MenuItem
        icon={TbUsersPlus}
        label="Teacher Request"
        address="user-teacher-rquest"
      />

      {/* <div
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Teacher</span>
      </div> */}

      <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default StudentMenu;
