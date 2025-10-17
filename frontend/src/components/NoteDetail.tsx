import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Note } from "../types/note";
import ButtonContainer from "./ButtonContainer";
import { deleteNote } from "../store/notesSlice";

interface NoteDetailProps {
  note: Note;
  onClose: () => void;
}

const NoteDetail: React.FC<NoteDetailProps> = ({ note, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onEditNote(): void {
    onClose();
    navigate(`/edit-note/${note.id}`); // Navigate to edit page with note ID
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <section className="card">
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <ButtonContainer buttons={[
          { text: "Edit", onClick: onEditNote, type: "button", variant: "primary" },
          { text: "Close", onClick: onClose, type: "button", variant: "primary" },
          { text: "Delete", onClick: () => dispatch(deleteNote(note.id)), type: "button", variant: "secondary" },
        ]} />
      </section>
    </div>
  );
};

export default NoteDetail;
