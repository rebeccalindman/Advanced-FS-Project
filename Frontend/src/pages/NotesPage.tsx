import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, addNote, editNote, deleteNote, selectNote } from "../store/notesSlice";
import type { RootState, AppDispatch } from "../store/store";

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
        <div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleAdd}>Add Note</button>
        <ul>
            {Array.isArray(notes) && notes.length > 0 ? (
                notes.map((n) => (
                    <li key={n.id}>
                    <strong>{n.title || "Untitled"}</strong> — {n.text || "No content"} ({n.category || "Uncategorized"})
                    </li>
                ))
                ) : (
                <p>No notes found.</p>
                )
            }
        </ul>
        </div>
    );
};