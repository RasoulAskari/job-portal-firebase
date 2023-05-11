"use client";
import styles from "../../styles/Evernote.module.scss";
import { useState } from "react";
import { app, database } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const dbInstance = collection(database, "notes");
  const [noteDesc, setNoteDesc] = useState("");

  const addDesc = (value) => {
    setNoteDesc(value);
  };

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const saveNote = () => {
    console.log("done");
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDess: noteDesc,
    }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
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
            value={noteTitle}
          />
          <div className={styles.ReactQuill}>
            <ReactQuill onChange={addDesc} value={noteDesc} />
          </div>
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
