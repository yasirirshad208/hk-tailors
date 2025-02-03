"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define the types for the form data and API response
interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true)

    const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
  
      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          toast.error('Incorrect username or password');
        } else {
          toast.error(result.error)
        }
      }

      setLoading(false)
  
      if (result?.url) {
        router.replace('/');
      }
  };

  return (
    <>
      <div className="flex justify-center sm:px-0 px-4 sm:my-16 my-4">
        <div className="sm:w-[600px] w-full">
          <div className="flex items-center mt-8">
            <div className="w-full border-t border-[#bfbfbf]"></div>
            <div className="uppercase mx-8 text-[14px] whitespace-nowrap">Customer Login</div>
            <div className="w-full border-t border-[#bfbfbf]"></div>
          </div>

          <div className="mt-8 w-full">
            <form onSubmit={handleSubmit}>
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
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="text-[#313131] text-[15px] w-full px-4 py-2 border border-[#ebebeb] rounded-[5px] outline-none"
                />
              </div>

              <div className="flex justify-center mt-6 gap-1.5">
                <button type="submit" className="text-[#313131] bg-[#ebebeb] px-5 py-2.5 text-[15px]">{loading? "Loading...":"Login"}</button>

                <Link href="/signup">
                  <button type="button" className="text-[#313131] bg-[#ebebeb] px-5 py-2.5 text-[15px]">Create Account</button>
                </Link>
              </div>
            </form>

            <div className="text-center mt-4">
              <Link className="text-black hover:underline text-[15px]" href={"/forgot-password"}>Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
