import Head from "next/head";
import Headers from "../components/Headers";
import Content from "../components/Content";

export default function Create() {
  return (
    <div>
      <Head>
        <title>Create | Questions</title>
      </Head>
      {/* //! Importing Header Components */}
      <Headers title="Question Creator" />
      {/* //! Importing Sidebar Components
      <Sidebar /> */}
      {/* //! Importing Content Components */}
      <Content />
    </div>
  );
}
