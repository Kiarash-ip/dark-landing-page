import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import SectionOne from "./components/SectionOne";

function App() {
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Navigation />
      <Header />
      {/* <SectionOne /> */}
    </div>
  );
}

export default App;
