import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { APIBaseUrl } from "../../config";
import { useNavigate } from "react-router-dom";

export default function DeleteButton({ userId }) {
  const dialogRef = useRef(null);
  const outputRef = useRef(null);
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    const res = await axios.delete(`${APIBaseUrl}users/${userId}`);
    const data = await res.data;
    console.log(data);
    navigate("/");
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    if (typeof dialog.showModal !== "function") {
      setOutput("Modal dialog not supported");
    }

    const handleInvokeClick = () => {
      dialog.returnValue = "false";
      dialog.showModal();
    };

    const handleDialogClose = () => {
      dialog.returnValue = dialog.returnValue.toLowerCase() === "true";
      setOutput(dialog.returnValue);
    };

    const handleCancelClick = () => {
      dialog.close("false");
    };

    const handleDialogClick = (e) => {
      const rect = dialog.getBoundingClientRect();
      const inDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!inDialog) dialog.close();
    };

    const invokeButton = document.getElementById("invoke");
    invokeButton.addEventListener("click", handleInvokeClick);
    dialog.addEventListener("close", handleDialogClose);
    dialog
      .querySelector(".cancel")
      .addEventListener("click", handleCancelClick);
    dialog.addEventListener("click", handleDialogClick);

    return () => {
      invokeButton.removeEventListener("click", handleInvokeClick);
      dialog.removeEventListener("close", handleDialogClose);
      dialog
        .querySelector(".cancel")
        .removeEventListener("click", handleCancelClick);
      dialog.removeEventListener("click", handleDialogClick);
    };
  }, []);
  return (
    <main role="main">
      <button id="invoke" className="warn">
        Delete account
      </button>

      <dialog ref={dialogRef}>
        <form method="dialog">
          <i className="cancel fa-solid fa-xmark"></i>
          <strong>Confirm action</strong>
          <p>Are you sure you want to delete your account?</p>
          <menu>
            <small>
              <i className="fa-solid fa-keyboard"></i> esc
            </small>
            <button value="false">Close</button>
            <button onClick={handleDelete} value="true" className="warn">
              Yes
            </button>
          </menu>
        </form>
      </dialog>

      <output aria-live="polite" ref={outputRef}>
        {output}
      </output>
    </main>
  );
}
