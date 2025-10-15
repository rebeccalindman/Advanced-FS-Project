// routes.ts

import { createBrowserRouter } from 'react-router-dom'


import App from './App';
import NewNote from './pages/NewNote.tsx'
import AllNotesView from "./pages/AllNotesView.tsx"
/* import NoteDetail from './components/NoteDetail.tsx'; */
import EditNoteView from './pages/EditNoteView.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <AllNotesView />
            },
            {
                path: '/new-note',
                element: <NewNote />
            },
            /* {
                path: "note/:id",
                element: <NoteDetail />
            }, */
            {
                path: "edit-note/:id",
                element: <EditNoteView />, // Make sure you have this component
            },
        ],
    },
]);

export default router
