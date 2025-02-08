// import { FaUserCog } from "react-icons/fa";
// import { SiGoogleclassroom } from "react-icons/si";
// import MenuItem from "./MenuItem";

// const AdminMenu = () => {
//   return (
//     <>
//       {/* <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" /> */}
//       <MenuItem icon={FaUserCog} label="Users" address="users" />
//       <MenuItem
//         icon={SiGoogleclassroom}
//         label="All Events"
//         address="add-events"
//       />
//       <MenuItem
//         icon={SiGoogleclassroom}
//         label="All Event"
//         address="all-events"
//       />
//     </>
//   );
// };

// export default AdminMenu;

import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import MenuItem from "./MenuItem";
const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Event"
        address="add-event"
      />
      <MenuItem
        icon={SiGoogleclassroom}
        label="My Events"
        address="my-events"
      />
      <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
      {/* <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders"
      /> */}
    </>
  );
};

export default AdminMenu;
