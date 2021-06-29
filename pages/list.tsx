import Head from "next/head";
import { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Loader from "react-loader-spinner";
import router from "next/router";

const list = () => {
  const [title, setTitle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/question/get`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      response.json().then(function (res) {
        setLoading(false);
        console.log(res);
        setTitle(res);
      });
    });
  };

  const getTitle = (id) => {
    setLoading(true);
    fetch(`http://localhost:8000/api/question/show/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      response.json().then(function (res) {
        setQuestions(res);
        console.log(res);
        setLoading(false);
      });
    });
  };

  const viewQuestion = (id) => {
    console.log("View Question Working", id);
    router.push({ pathname: "/edit", query: { id: id } });
  };

  return loading ? (
    <div className="flex justify-center items-center content-center">
      <Loader type="BallTriangle" color="#00BFFF" height="50" width="50" />
    </div>
  ) : (
    <div>
      <Head>
        <title>Create | Questions</title>
      </Head>
      {/* //! Importing Header Components */}
      <Headers title="Question Creator" />
      <div className="flex flex-col justify-center items-center flex-wrap sm:flex sm:flex-row">
        {title.map((tit, i) => {
          return (
            <button
              key={i}
              className="flex flex-col justify-center items-center border border-blue-200 hover:bg-blue-50 hover:text-lg hover:border-blue-50 m-5 p-10 sm:w-1/4"
              onClick={() => viewQuestion(tit.id)}
            >
              <div>
                {tit.name}
                <br />
                {tit.field}
                <br />
                {tit.title}
                <br />
                <div>
                  <b>Instructions:</b>
                  {tit.instruction}
                </div>
                <br />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default list;
