import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import NoteForm from "../components/NoteForm";

const EditNoteView: React.FC = () => {
  const { id } = useParams(); // Extract noteId from the URL
  const navigate = useNavigate();

  const notes = useSelector((state: RootState) => state.notes.notes);
  const noteToEdit = notes.find((note) => note.id === Number(id));

  if (!noteToEdit) {
    return <p>Note not found.</p>; // Show an error message if the note doesn't exist
  }

  return (
    <main className="col-start-2 col-end-4">
      <h2>Edit Note</h2>
      <section className="card w-full">
        <NoteForm noteToEdit={noteToEdit} onEditDone={() => navigate("/all-notes")} />
      </section>
    </main>
  );
};

export default EditNoteView;
