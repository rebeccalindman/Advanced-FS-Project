// AllNotesView.tsx

import { useSelector } from "react-redux";
import Button from "../components/Button/Button";
import NoteList from "../components/NoteList"
import { useNavigate, useSearchParams } from "react-router-dom"
import NoteDetail from "../components/NoteDetail";
import { RootState } from "../store/store";

/* interface AllNotesViewProps {} */

function AllNotesView() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("noteId"); // Get noteId from URL§
  const notes = useSelector((state: RootState) => state.notes.notes);
  const selectedNote = notes.find((note) => note.id === Number(noteId));
  
  return (
    <main className="flex flex-col justify-center align-center flex-1 col-start-2 col-end-4">
      <h2>All notes</h2>
      <Button text = "Create a Note" onClick={() => navigate("/new-note")} />
      <NoteList  />
      {selectedNote && (
            <NoteDetail note={selectedNote} onClose={() => setSearchParams({})} />
          
        )}
    </main>
  );
}

export default AllNotesView