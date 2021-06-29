import Head from "next/head";
import Headers from "../components/Headers";
import Content from "../components/Content";
import router from "next/router";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home | Questions</title>
      </Head>
      {/* //! Importing Header Components */}
      <Headers title="Question Creator" />
      {/* //! Importing Sidebar Components
      <Sidebar /> */}
      {/* //! Importing Content Components */}
      <div className="flex sm:flex-row flex-col justify-center items-center content-center">
        <div className="flex justify-center items-center content-center m-5">
          <button
            className="bg-green-500 p-5 w-full"
            onClick={() => router.push("/create")}
          >
            Build Question Paper
          </button>
        </div>
        <div className="flex justify-center items-center content-center m-5">
          <button
            className="bg-red-400 p-5 w-full"
            onClick={() => router.push("/list")}
          >
            View All Question Paper
          </button>
        </div>
      </div>
    </div>
  );
}
