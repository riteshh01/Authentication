import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("resetEmail");

  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Please request reset again.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput && nextInput.focus();
    }

    if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput && prevInput.focus();
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");
    if (!email || otp.some(d => d === "") || !password) {
      return toast.error("Email, OTP, and new password are required");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/reset-password",
        { email, otp: enteredOtp, password }
      );

      if (data.success) {
        toast.success("Password reset successful");
        localStorage.removeItem("resetEmail");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-gray-800 rounded-3xl p-8 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="text-[#34A853]">Ne</span>
          <span className="text-[#4285F4]">w </span>
          <span className="text-[#EA4335]">Pa</span>
          <span className="text-[#FBBC05]">ss</span>
          <span className="text-[#4285F4]">wo</span>
          <span className="text-[#EA4335]">rd</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="w-12 h-14 md:w-14 md:h-16 text-2xl text-center 
                           bg-black border border-gray-700 rounded-xl 
                           text-white focus:outline-none 
                           focus:ring-2 focus:ring-[#4285F4]"
              />
            ))}
          </div>
          <p className="text-center text-sm mb-6">
            {timeLeft > 0 ? (
              <span className="text-gray-400">
                OTP expires in <span className="text-[#EA4335] font-semibold">{formatTime(timeLeft)}</span>
              </span>
            ) : (
              <span className="text-red-500 font-semibold">
                OTP expired. Please request a new one.
              </span>
            )}
          </p>

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-xl bg-black border border-gray-700
                       text-white focus:ring-2 focus:ring-[#34A853]"
          />

          <button
            type="submit"
            disabled={timeLeft <= 0}
            className={`w-full py-3 rounded-2xl font-bold text-white text-lg
              ${timeLeft <= 0 
                ? "bg-gray-700 cursor-not-allowed" 
                : "bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] hover:brightness-110 transition-all"
              }`}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;