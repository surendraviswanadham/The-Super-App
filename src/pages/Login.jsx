import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../store/useStore";

const Login = () => {
  const user = useStore((state) => state.user);
  const loginUser = useStore((state) => state.loginUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.usernameOrEmail || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Verify credentials against local storage 'database'
    if (
      (formData.usernameOrEmail === user.username || formData.usernameOrEmail === user.email) &&
      formData.password === user.password &&
      user.username !== "" // ensure user is actually registered
    ) {
      loginUser();
      navigate("/dashboard"); // Take them straight to dashboard
    } else {
      setError("Invalid username/email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex font-inter text-white">
      {/* Left Promotional Banner */}
      <div className="hidden lg:flex w-1/2 relative bg-zinc-950 items-end overflow-hidden select-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"
          alt="Concert promotional background"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-20 p-16 pb-24 max-w-2xl">
          <h1 className="font-outfit font-extrabold text-5xl tracking-tight leading-tight mb-4">
            Welcome Back to Superapp
          </h1>
          <p className="text-zinc-300 font-medium text-lg max-w-md leading-relaxed">
            Pick up exactly where you left off. Access your personalized news, widgets, and entertainment in one place.
          </p>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 md:p-16 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left space-y-2 select-none">
            <h2 className="font-outfit font-black text-4xl text-super-neon tracking-wide mb-2">
              Super app
            </h2>
            <p className="text-zinc-300 font-medium text-lg">Login to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 flex flex-col">
              <label htmlFor="login-username" className="text-sm text-zinc-400 font-medium ml-1">Username or Email</label>
              <input
                id="login-username"
                type="text"
                placeholder="Username or Email"
                value={formData.usernameOrEmail}
                onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-super-neon transition-colors duration-200"
              />
            </div>

            <div className="space-y-1 flex flex-col">
              <label htmlFor="login-password" className="text-sm text-zinc-400 font-medium ml-1">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-super-neon transition-colors duration-200"
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 rounded border border-red-500/20">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-super-green hover:bg-super-neon text-white hover:text-black font-semibold text-lg tracking-wider transition-all duration-300 transform active:scale-98 shadow-lg hover:shadow-super-neon/20 hover:shadow-xl mt-6 cursor-pointer"
            >
              LOGIN
            </button>

            <div className="pt-4 text-center text-sm font-medium text-zinc-400">
              Don't have an account?{" "}
              <Link to="/" className="text-super-neon hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
