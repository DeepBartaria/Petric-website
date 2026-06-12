import React, { useRef, useState } from "react";
import { useDialog } from "../context/DialogContext";
import logo from "../assets/logo.svg";
import accept from "../assets/accept.png";
import whatsappIcon from "../assets/contact/whatsapp.png";
import { createInquiry } from "../helper/inquiryApi";
import playstore from "../assets/playstore.png";
import appstore from "../assets/appstore.png";


export default function GlobalDialog() {
  const { open, hideDialog } = useDialog();
  const dialogRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    mobileNo: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.name || form.name.trim().length < 2) {
      setError("Please enter a valid name (at least 2 characters).");
      return;
    }
    if (!form.mobileNo || !/^[0-9]{10}$/.test(form.mobileNo)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await createInquiry({
        name: form.name,
        mobileNo: form.mobileNo,
      });
      if (res.type === "success") {
        setIsSubmitted(true);
        setForm({ name: "", mobileNo: "" });
        setTimeout(() => {
          hideDialog();
          setIsSubmitted(false);
        }, 3000);
      } else {
        setError(res.message || "Submission failed.");
      }
    } catch (err) {
      setError(err?.message || "Submission failed.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-60">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={hideDialog}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Content */}
        <h2 className="text-xl font-bold text-center mb-6">
          Want Trusted Care For Your Pet?
        </h2>
        {isSubmitted ? (
          <div className="flex flex-col gap-3 items-center justify-center min-h-[120px]">
            <img src={accept} height={60} width={60} alt="" />
            <img src={logo} height={100} width={100} alt="" />
            <a href={`https://wa.me/918295756962`} target="_blank">
              <img
                src={whatsappIcon}
                alt="WhatsApp"
                className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition"
              />
            </a>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter Your Full Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="number"
                name="mobileNo"
                value={form.mobileNo}
                maxLength={10}
                required
                pattern="[0-9]*"
                inputMode="numeric"
                onChange={handleChange}
                placeholder="Enter Your Number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 10);
                }}
              />
            </div>
            {error && (
              <div className="text-red-600 text-center font-semibold">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#1D3557] text-white py-2 rounded-md font-semibold mt-2 hover:bg-[#263159] transition"
              disabled={loading}
            >
              {loading ? "Booking..." : "Get A Call"}
            </button>
          </form>
        )}
        <p className="text-center text-sm text-[#333333] mt-4 mb-4">
          <b>Our Team Will Contact You Soon.</b>
          <br />
          Estimated Revert Time Is 2 Mins
        </p>
        <hr className="my-3 border-gray-300" />
        <div className=" text-black text-center px-3 py-3">
          <div className="flex justify-center items-center gap-4 mb-3">
             <a href="https://apps.apple.com/us/app/petric-pet-care-app/id6752010764" target="_blank" rel="noopener noreferrer"><img src={appstore} alt="iOS" className="h-12 sm:h-10" /></a>
              <a href="https://play.google.com/store/apps/details?id=com.petric.app" target="_blank" rel="noopener noreferrer"><img src={playstore} alt="Android" className="h-12 sm:h-10" /></a>
          </div>
          <p className="text-base font-semibold">
            Get Up to <span className="font-bold">50% OFF</span><br /> on every order
            on Petric App.
          </p>
          
        </div>
      </div>
    </div>
  );
}


