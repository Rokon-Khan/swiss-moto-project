import { FaUserCog } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { TbUsersPlus } from "react-icons/tb";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      {/* <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" /> */}
      <MenuItem icon={FaUserCog} label="Users" address="users" />
      <MenuItem
        icon={SiGoogleclassroom}
        label="All Classes"
        address="all-classes"
      />
      <MenuItem
        icon={TbUsersPlus}
        label="Teacher Request"
        address="teacher-request"
      />
    </>
  );
};

export default AdminMenu;
