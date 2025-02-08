import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import MenuItem from "./MenuItem";
const TeacherMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Class"
        address="add-class"
      />
      <MenuItem icon={SiGoogleclassroom} label="My Class" address="my-class" />
      <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
      {/* <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders"
      /> */}
    </>
  );
};

export default TeacherMenu;
