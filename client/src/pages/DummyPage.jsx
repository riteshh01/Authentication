import React, { useState, useContext } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { AppContent } from '../context/AppContext.jsx'

const DummyPage = () => {
  const [inputText, setInputText] = useState('');
  const [showSecretLogs, setShowSecretLogs] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const context = useContext(AppContent);
  const userName = context?.userData?.name;


  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);

    if (value.toLowerCase() === "showlogs") {
      setShowSecretLogs(true);
      fetchAllThoughts();
    } else {
      setShowSecretLogs(false);
    }
  };

  const fetchAllThoughts = async () => {
    try {
      setLoadingLogs(true);
      const { data } = await axios.post("/api/user/get-thoughts", {
        code: "showlogs"
      });

      if (data.success) {
        setReviews(data.thoughts);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast.warn("Kuch likhe bina aage kaise chale jaoge?", {
        position: "bottom-center",
        autoClose: 2500,
        theme: "dark"
      });
      return;
    }

    if (inputText.toLowerCase() === "showlogs") return;

    try {
      await axios.post("/api/user/add-thought", {
        content: inputText
      });

      toast.success("Thought saved. Jo likhna tha, chhod diya.", {
        position: "bottom-center",
        autoClose: 2500,
        theme: "dark"
      });

      setInputText("");
    } catch (err) {
      toast.error("Kuch gadbad hui. Dobara try karo.", {
        position: "bottom-center",
        autoClose: 2500,
        theme: "dark"
      });
      console.error(err.message);
    }
  };

  return (
    /* Main Container: Background black aur Navbar ke niche se start hone ke liye padding/margin */
    <div className="min-h-screen bg-black text-white font-sans w-full overflow-x-hidden pt-20">

      {/* Content Wrapper */}
      <div className="w-full px-4 md:px-10 py-12">

        {/* Google Styled Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight">
          <span className="text-[#4285F4]">Wh</span>
          <span className="text-[#EA4335]">at</span>
          <span className="text-[#FBBC05]">'s </span>
          <span className="text-[#4285F4]">Yo</span>
          <span className="text-[#34A853]">ur </span>
          <span className="text-[#EA4335]">Hu</span>
          <span className="text-[#FBBC05]">st</span>
          <span className="text-[#4285F4]">le</span>
          {userName && (
            <span className="text-[#EA4335] ml-3">
              {userName}
            </span>
          )}
          <span className="text-[#FBBC05]"> ?</span>
        </h1>

        {/* Video Player Section */}
        <div className="flex justify-center mb-16">
          <div className="relative p-1 rounded-[2rem] bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#34A853] w-full max-w-5xl shadow-[0_20px_50px_rgba(66,133,244,0.3)]">
            <div className="bg-black rounded-[1.9rem] overflow-hidden">
              <video
                src="ss.mp4"
                autoPlay
                loop
                controls
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Review Box */}
        <div className="max-w-4xl mx-auto">
          <div className={`bg-[#0f0f0f] rounded-3xl p-8 md:p-10 transition-all duration-500 shadow-[0_25px_80px_rgba(0,0,0,0.6)] border border-gray-800 ${showSecretLogs ? 'ring-4 ring-[#34A853]' : 'ring-4 ring-[#4285F4]/40'}`}>

            <h2 className="text-3xl font-black mb-6 flex items-center">
              {showSecretLogs ? (
                <>
                  <span className="text-[#34A853]">●</span>
                  <span className="text-[#34A853] ml-2">CORE DATABASE UNLOCKED</span>
                </>
              ) : (
                <div className="text-2xl md:text-4xl font-bold text-center mb-10 tracking-tight w-full">
                  <span className="text-[#4285F4]">Sh</span>
                  <span className="text-[#EA4335]">ar</span>
                  <span className="text-[#FBBC05]">e </span>
                  <span className="text-[#4285F4]">Yo</span>
                  <span className="text-[#34A853]">ur </span>
                  <span className="text-[#EA4335]">Th</span>
                  <span className="text-[#FBBC05]">ou</span>
                  <span className="text-[#4285F4]">gh</span>
                  <span className="text-[#FBBC05]">ts</span>
                </div>
              )}
            </h2>

            <form className="space-y-6">
              <textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="Sapnon ke liye kya chhoda?"
                className="w-full p-6 bg-black/80 rounded-2xl text-white text-xl 
                focus:outline-none focus:ring-4 ring-[#4285F4]/40 
                border border-gray-700 transition-all 
                placeholder:text-gray-500 resize-none"
                rows="4"
              />
              <p className="text-sm text-gray-500 italic">
                Feel Free to write your thoughts....
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-4 rounded-2xl text-white text-2xl font-bold
                bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853]
                hover:brightness-110 shadow-xl
                transform active:scale-[0.97] transition-all"
              >
                {showSecretLogs ? "UPDATE DATABASE" : "SUBMIT"}
              </button>
            </form>

            {/* Secret Logs with Google Colors */}
            {showSecretLogs && (
              <div className="mt-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="flex gap-2 mb-4">
                  <div className="h-2 w-12 rounded-full bg-[#4285F4]"></div>
                  <div className="h-2 w-12 rounded-full bg-[#EA4335]"></div>
                  <div className="h-2 w-12 rounded-full bg-[#FBBC05]"></div>
                  <div className="h-2 w-12 rounded-full bg-[#34A853]"></div>
                </div>

                <div className="space-y-4">
                  {loadingLogs ? (
                    <p className="text-gray-400 italic">Loading thoughts...</p>
                  ) : (
                    reviews.map((rev, index) => (
                      <div key={index} className="p-4 bg-black/70 rounded-xl border-l-4 border-[#34A853]">
                        <span className="font-black text-[#4285F4] uppercase text-sm tracking-wider">
                          {rev.user}
                        </span>
                        <p className="text-gray-200 text-lg mt-1 leading-relaxed">
                          {rev.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center space-y-4">
          <p className="text-2xl font-light text-gray-400">
            Happy New Year 🎉 <span className="text-white font-medium italic underline decoration-[#FBBC05] decoration-4">2026</span>
          </p>
          <div className="flex justify-center items-center font-semibold">
              <div className="flex gap-2 mb-1">
                  <div className=" rounded-full text-[#4285F4]">Made</div>
                  <div className=" rounded-full text-[#EA4335]">With</div>
                  <div className=" rounded-full text-[#FBBC05]">💛</div>
                  <div className=" rounded-full text-[#34A853]">By</div>
                  <div className=" rounded-full text-[#ffffff]">Ritesh</div>
                </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default DummyPage;