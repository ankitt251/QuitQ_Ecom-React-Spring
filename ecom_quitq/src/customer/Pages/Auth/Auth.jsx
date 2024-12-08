import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleRegisterSuccess = () => {
    setIsLogin(true); // Switch to login form
  };

  return (
    <div className="flex min-h-screen justify-between">
      <section className="flex flex-col w-[600px] pt-24 h-full pl-32 px-8 justify-center space-y-6">
        <a
          onClick={() => navigate("/")}
          className="flex items-center justify-center cursor-pointer"
        >
          <img alt="QuitQ Logo" src="../qlogo.png" className="h-8 w-auto" />
          <span
            className="text-xl font-bold text-gray-900 ml-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            QuitQ
          </span>
        </a>

        <h2 className="text-3xl font-bold text-center mb-5">Get Started Now</h2>

        {isLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        )}

        <div className="mt-5 space-y-4">
          <p className="text-sm font-bold text-center mt-10">
            {isLogin ? "Don't " : "Already "} have an account?
          </p>
          <Button
            fullWidth
            size="small"
            onClick={() => setIsLogin(!isLogin)}
            variant="outlined"
          >
            {isLogin ? "Create Account" : "Login"}
          </Button>
        </div>
      </section>
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

export default Auth;
