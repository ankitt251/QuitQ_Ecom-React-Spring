import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-between">
      {/* Left Section (Form) */}
      <section className="flex flex-col w-[600px] pt-24 h-full pl-32 px-8 justify-center space-y-6">
        {/* Logo */}
        <a onClick={() => navigate("/")} className="flex items-center">
          <img alt="QuitQ Logo" src="../qlogo.png" className="h-8 w-auto" />
          <span
            className="text-xl font-bold text-gray-900 ml-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            QuitQ
          </span>
        </a>

        {/* Form Heading */}
        <h2 className="text-3xl font-bold mb-5">Get Started Now</h2>

        {/* Form */}
        {!isLogin ? <SellerAccountForm /> : <SellerLoginForm />}

        <div className="mt-5 space-y-4">
          <p className="text-sm font-bold text-center mt-10">Have account</p>
          <Button
            onClick={handleShowPage}
            fullWidth
            sx={{ py: "11px" }}
            variant="outlined"
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>

      {/* Right Section (Image) */}
      <section className="w-[700px] hidden md:flex justify-center items-center">
        <img
          src={isLogin ? "../imgs/loginbg.avif" : "../imgs/signupbg.jfif"}
          alt="Fashion Model"
          className="w-full h-full object-cover rounded-l-3xl"
        />
      </section>
    </div>
  );
};

export default BecomeSeller;
