"use client";
import styles from "../../styles/Evernote.module.scss";
import { useState, useEffect } from "react";
import { app, database } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function NoteOperations({ getSingleNote }) {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const dbInstance = collection(database, "notes");
  const [noteDesc, setNoteDesc] = useState("");
  const [notesArray, setNotesArray] = useState([]);
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  useEffect(() => {
    getNotes();
  }, []);

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
        }),
        [0]
      );
    });
  };

  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
      getNotes();
    });
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    console.log(image);
    setImageAsFile((imageFile) => image);
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
          <form>
            <input type="file" onChange={handleImageAsFile} />
          </form>
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
            <div
              onClick={() => getSingleNote(note.id)}
              key={note.id}
              className={styles.notesInner}
            >
              <h3>{note.noteTitle}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}
