import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { auth } from "../../firebase/firebase";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const router = useRouter();

  const handleClickForgotPassword = () => {
    setAuthModalState((prev) => ({ ...prev, type: "forgotPassword" }));
  };

  const handleClickCreateAccount = () => {
    setAuthModalState((prev) => ({ ...prev, type: "register" }));
  };

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {
      toast.error("Please fill all the fields!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser) return;

      router.push("/");
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
  }, [error]);

  return (
    <form onSubmit={handleLogin} className="space-y-6 px-6 py-4">
      <h3 className="text-xl font-medium text-white">Sign in to LeetClone</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="example@company.com"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder:gray-400 text-white"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Password
        </label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          placeholder="Password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder:gray-400 text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus-ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {loading ? "Loading..." : "Log In"}
      </button>
      <button
        onClick={handleClickForgotPassword}
        className="flex w-full justify-end"
      >
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
        >
          Forgot password?
        </a>
      </button>
      <div
        onClick={handleClickCreateAccount}
        className="text-sm font-medium text-gray-300"
      >
        Not registered?{" "}
        <a href="#" className="text-blue-700 hover:underline">
          Create account
        </a>
      </div>
    </form>
  );
};
export default Login;
