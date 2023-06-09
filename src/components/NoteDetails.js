"use client";
import { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "../../styles/Evernote.module.scss";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function NoteDetails({ ID }) {
  const [singleNote, setSingleNote] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");

  useEffect(() => {
    getSingleNote();
  }, [ID]);

  const getEditData = () => {
    setIsEdit(true);
    setNoteTitle(singleNote.noteTitle);
    setNoteDesc(singleNote.noteDesc);
  };

  const getSingleNote = async () => {
    if (ID) {
      const singleNote = doc(database, "notes", ID);
      const data = await getDoc(singleNote);
      setSingleNote({ ...data.data(), id: data.id });
    }
  };

  const editNote = (id) => {
    const collectionById = doc(database, "notes", id);
    updateDoc(collectionById, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      window.location.reload();
    });
  };

  const deleteNote = (id) => {
    const collectionId = doc(database, "notes", id);

    deleteDoc(collectionId).then(() => {
      window.location.reload();
    });
  };
  return (
    <>
      <div>
        <button className={styles.editBtn} onClick={getEditData}>
          Edit
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => deleteNote(singleNote.id)}
        >
          Delete
        </button>
      </div>
      <h2>{singleNote.noteTitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: singleNote.noteDesc }}></div>

      <img src={singleNote.imageUrl} className={styles.photo} />

      {isEdit ? (
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            value={noteTitle}
            placeholder="Enter the Title.."
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <div className={styles.ReactQuill}>
            <ReactQuill value={noteDesc} onChange={setNoteDesc} />
          </div>
          <button
            className={styles.saveBtn}
            onClick={() => editNote(singleNote.id)}
          >
            Update Note
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
