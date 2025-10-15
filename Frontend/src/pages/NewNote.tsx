import React, { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NoteDetail from '../components/NoteDetail';
import Button from '../components/Button/Button';
import useConfirmNavigation from '../hooks/useConfirmNavigation';

interface Note {
  id: number;
  title: string;
  content: string;
  categories: number[];
}


const NewNote: React.FC = () => {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("noteId"); // Get noteId from URL
  const notes = useSelector((state: RootState) => state.notes.notes);
  const selectedNote = notes.find((note) => note.id === Number(noteId));
  const navigate = useNavigate();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const handleNavigate = useConfirmNavigation(hasUnsavedChanges);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return (
    <>
      <aside>
        <Button text={'View all notes'} onClick={() => handleNavigate('/')} />
        <NoteList  />
      </aside>
      <main>
        <h2>{editingNote ? "Edit Note" : "Create a Note"}</h2>
        <section className='card w-full'>
          <NoteForm
            noteToEdit={editingNote}
            onEditDone={() => setEditingNote(null)}
            onChange={() => setHasUnsavedChanges(true)}
          />
        </section>
        <h2>Recent Notes</h2>
        <NoteList limit={2} />
        {selectedNote && (
            <NoteDetail note={selectedNote} onClose={() => setSearchParams({})} />
        )}
      </main>
    </>
  );
};

export default NewNote;

