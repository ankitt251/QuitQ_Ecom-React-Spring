import React from "react";
import { ListItemIcon, ListItemText, ListItem, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../State/Store";
import { logout } from "../State/seller/AuthSlice";

const DrawerList = ({ menu, menu2, toggleDrawer }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
        <div className="space-y-2 cursor-pointer">
          {menu.map((item, index) => {
            return (
              <p
                key={index} // Moved the key here
                onClick={() => {
                  navigate(item.path);
                  if (item.path === "/") handleLogout();
                }}
                className={`${
                  item.path === location.pathname
                    ? "bg-sub text-custom"
                    : "text-custom"
                } flex items-center px-5 py-1 rounded-r-full`}
              >
                <ListItem button>
                  <ListItemIcon>
                    {item.path === location.pathname
                      ? item.activeIcon
                      : item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </p>
            );
          })}
        </div>
      </div>
      <Divider />
      <div className="space-y-2">
        <div className="space-y-2 cursor-pointer">
          {menu2.map((item, index) => {
            return (
              <p
                key={index} // Moved the key here
                onClick={() => {
                  // If logout is clicked, call handleLogout
                  if (item.name === "Logout") {
                    handleLogout(); // Trigger logout action
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`${
                  item.path === location.pathname
                    ? "bg-sub text-custom"
                    : "text-custom"
                } flex items-center px-5 py-1 rounded-r-full`}
              >
                <ListItem button>
                  <ListItemIcon>
                    {item.path === location.pathname
                      ? item.activeIcon
                      : item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
