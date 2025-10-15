import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
/* import { RootState } from "../store/store"; */
import { addNote, editNote } from "../store/notesSlice";
import Checkboxes from "./Checkboxes";
import type { Note } from "../types/note";
import type { RootState, AppDispatch } from "../store/store";


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

  useEffect(() => {
    // When a new note is selected for editing, update the state
    setTitle(noteToEdit?.title || "");
    setText(noteToEdit?.text || "");
    setCategory(noteToEdit?.category || "");
    setHasUnsavedChanges(false);
  }, [noteToEdit]);

  useEffect(() => {
    if (onChange) onChange(hasUnsavedChanges);
  }, [hasUnsavedChanges]);

  const handleSave = () => {
    if (noteToEdit) {
      // If editing, update the note
/*       dispatch(editNote({ ...noteToEdit, id, title, text, category: selectedCategories)); */
    } else {
      // If creating a new note
      const newNote = { title, text, category: category};
      dispatch(addNote(newNote));
    }

    // Reset form fields and exit edit mode
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
    <form className="flex flex-col gap-3 m-4 min-h-100">
      <input className="outline p-2 rounded" type="text" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value); handleChange(); }} />
      <textarea className="outline p-2 flex-1 rounded" placeholder="A place for your thoughts..." value={text} onChange={(e) => { setText(e.target.value); handleChange(); }} />
     {/*  <Checkboxes selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} onChange={handleChange} /> */}
      <button className="btn" onClick={handleSave}>{noteToEdit ? "Save" : "Create"}</button>
      {hasUnsavedChanges && <p className="mb-4 text-black font-bold">Unsaved changes!</p>}
    </form>
  );
};

export default NoteForm;

