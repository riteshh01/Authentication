import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput && nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/verify-account",
        { otp: enteredOtp },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Email verified successfully. You can login now.");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-gray-800 rounded-3xl p-8 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center mb-4 tracking-tight">
          <span className="text-[#4285F4]">Ve</span>
          <span className="text-[#EA4335]">ri</span>
          <span className="text-[#FBBC05]">fy </span>
          <span className="text-[#34A853]">Ac</span>
          <span className="text-[#4285F4]">co</span>
          <span className="text-[#EA4335]">un</span>
          <span className="text-[#FBBC05]">t</span>
        </h1>

        <p className="text-gray-400 text-center mb-8">
          We’ve sent a 6-digit verification code to your email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-14 md:w-14 md:h-16 text-2xl text-center 
                           bg-black border border-gray-700 rounded-xl 
                           text-white focus:outline-none 
                           focus:ring-2 focus:ring-[#4285F4]"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-bold text-white text-lg
                       bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853]
                       hover:brightness-110 transition-all"
          >
            Verify Account
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Didn’t receive the code?{" "}
          <span className="text-[#4285F4] cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailVerify;