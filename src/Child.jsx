import React from "react";

function Child(props) {
  return (

    <>
    <li>
    <div>I have a {props.brand}</div>
    </li>
    </>
    // <div>
    //   Your name <b>{props.nam.Fname}</b> is good.Gender is{" "}
    //   <b>{props.nam.Gender}</b>.You also pursuing <b>{props.nam.Education} </b>
    //   very nice.
    // </div>
  );
}

export default Child;
