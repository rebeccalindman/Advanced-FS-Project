import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
/* import { RootState } from "../store/store"; */
import { addNote, editNote } from "../store/notesSlice";
import ButtonContainer from "./ButtonContainer";
import Checkboxes from "./Checkboxes";
import type { Note } from "../types/note";
import useConfirmNavigation from "../hooks/useConfirmNavigation";

interface NoteFormProps {
  noteToEdit?: Note | null;
  onEditDone?: () => void;
  onChange?: (hasUnsavedChanges: boolean) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ noteToEdit, onEditDone, onChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState(noteToEdit?.title || "");
  const [content, setContent] = useState(noteToEdit?.content || "");
  const [selectedCategories, setSelectedCategories] = useState<number[]>(noteToEdit?.categories || []);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // When a new note is selected for editing, update the state
    setTitle(noteToEdit?.title || "");
    setContent(noteToEdit?.content || "");
    setSelectedCategories(noteToEdit?.categories || []);
    setHasUnsavedChanges(false);
  }, [noteToEdit]);

  useEffect(() => {
    if (onChange) onChange(hasUnsavedChanges);
  }, [hasUnsavedChanges]);

  const handleSave = () => {
    if (noteToEdit) {
      // If editing, update the note
      dispatch(editNote({ ...noteToEdit, title, content, categories: selectedCategories }));
    } else {
      // If creating a new note
      const newNote = { id: Date.now(), title, content, categories: selectedCategories };
      dispatch(addNote(newNote));
    }

    // Reset form fields and exit edit mode
    setTimeout(() => {
      setTitle("");
      setContent("");
      setSelectedCategories([]);
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
      <textarea className="outline p-2 flex-1 rounded" placeholder="A place for your thoughts..." value={content} onChange={(e) => { setContent(e.target.value); handleChange(); }} />
      <Checkboxes selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} onChange={handleChange} />
      <ButtonContainer buttons={[
        { text: noteToEdit ? "Update" : "Save", onClick: handleSave, type: "button", variant: "primary" },
        { text: "Cancel", onClick: () => navigate("/"), type: "button", variant: "secondary" },
      ]} />
      {/* {hasUnsavedChanges && <p className="mb-4 text-black font-bold">Unsaved changes!</p>} */}
    </form>
  );
};

export default NoteForm;

