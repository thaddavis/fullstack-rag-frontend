import React from "react";
import FloatingEmojis from "./FloatingEmojis";

const App = () => {
  return (
    <div>
      <FloatingEmojis />

      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          className="text-9xl font-bold"
          style={{ marginTop: "auto", marginBottom: "auto" }}
        >
          {/* 305 */}
          🦜🔗 LangChain
        </h1>
        {/* <h1 style={{ marginTop: "auto", marginBottom: "auto" }}>305</h1> */}
        {/* <img
          src={"/Pinecone-Logo.png"}
          alt="Pinecone Logo"
          style={{
            display: "block",
            margin: "0 auto",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        /> */}
        {/* <img
          src={"/langchain_logo.png"}
          alt="LangChain Logo"
          style={{
            display: "block",
            margin: "0 auto",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        /> */}
      </div>
      {/* <img
        src={"/Pinecone-Logo.png"}
        alt="Image"
        style={{ display: "block", margin: "0 auto" }}
      /> */}
      {/* <h1>Your Main Content Here</h1> */}
    </div>
  );
};

export default App;
