import React from "react";
import DrawerList from "../../component/DrawerList";
import { AccountBox, Add, Dashboard, Logout, Shop2 } from "@mui/icons-material";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <Dashboard className="text-custom" />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Manage Users",
    path: "/admin/manage-users",
    icon: <Dashboard className="text-custom" />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Create Category ",
    path: "/admin/create-category",
    icon: <Add className="text-custom" />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Deals ",
    path: "/admin/deals",
    icon: <Shop2 className="text-custom" />,
    activeIcon: <Shop2 className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Logout",
    path: "/",
    icon: <Logout className="text-custom" />,
    activeIcon: <Logout className="text-white" />,
  },
];

const AdminDrawerList = ({ toggleDrawer }) => {
  return (
    <div>
      <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default AdminDrawerList;
