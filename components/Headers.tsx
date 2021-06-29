import Link from "next/link";
import React from "react";

interface Props {
  title: string;
}

const Headers: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex flex-row bg-blue-500 h-19 p-4 shadow-md space-x-4 items-center sticky ">
      <div className="flex flex-grow flex-row justify-start items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-50 justify-start hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-grey-600 focus:ring-opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <Link href="/">
          <a className="text-gray-50 font-semibold hover:cursor-pointer text-2xl pl-10">
            {title}
          </a>
        </Link>
      </div>
      <div className="flex flex-end md:justify-end pr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 rounded text-gray-50 justify-end"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Headers;
