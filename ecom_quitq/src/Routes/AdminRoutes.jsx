import React from "react";
import { Route, Routes } from "react-router-dom";
import SellersTable from "../admin/Pages/Seller/SellersTable";
import CreateCategory from "../admin/Pages/Category/CreateCategory";
import Deal from "../admin/Pages/Homepage/Deal";
import ManageUsers from "../admin/Pages/User/ManageUsers";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SellersTable />}></Route>
        <Route path="/create-category" element={<CreateCategory />}></Route>
        <Route path="/manage-users" element={<ManageUsers />}></Route>
        <Route path="/deals" element={<Deal />}></Route>
      </Routes>
    </div>
  );
};

export default AdminRoutes;
