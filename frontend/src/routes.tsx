// routes.ts

import { createBrowserRouter } from 'react-router-dom'


import App from './App';

/* import NoteDetail from './components/NoteDetail.tsx'; */

import { NotesPage } from './pages/NotesPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <NotesPage />
            },
            {
                path: '/notes',
                element: <NotesPage />
            },
            /* {
                path: "note/:id",
                element: <NoteDetail />
            }, */
            {
                path: "edit-note/:id",
                element: <p>Edit note view :</p> // Make sure you have this component
            },
        ],
    },
]);

export default router
