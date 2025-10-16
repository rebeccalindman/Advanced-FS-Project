import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";


interface NoteListProps {
  limit?: number; // ✅ Optional prop to limit the number of notes displayed
}

import { useSearchParams } from "react-router-dom";

const NoteList: React.FC<NoteListProps> = ({ limit}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const notes = useSelector((state: RootState) => state.notes.notes);
 /*  const dispatch = useDispatch(); */

  if (!notes || notes.length === 0) {
    return <p>No notes available.</p>;
  }

  const displayedNotes = limit ? [...notes].reverse().slice(0, limit) : notes;

  return (
    <ul className="flex flex-col w-full justify-center bg-[var(--color-primary)]">
      {displayedNotes.map((note) => (
        <li
          onClick={() => setSearchParams({ noteId: note.id.toString() })} // ✅ Update URL query
          className="card w-full h-fit hover:cursor-pointer hover:bg-amber-200 hover:dark:bg-gray-700 bg-white"
          key={note.id}
        >
          <h2>{note.title}</h2>
          <p>{note.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;