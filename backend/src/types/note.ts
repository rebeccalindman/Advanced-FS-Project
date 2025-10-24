import { User } from "./user";

// /types/notes.ts
export interface Note {
    id: string;
    title: string;
    text: string;
    accessLevel: string;
    category?: string;
    created_at: Date;
    updated_at?: Date;
}

export interface PublicNote {
    id: string;
    title: string;
    text: string;
    accessLevel: string;
    category?: string;
    created_at: string;
    updated_at?: string;
}

export interface NewNote {
    title: string;
    text: string;
    category?: string;
}

export interface NoteUser {
    userId: User["id"];
    username: User["username"]
    noteId: Note["id"];
    accessLevel: "read" | "edit" | "owner";
}