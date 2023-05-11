import styles from "../../styles/Evernote.module.scss";

export default function NoteOperations() {
  return (
    <>
      <div className={styles.btnContainer}>
        <button className={styles.button}>Add a New Note</button>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.input} placeholder="Enter the Title.." />
      </div>
    </>
  );
}
