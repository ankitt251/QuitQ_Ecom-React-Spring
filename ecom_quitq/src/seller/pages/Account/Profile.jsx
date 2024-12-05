import { Edit } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import ProfileFieldCard from "../../../component/ProfileFieldCard";
import PersonalDetails from "./PersonalDetails";
import PickupAddress from "./PickupAddress";
import BusinessDetails from "./BusinessDetails";
import { useAppSelector } from "../../../State/Store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const { seller } = useAppSelector((store) => store);
  const handleOpen = (formName) => {
    setOpen(true);
    setSelectedForm(formName);
  };
  const handleClose = () => setOpen(false);

  const [selectedForm, setSelectedForm] = useState("personalDetails");

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personalDetails":
        return <PersonalDetails />;
      case "pickupAddress":
        return <PickupAddress />;
      default:
        return <BusinessDetails />;
    }
  };

  return (
    <div className="lg:px-20 pt-3 pb-20 space-y-20">
      <div className="w-full lg:w-[70%]">
        <div className="flex item-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">
            Persional Details
          </h1>
          <div>
            <Button
              onClick={() => handleOpen("personalDetails")}
              variant="contained"
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              className="w-16 h-16"
            >
              <Edit />
            </Button>
          </div>
        </div>
        <div>
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src={seller.profile?.businessDetails.banner}
          />
          <div>
            <ProfileFieldCard
              keys="Seller Name"
              value={seller.profile?.sellerName}
            />
            <Divider />
            <ProfileFieldCard
              keys="Seller Email"
              value={seller.profile?.email}
            />
            <Divider />
            <ProfileFieldCard
              keys="Seller Mobile"
              value={seller.profile?.mobile}
            />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[70%]">
        <div className="flex item-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Business Details</h1>
          <div>
            <Button
              onClick={() => handleOpen("businessDetails")}
              variant="contained"
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              className="w-16 h-16"
            >
              <Edit />
            </Button>
          </div>
        </div>
        <div>
          <div>
            <ProfileFieldCard
              keys="Business Name/Brand Name"
              value={seller.profile?.businessDetails.businessName}
            />
            <Divider />
            <ProfileFieldCard
              keys="Business Email"
              value={seller.profile?.businessDetails.businessEmail}
            />
            <Divider />
            <ProfileFieldCard
              keys="Account Status"
              value={seller.profile?.accountStatus}
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[70%]">
        <div className="flex item-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Pickup Address</h1>
          <div>
            <Button
              onClick={() => handleOpen("pickupAddress")}
              variant="contained"
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              className="w-16 h-16"
            >
              <Edit />
            </Button>
          </div>
        </div>
        <div>
          <div>
            <ProfileFieldCard
              keys="Address"
              value={seller.profile?.pickupAddress.streetAddress}
            />
            <Divider />
            <ProfileFieldCard
              keys="City"
              value={seller.profile?.pickupAddress.city}
            />
            <Divider />
            <ProfileFieldCard
              keys="State"
              value={seller.profile?.pickupAddress.state}
            />
            <Divider />
            <ProfileFieldCard
              keys="Mobile"
              value={seller.profile?.pickupAddress.mobile}
            />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{renderSelectedForm()}</Box>
      </Modal>
    </div>
  );
};

export default Profile;
