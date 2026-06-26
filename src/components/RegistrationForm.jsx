import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../store/useStore";

const RegistrationForm = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateForm = () => {
    const tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    const namePattern = /^[a-zA-Z\s]+$/;
    const usernamePattern = /^[a-zA-Z0-9]+$/;

    if (!formData.name.trim()) tempErrors.name = "Name field cannot be left blank.";
    else if (!namePattern.test(formData.name)) tempErrors.name = "Name must only contain alphabetic characters and spaces.";

    if (!formData.username.trim()) tempErrors.username = "Username field cannot be left blank.";
    else if (/\s/.test(formData.username)) tempErrors.username = "Username cannot contain whitespace characters.";
    else if (!usernamePattern.test(formData.username)) tempErrors.username = "Username must contain alphanumeric characters only.";

    if (!formData.email.trim()) tempErrors.email = "Email field cannot be left blank.";
    else if (!emailPattern.test(formData.email)) tempErrors.email = "Please input a valid email formatting schema.";

    if (!formData.mobile.trim()) tempErrors.mobile = "Mobile field cannot be left blank.";
    else if (!phonePattern.test(formData.mobile)) tempErrors.mobile = "Mobile field must encompass exactly 10 digital characters.";

    if (!formData.password.trim()) tempErrors.password = "Password field cannot be left blank.";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters long.";

    if (!termsAccepted) tempErrors.terms = "Check this box if you want to proceed";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setUser(formData);
      navigate("/categories");
    }
  };

  return (
    <form onSubmit={handleFormSubmission} className="w-full max-w-md space-y-4">
      <div className="space-y-1 flex flex-col">
        <label htmlFor="name" className="text-sm text-zinc-400 font-medium ml-1">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-3 rounded-lg bg-zinc-900 border ${
            errors.name ? "border-red-500" : "border-zinc-800"
          } text-white focus:outline-none focus:border-super-neon transition-colors duration-200`}
        />
        {errors.name && <p className="text-red-500 text-xs font-medium tracking-wide">{errors.name}</p>}
      </div>

      <div className="space-y-1 flex flex-col">
        <label htmlFor="username" className="text-sm text-zinc-400 font-medium ml-1">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className={`w-full px-4 py-3 rounded-lg bg-zinc-900 border ${
            errors.username ? "border-red-500" : "border-zinc-800"
          } text-white focus:outline-none focus:border-super-neon transition-colors duration-200`}
        />
        {errors.username && <p className="text-red-500 text-xs font-medium tracking-wide">{errors.username}</p>}
      </div>

      <div className="space-y-1 flex flex-col">
        <label htmlFor="email" className="text-sm text-zinc-400 font-medium ml-1">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-3 rounded-lg bg-zinc-900 border ${
            errors.email ? "border-red-500" : "border-zinc-800"
          } text-white focus:outline-none focus:border-super-neon transition-colors duration-200`}
        />
        {errors.email && <p className="text-red-500 text-xs font-medium tracking-wide">{errors.email}</p>}
      </div>

      <div className="space-y-1 flex flex-col">
        <label htmlFor="mobile" className="text-sm text-zinc-400 font-medium ml-1">Mobile</label>
        <input
          id="mobile"
          type="text"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className={`w-full px-4 py-3 rounded-lg bg-zinc-900 border ${
            errors.mobile ? "border-red-500" : "border-zinc-800"
          } text-white focus:outline-none focus:border-super-neon transition-colors duration-200`}
        />
        {errors.mobile && <p className="text-red-500 text-xs font-medium tracking-wide">{errors.mobile}</p>}
      </div>

      <div className="space-y-1 flex flex-col">
        <label htmlFor="password" className="text-sm text-zinc-400 font-medium ml-1">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={`w-full px-4 py-3 rounded-lg bg-zinc-900 border ${
            errors.password ? "border-red-500" : "border-zinc-800"
          } text-white focus:outline-none focus:border-super-neon transition-colors duration-200`}
        />
        {errors.password && <p className="text-red-500 text-xs font-medium tracking-wide">{errors.password}</p>}
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 rounded accent-super-neon bg-zinc-900 border-zinc-800 focus:ring-0 focus:ring-offset-0"
          />
          <span className="text-sm text-zinc-400 font-medium">Share my registration data with Superapp</span>
        </label>
        {errors.terms && <p className="text-red-500 text-xs font-medium mt-1">{errors.terms}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-full bg-super-green hover:bg-super-neon text-white hover:text-black font-semibold text-lg tracking-wider transition-all duration-300 transform active:scale-98 shadow-lg hover:shadow-super-neon/20 hover:shadow-xl mt-4 cursor-pointer"
      >
        SIGN UP
      </button>

      <div className="pt-2 text-center text-sm font-medium text-zinc-400">
        Already have an account?{" "}
        <Link to="/login" className="text-super-neon hover:underline">
          Login here
        </Link>
      </div>

      <p className="text-xs text-zinc-500 font-medium leading-relaxed mt-2">
        By clicking on Sign up, you agree to Superapp <span className="text-super-neon hover:underline cursor-pointer">Terms and Conditions of Use</span>
      </p>
      <p className="text-xs text-zinc-500 font-medium leading-relaxed">
        To learn more about how Superapp collects, uses, shares and protects your personal data please read Superapp <span className="text-super-neon hover:underline cursor-pointer">Privacy Policy</span>
      </p>
    </form>
  );
};

export default RegistrationForm;
