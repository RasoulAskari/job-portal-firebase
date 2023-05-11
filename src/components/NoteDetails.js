"use client";
import { useEffect } from "react";
import { app, database } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function NoteDetails({ ID }) {
  useEffect(() => {
    getSingleNote();
  }, [ID]);

  const getSingleNote = async () => {
    if (ID) {
      const singleNote = doc(database, "notes", ID);
      const data = await getDoc(singleNote);
      console.log({ ...data.data(), id: data.id });
    }
  };
  return <></>;
}
