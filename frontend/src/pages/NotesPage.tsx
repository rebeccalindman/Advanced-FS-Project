import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, addNote} from "../store/notesSlice";
import type { RootState, AppDispatch } from "../store/store";
import NoteList from "../components/NoteList/NoteList";
import Button from "../components/Button/Button";
import NoteForm from "../components/NoteForm";

export const NotesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { notes, loading, error } = useSelector((state: RootState) => state.notes);

    //Gets notes from api on page load and saves to store
    useEffect(() => {
        dispatch(fetchNotes())
    }, [dispatch]);



    return (
        <main>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
        <NoteForm/>
        </div>
        <NoteList />
        </main>
    );
};