import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserAddressCard from "./UserAddressCard";
import { fetchUserProfile } from "../../../State/customer/AuthSlice";
import { Box } from "@mui/material";

const Address = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Access user data from Redux store

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchUserProfile({ jwt })); // Fetch user profile if not already available
    }
  }, [dispatch]);

  // If no user data or addresses are available, return loading or empty state
  if (!user || !user.address) {
    return <Box>Loading...</Box>;
  }

  return (
    <div className="space-y-3">
      {/* Map through the addresses if there are multiple */}
      {user.address.length > 0 ? (
        user.address.map((address) => (
          <UserAddressCard
            key={address.id}
            name={address.name}
            streetAddress={address.streetAddress}
            city={address.city}
            state={address.state}
            pincode={address.pincode}
            mobile={address.mobile}
          />
        ))
      ) : (
        <Box>No Address Available</Box>
      )}
    </div>
  );
};

export default Address;
