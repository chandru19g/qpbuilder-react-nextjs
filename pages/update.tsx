import { useRouter, withRouter } from "next/router";
import Loader from "react-loader-spinner";
import Head from "next/head";
import Headers from "../components/Headers";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type FormValues = {
  question: {
    name: string;
  }[];
};

const update = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    name: "question",
    control,
  });

  const router = useRouter();
  const id = router.query.id;

  let k;

  const eid = router.query.eid;

  useEffect(() => {
    getDetails();
  }, [id]);

  //? Getting Questions
  const getDetails = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/question/show/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      response.json().then(function (res) {
        setLoading(false);
        setQuestions(res);
      });
    });
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);
    console.log(id, data);
    fetch(`http://localhost:8000/api/section/update/${eid}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      response.json().then(function (res) {
        if (res) {
          console.log(res);
          setLoading(false);
          alert("Success");
          router.push({ pathname: "/edit", query: { id: id } });
        }
      });
    });
  };

  return loading ? (
    <div className="justify-center items-center content-center">
      <Loader type="BallTriangle" color="#00BFFF" height="50" width="50" />
    </div>
  ) : (
    <div>
      <Head>
        <title>Details | Questions</title>
      </Head>
      <Headers title="Edit Questions" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-xl flex flex-col items-center justify-center">
            Enter Question
          </div>
          <div className="flex justify-center items-center p-5">
            {questions.length > 0
              ? questions.map((ques, index) => {
                  console.log(ques.question);
                  {
                    k = ques.question.length;
                  }
                  return (
                    <div
                      key={index}
                      className="w-2/4 justify-center bg-blue-200 m-3 rounded-lg flex justify-center items-center flex-col"
                    >
                      {ques.question.map((q, i) => (
                        <div key={i}>
                          <b>{i + 1}. </b>
                          <input
                            className="m-2 border border-gray-300 p-2"
                            defaultValue={q.name}
                            {...register(`question.${i}.name`, {
                              required: true,
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  );
                })
              : ""}
          </div>
          {fields.map(({ id }, index) => {
            console.log(k);
            return (
              <div className="flex items-center justify-center" key={id}>
                <div className="flex flex-row items-center p-3 w-2/4 justify-center bg-blue-200 m-3 rounded-lg">
                  <div className="flex justify-center items-center flex-wrap xl:justify-center flex-col">
                    <div className="items-center flex mt-5">
                      <label>
                        <b>{k + index + 1}</b>
                      </label>
                      <input
                        placeholder="Enter the Question"
                        {...register(`question.${index + k}.name`, {
                          required: true,
                        })}
                        className="bg-gray-60 p-1 ml-5"
                      />

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="items-center flex justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex flex-col">
            <div className="text-red-500 font-semibold mt-2 flex items-center justify-center">
              {errors.question && "Field is Required"}
            </div>
          </div>
          <div className="flex flex-row p-5 justify-center items-center">
            <button
              type="submit"
              className="w-40 p-1 bg-blue-400 mt-5 items-center justify-center flex flex-row mr-3 rounded-lg"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => {
                append({ name: "" });
              }}
              className="w-40 p-1 bg-green-400 mt-5 items-center justify-center flex flex-row rounded-lg"
            >
              Add Question
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 justify-center items-center"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(update);
