import React from "react";

function Header({title}) {
  return (
    <div
      id="head"
      className="border border-dark row-4 p-3 d-flex align-items-center"
    >
      <img className="img-arrow" src="/left-arrow.png" alt="none" />
      <h4 className="m-0 mx-2 text-dark">{title}</h4>
    </div>
  );
}

export default Header;
