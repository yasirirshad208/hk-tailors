"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LoginFormData {
    verifyCode: string;
}

export default function Verify() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({ verifyCode: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/verifyCode", {
        verifyCode: formData.verifyCode,
      });

      toast.success(response.data.message);
      router.replace(`/reset-password?token=${response.data.token}`); // Redirect after success
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Something went wrong, please try again."
      );
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
              Verify Otp
            </div>
            <div className="w-full border-t border-[#bfbfbf]"></div>
          </div>

          <div className="mt-8 w-full">
            <form onSubmit={handleSubmit}>
              <div className="w-full mt-4">
                <input
                  type="text"
                  name="verifyCode"
                  value={formData.verifyCode}
                  onChange={handleChange}
                  placeholder="Enter otp"
                  required
                  className="text-[#313131] text-[15px] w-full px-4 py-2 border border-[#ebebeb] rounded-[5px] outline-none"
                />
              </div>

              <div className="flex justify-center mt-6 gap-1.5">
                <button
                  type="submit"
                  className="text-[#313131] bg-[#ebebeb] px-5 py-2.5 text-[15px]"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
