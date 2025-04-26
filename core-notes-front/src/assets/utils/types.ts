export interface Note {
  id: string;
  title: string;
  description: string;
  isFavorite?: boolean;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteCardProps {
  note: Note;
  update: () => Promise<void>
}


export interface DataNoteType {
  title: string;
  description?: string;
}

export interface ListNoteProps {
    newNote: Note[]
    valueFilter: string
}