import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteNote, selectNote } from "../store/notesSlice";
import ButtonContainer from "./ButtonContainer";
import type { Note } from "../types/note";
import { useNavigate } from "react-router";

interface NoteListProps {
  limit?: number; // ✅ Optional prop to limit the number of notes displayed
}

import { useSearchParams } from "react-router-dom";

const NoteList: React.FC<NoteListProps> = ({ limit}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const categories = useSelector((state: RootState) => state.notes.categories);
 /*  const dispatch = useDispatch(); */

  if (!notes || notes.length === 0) {
    return <p>No notes available.</p>;
  }

  const displayedNotes = limit ? [...notes].reverse().slice(0, limit) : notes;

  return (
    <ul className="flex flex-col w-full justify-center">
      {displayedNotes.map((note) => (
        <li
          onClick={() => setSearchParams({ noteId: note.id.toString() })} // ✅ Update URL query
          className="card w-full h-fit hover:cursor-pointer hover:bg-amber-200 hover:dark:bg-gray-700"
          key={note.id}
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-end h-0">
              {note.categories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId);
                return category ? <span className="m-1" key={category.id}>{category.icon} </span> : null;
              })}
            </div>
            <h3 className="font-bold text-xl">{note.title}</h3>
            <p>{note.content.length > 100 ? `${note.content.slice(0, 97)}...` : note.content}</p>
          </div>
          {/* <ButtonContainer buttons={[
            { text: "Edit", onClick: () => onEditNote(note), type: "button", variant: "primary" },
            { text: "Delete", onClick: () => dispatch(deleteNote(note.id)), type: "button", variant: "secondary" },
          ]} /> */}
        </li>
      ))}
    </ul>
  );
};

export default NoteList;