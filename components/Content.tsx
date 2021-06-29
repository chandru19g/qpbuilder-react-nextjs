import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Loader from "react-loader-spinner";

interface Inputdata {
  name: string;
  title: string;
  field: string;
  instruction: string;
}

const Content = () => {
  let schema = yup.object().shape({
    name: yup.string().required(),
    title: yup.string().required(),
    field: yup.string().required(),
    instruction: yup.string().required(),
  });

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<Inputdata>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputdata> = (data) => {
    setLoading(true);
    fetch("http://localhost:8000/api/question/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      response.json().then(function (res) {
        console.log(res.id);

        router.push({ pathname: "/details", query: { id: res.id } });
        setLoading(false);
      });
    });
  };

  return loading ? (
    <div className="flex justify-center items-center content-center">
      <Loader type="BallTriangle" color="#00BFFF" height="50" width="50" />
    </div>
  ) : (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <h1 className="text-2xl justify-center">Generate Questions</h1>
      </div>
      <div className="flex justify-center items-center flex-wrap flex-col ml-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pr-5 items-center pt-5">Enter College Name</div>
          <input
            placeholder="Enter the College Name"
            className="p-2 w-max justify-center border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-opacity-25 focus:border-transparent bg-gray-100"
            {...register("name")}
            type="text"
          />
          <div className="pr-5 items-center pt-5">Question Title</div>
          <input
            placeholder="Enter the Field"
            className="p-2 w-max justify-center border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-opacity-25 focus:border-transparent bg-gray-100"
            type="text"
            {...register("title")}
          />
          <div className="pr-5 items-center pt-5">Field of Study</div>
          <input
            placeholder="Enter the Field"
            className="p-2 w-max justify-center border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-opacity-25 focus:border-transparent bg-gray-100"
            {...register("field")}
            type="text"
          />
          <div className="pr-5 items-center pt-5">Instructions</div>
          <input
            placeholder="Enter the Common instructions"
            className="p-2 w-max justify-center border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-opacity-25 focus:border-transparent bg-gray-100"
            {...register("instruction")}
            type="text"
          />
          <div className="flex justify-center pt-5">
            <button
              type="submit"
              className="bg-green-500 active:bg-green-700 hover:bg-green-600 p-4 rounded-lg text-gray-50 text-xl"
            >
              Start Generator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Content;
