import { Request } from "express";
import { TypedAuthRequest } from "../types/express/typedRequest";
import { Note, NoteUser } from "../types/note";

export const hasEditOrOwnerAccess = (req: TypedAuthRequest<Note>): boolean => {
    return req.body.accessLevel === 'edit' || req.body.accessLevel === 'owner';
};

export const hasOwnerAccess = (req: TypedAuthRequest<Note>): boolean => {
    return req.body.accessLevel === 'owner';
};

export const hasReadAccess = (req: TypedAuthRequest<Note>): boolean => {
    return req.body.accessLevel === 'read' || req.body.accessLevel === 'edit' || req.body.accessLevel === 'owner';
};