import Head from "next/head";
import { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import jsPDF from "jspdf";

const edit = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  let eId;

  const router = useRouter();
  const id = router.query.id;
  let k = 0;

  useEffect(() => {
    getTitle();
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

  //?Geeting question info
  const getTitle = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/section/show/${id}`, {
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
        getDetails();
      });
    });
  };

  console.log(questions, title);

  const pdfGenerate = () => {
    var doc = new jsPDF("portrait", "px", "a4", false);
    doc.text(`${title.name}`, 200, 60);
    doc.text(`${title.field} `, 185, 75);
    doc.text(`${title.title} `, 190, 90);
    doc.text(`Instruction: ${title.instruction}`, 160, 105);
    doc.text("Questions:", 50, 125);
    let x = 50,
      y = 125;
    {
      questions.map((ques, index) => {
        ques.question.map((q, i) => {
          doc.text(`${i + 1}.`, x + 20, (y += 15));
          doc.text(`${q.name}`, x + 30, y);
        });
      });
    }
    doc.save(`${title.name}-${title.title}-Questions.pdf`);
  };

  const DeleteQuestion = () => {
    setLoading(true);
    console.log(id);
    fetch(`http://localhost:8000/api/question/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      response.json().then(function (res) {
        setLoading(false);
        router.push("/");
      });
    });
  };

  return loading ? (
    <div className="flex justify-center items-center content-center">
      <Loader type="BallTriangle" color="#00BFFF" height="50" width="50" />
    </div>
  ) : (
    <div>
      <Head>
        <title>Edit | Questions</title>
      </Head>
      <Headers title="Edit/Update Questions" />
      <div className="flex flex-col">
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-1/2 border border-blue-300 m-5">
            <div className="bg-blue-100 p-10 justify-center items-center flex flex-col">
              <div>
                <b>College Name:</b> {title.name}
              </div>
              <div>
                <b>Test Name:</b> {title.title}
              </div>
              <div>
                <b>Field of Study:</b> {title.field}
              </div>
              <div>
                <b>Instruction:</b> {title.instruction}
              </div>
            </div>
            <div className="p-5">
              <b>Questions:</b>
              {questions.length > 0 ? (
                questions.map((ques, index) => {
                  eId = ques.id;

                  return (
                    <div key={index}>
                      {ques.question.map((q, i) => {
                        return q === null ? (
                          ""
                        ) : (
                          <div key={i}>
                            <b>{(k += 1)}. </b>
                            {q.name}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <div>No questions added</div>
              )}
            </div>
            <div className="flex flex-row justify-center mb-4">
              <div>
                <button
                  className="flex justify-center items-center bg-red-500 p-2 w-24 hover:cursor-pointer hover:bg-red-700 text-gray-50"
                  type="submit"
                  onClick={DeleteQuestion}
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  className="flex justify-center items-center bg-gray-300 p-2 w-48 hover:cursor-pointer hover:bg-Gray-500 ml-3"
                  type="submit"
                  onClick={pdfGenerate}
                >
                  Generate Pdf
                </button>
              </div>
              <div>
                <button
                  className="flex justify-center items-center bg-green-500 p-2 ml-3 w-24 hover:cursor-pointer hover:bg-green-700"
                  type="submit"
                  onClick={() =>
                    router.push({
                      pathname: "/update",
                      query: { id: id, eid: eId },
                    })
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default edit;
