interface Note{
    id: string;
    title: string;
    text: string;
    category: string;
    created_at: Date | null;
    updated_at: Date | null;
}

export type {Note}