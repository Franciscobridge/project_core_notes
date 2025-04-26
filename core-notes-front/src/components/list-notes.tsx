import { ListNoteProps, Note } from "../assets/utils/types";
import NotaCard from "./nota-card";
import { useEffect, useState } from "react";

export default function ListNotes({ newNote, valueFilter }: ListNoteProps) {
  const [listNotes, setListNotes] = useState<Note[]>([]);
  const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([]);

  async function getAllNotes() {
    try {
      const response = await fetch("http://localhost:3333/all-notes");
      if (!response.ok) {
        throw new Error("Erro ao buscar usuarios");
      }

      const data: Note[] = await response.json();

      setListNotes(data.filter((note) => note.isFavorite == false));
      setFavoriteNotes(data.filter((note) => note.isFavorite == true));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllNotes();
  }, [newNote]);

  function filterNotes(notes: Note[], query: string) {
    return (
      notes.filter((note) =>
        note.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ) ||
      notes.filter((note) =>
        note.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    );
  }

  const filteredFavoritesNotes = filterNotes(favoriteNotes, valueFilter);
  const filteredOthersNotes = filterNotes(listNotes, valueFilter);

  return (
    <div className="flex w-full h-auto flex-col">
      <div className="flex flex-col w-full h-auto md:px-16 mx-auto mt-10 md:mt-4">
        {valueFilter.length > 0 ? (
          <>
            {filteredFavoritesNotes && (
              <>
                {filteredFavoritesNotes.length > 0 && (
                  <p className="text-gray-700 md:mx-14 mx-12 mb-5">Favoritas</p>
                )}
                <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:w-full justify-center">
                  {filteredFavoritesNotes.map((note) => (
                    <NotaCard key={note.id} note={note} update={getAllNotes} />
                  ))}
                </div>
              </>
            )}

            {filteredOthersNotes.length > 0 ||
            filteredFavoritesNotes.length > 0 ? (
              <>
                <p className="text-gray-700 md:mx-14 mx-12 mb-5 mt-4">Outras</p>
                <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:w-full justify-center">
                  {filteredOthersNotes.map((note) => (
                    <NotaCard key={note.id} note={note} update={getAllNotes} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-700 font-medium md:mx-20 mx-12">
                Nenhuma nota encontrada
              </p>
            )}
          </>
        ) : (
          <>
            {favoriteNotes && (
              <>
                {favoriteNotes.length > 0 && (
                  <p className="text-gray-700 md:mx-14 mx-12 mb-5">Favoritas</p>
                )}
                <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:w-full justify-center">
                  {favoriteNotes.map((note) => (
                    <NotaCard key={note.id} note={note} update={getAllNotes} />
                  ))}
                </div>
              </>
            )}

            {listNotes.length > 0 || favoriteNotes.length > 0 ? (
              <>
                <p className="text-gray-700 md:mx-14 mx-12 mb-5 mt-4">Outras</p>
                <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:w-full justify-center">
                  {listNotes.map((note) => (
                    <NotaCard key={note.id} note={note} update={getAllNotes} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-700 font-medium md:mx-20 mx-12">
                Nenhuma nota encontrada
              </p>
            )}
          </>
        )}
      </div>

      
    </div>
  );
}
