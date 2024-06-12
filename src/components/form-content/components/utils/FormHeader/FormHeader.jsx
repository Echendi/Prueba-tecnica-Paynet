import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import './FormHeader.css'

export default function FormHeader({ title, name }) {
  return (
    <>
      {name ? <p className="fh-title">{name}</p> : <CheckCircleIcon className="form-check" />}
      <span style={{transform: name? "translateY(0px)": ""}} className="form-title">{title}</span>
    </>
  );
}
