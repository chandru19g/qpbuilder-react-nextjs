import React from "react";

interface Props {
  placeholder: string;
  label: string;
  name: string;
  ref: string;
}

const Input: React.FC<Props> = ({ placeholder, label, name, ref }) => {
  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-row p-5 items-center">
        <form>
          <div className="pr-5 items-center">{label}</div>
          <input
            placeholder={placeholder}
            className="p-2 w-max justify-center border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-opacity-25 focus:border-transparent bg-gray-100"
            id={name}
            name={name}
            ref={ref}
          />
        </form>
      </div>
    </div>
  );
};

export default Input;
