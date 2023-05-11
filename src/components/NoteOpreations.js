"use client";
import styles from "../../styles/Evernote.module.scss";
import { useState, useEffect } from "react";
import { app, database } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const dbInstance = collection(database, "notes");
  const [noteDesc, setNoteDesc] = useState("");
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    getNotes();
  });

  const addDesc = (value) => {
    setNoteDesc(value);
  };

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      setNotesArray(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  const saveNote = () => {
    console.log("done");
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
      getNotes();
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
      </button>
      <div>
        {notesArray.map((note) => {
          return (
            <div key={note.id} className={styles.notesInner}>
              <h3>{note.noteTitle}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}
