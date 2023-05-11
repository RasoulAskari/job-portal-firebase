"use client";
import styles from "../../styles/Evernote.module.scss";
import { useState } from "react";

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <>
      <div className={styles.btnContainer}>
        <button onClick={inputToggle} className={styles.button}>
          Add a New Note
        </button>
      </div>
      {isInputVisible ? (
        <div className={styles.inputContainer}>
          <input className={styles.input} placeholder="Enter the Title.." />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
