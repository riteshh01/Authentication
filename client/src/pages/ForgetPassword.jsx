import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Enter your email");

    try {
      const { data } = await axios.post(
        "/api/auth/send-reset-otp",
        { email }
      );

      if (data.success) {
        toast.success("Reset code sent to your email");
        localStorage.setItem("resetEmail", email);
        navigate("/reset-password", { state: { email } });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-gray-800 rounded-3xl p-8 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="text-[#4285F4]">Re</span>
          <span className="text-[#EA4335]">se</span>
          <span className="text-[#FBBC05]">t </span>
          <span className="text-[#34A853]">Pa</span>
          <span className="text-[#4285F4]">ss</span>
          <span className="text-[#EA4335]">wo</span>
          <span className="text-[#FBBC05]">rd</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-xl bg-black border border-gray-700
                       text-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-bold text-white text-lg
                       bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853]"
          >
            Send Reset Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;