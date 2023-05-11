"use client";
import styles from "../../styles/Evernote.module.scss";
import { useState } from "react";
import { app, database } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const dbInstance = collection(database, "notes");
  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const saveNote = () => {
    console.log("done");
    addDoc(dbInstance, {
      noteTitle: noteTitle,
    });
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
          <input
            onChange={(e) => setNoteTitle(e.target.value)}
            className={styles.input}
            placeholder="Enter the Title.."
          />
        </div>
      ) : (
        <></>
      )}
      <button onClick={saveNote} className={styles.saveBtn}>
        Save Note
      </button>{" "}
    </>
  );
}
