"use client"
import Link from "next/link";

const LoginModal = () => {
  return (
    <div className="shadow-xl bg-yellow-50 p-2 m-1">
      <Link
        href="/login"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Login to like
      </Link>
    </div>
  );
};


export default LoginModal