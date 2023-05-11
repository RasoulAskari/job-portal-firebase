"use client";
import styles from "../../styles/Evernote.module.scss";
import { useState } from "react";

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  console.log(noteTitle);

  return (
    <>
      <div className={styles.btnContainer}>
        <button onClick={inputToggle} className={styles.button}>
          Add a New Note
        </button>
      </div>
      {isInputVisible ? (
        <div className={styles.inputContainer}>
          <input
            onChange={(e) => setNoteTitle(e.target.value)}
            className={styles.input}
            placeholder="Enter the Title.."
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
