import React from "react";
import Header from "./Component/Header";
import Card from "./Component/Card";

function App() {
  return (
    <div>
      <Header title={"View Audience"}/>
      <div>
        <button
          id="btn"
          className="button btn btn-white mt-5 mx-4 border-1 border-dark"
          data-bs-toggle="modal"
          data-bs-target="#Card"
        >
          Save Segment
        </button>
        <Card />
      </div>
    </div>
  );
}

export default App;
