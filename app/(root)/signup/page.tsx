"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

// Define the types for the form data and API response
interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface ApiResponse {
  message: string;
}

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Registered successfully!");

      // Clear the form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const errorData: ApiResponse = error.response?.data;
        toast.error(`Error: ${errorData?.message || "Something went wrong!"}`);
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center sm:px-0 px-4 sm:my-16 my-4">
        <div className="sm:w-[600px] w-full">
          <div className="flex items-center mt-8">
            <div className="w-full border-t border-[#bfbfbf]"></div>
            <div className="uppercase mx-8 text-[14px] whitespace-nowrap">
              Customer Sign Up
            </div>
            <div className="w-full border-t border-[#bfbfbf]"></div>
          </div>

          <div className="mt-8 w-full">
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="text-[#313131] text-[15px] w-full px-4 py-2 border border-[#ebebeb] rounded-[5px] outline-none"
                />
              </div>

              <div className="w-full mt-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="text-[#313131] text-[15px] w-full px-4 py-2 border border-[#ebebeb] rounded-[5px] outline-none"
                />
              </div>

              <div className="w-full mt-4">
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="text-[#313131] text-[15px] w-full px-4 py-2 border border-[#ebebeb] rounded-[5px] outline-none"
                />
              </div>

              <div className="w-full mt-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="text-[#313131] text-[15px] w-full px-4 py-2 border border-[#ebebeb] rounded-[5px] outline-none"
                />
              </div>

              <div className="flex justify-center mt-6 gap-1.5">
                <button
                  type="submit"
                  className="text-[#313131] bg-[#ebebeb] px-5 py-2.5 text-[15px]"
                >
                  {loading ? "Loading..." : "Sign up"}
                </button>

                <Link href="/login">
                  <button
                    type="button"
                    className="text-[#313131] bg-[#ebebeb] px-5 py-2.5 text-[15px]"
                  >
                    Login Now
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
