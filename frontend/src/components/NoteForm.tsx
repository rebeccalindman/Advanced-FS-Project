import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
/* import { RootState } from "../store/store"; */
import { addNote, editNote } from "../store/notesSlice";
import Checkboxes from "./Checkboxes";
import type { Note } from "../types/note";
import type { RootState, AppDispatch } from "../store/store";
import "./NoteForm.css";


interface NoteFormProps {
  noteToEdit?: Note | null;
  onEditDone?: () => void;
  onChange?: (hasUnsavedChanges: boolean) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ noteToEdit, onEditDone, onChange }) => {
  const dispatch = useDispatch<AppDispatch>();

//todo const navigate = useNavigate(); */

  const [title, setTitle] = useState<string>(noteToEdit?.title || "");
  const [text, setText] = useState<string>(noteToEdit?.text || "");
  const [category, setCategory] = useState<string>(noteToEdit?.category || "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

/*   useEffect(() => {
    // When a new note is selected for editing, update the state
    setTitle(noteToEdit?.title || "");
    setText(noteToEdit?.text || "");
    setCategory(noteToEdit?.category || "");
    setHasUnsavedChanges(false);
  }, [noteToEdit]); */

  useEffect(() => {
    if (onChange) onChange(hasUnsavedChanges);
  }, [hasUnsavedChanges]);

const handleSave = (e: React.FormEvent) => {
  e.preventDefault(); // <--- add this
  const category = "temporary";
  if (noteToEdit) {
    // editing logic
  } else {
    const newNote = { title, text, category };
    dispatch(addNote(newNote));
  }

  setTimeout(() => {
    setTitle("");
    setText("");
    setCategory("");
    if (onEditDone) onEditDone();
    setHasUnsavedChanges(false);
  }, 1000);
};

  const handleChange = () => {
    setHasUnsavedChanges(true);
  };

  return (
    <form>
      <input type="text" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value); handleChange(); }} />
      <textarea placeholder="A place for your thoughts..." value={text} onChange={(e) => { setText(e.target.value); handleChange(); }} />
     {/*  <Checkboxes selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} onChange={handleChange} /> */}
      <button type="submit" className="btn" onClick={handleSave}>{noteToEdit ? "Save" : "Create"}</button>
      {hasUnsavedChanges && <p className="unsaved-changes-warning">Unsaved changes!</p>}
    </form>
  );
};

export default NoteForm;

