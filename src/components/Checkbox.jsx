import React from "react";
import { BsCheck } from "react-icons/bs";
import "./Checkbox.css";

const Checkbox = ({ name, onChange }) => {
  return (
    <label className="checkbox">
      <input type={"checkbox"} onChange={onChange} name={name} />
      <BsCheck className="mark" />
    </label>
  );
};

export default Checkbox;
