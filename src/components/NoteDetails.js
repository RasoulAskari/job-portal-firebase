"use client";
import { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "../../styles/Evernote.module.scss";

export default function NoteDetails({ ID }) {
  const [singleNote, setSingleNote] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getSingleNote();
  }, [ID]);

  const getEditData = () => {};

  const getSingleNote = async () => {
    if (ID) {
      const singleNote = doc(database, "notes", ID);
      const data = await getDoc(singleNote);
      setSingleNote({ ...data.data(), id: data.id });
    }
  };
  return (
    <>
      <div>
        <button className={styles.editBtn}>Edit</button>
        <button className={styles.deleteBtn}>Delete</button>
      </div>
      <h2>{singleNote.noteTitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: singleNote.noteDesc }}></div>
      {isEdit ? (
        <div className={styles.inputContainer}>
          <input className={styles.input} placeholder="Enter the Title.." />
          <div className={styles.ReactQuill}>
            <ReactQuill />
          </div>
          <button className={styles.saveBtn}>Update Note</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
