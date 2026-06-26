import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import bannerImg from "../assets/banner.png";

const Register = () => {
  return (
    <div className="flex min-h-screen font-inter bg-black">
      {/* Left Panel: Graphic Art - Hidden on Mobile */}
      <div className="relative hidden md:flex md:w-[50%] lg:w-[52%] h-screen overflow-hidden select-none">
        <img
          src={bannerImg}
          alt="Super App Cinematic Backdrop"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
        />
        {/* Soft dark overlay to bring out the typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        
        {/* Bottom Text overlay */}
        <div className="absolute bottom-16 left-12 right-12 z-10 space-y-4">
          <h1 className="font-outfit font-extrabold text-4xl lg:text-5xl leading-tight tracking-tight text-white drop-shadow-md">
            Discover, track and stay updated.
          </h1>
          <p className="text-zinc-300 text-lg font-medium drop-shadow">
            Consolidate your daily utilities—weather conditions, rotating headlines, interactive memos, and personalized media channels—in a single dashboard.
          </p>
        </div>
      </div>

      {/* Right Panel: Form Panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:px-12 lg:px-20 h-screen overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h2 className="font-outfit font-extrabold text-5xl tracking-wider text-super-neon select-none">
              Super App
            </h2>
            <p className="text-zinc-400 font-medium">Create your new account</p>
          </div>
          
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
