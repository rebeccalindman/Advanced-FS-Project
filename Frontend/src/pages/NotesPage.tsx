import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, addNote} from "../store/notesSlice";
import type { RootState, AppDispatch } from "../store/store";
import NoteList from "../components/NoteList/NoteList";
import Button from "../components/Button/Button";

export const NotesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { notes, loading, error } = useSelector((state: RootState) => state.notes);

  /*   useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]); */

    useEffect(() => {
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Dispatches an action to add a new note with default values.
 * Title: "New note", text: "Hello world", category: [1]
 */
/*******  70d7842c-dd03-427a-837b-bdfb32353d3d  *******/  dispatch(fetchNotes())
    .unwrap()
    .then((data) => console.log("Fetched notes:", data))
    .catch((err) => console.error(err));
}, [dispatch]);


    const handleAdd = () => {
    dispatch(addNote({ title: "New note", text: "Hello world", category: "personal" }))
        .unwrap()
        .then(() => dispatch(fetchNotes())); // ✅ refresh full list
    };


    return (
        <main>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button onClick={handleAdd}>Add Note</Button>
        <NoteList />
        </main>
    );
};