import { Toaster } from "sonner";
import Logo from "./assets/logo_core.png"
import ListNotes from "./components/list-notes";
import { useState } from "react";
import { Search, Star, X } from "lucide-react";
import Alert from "./components/alert";
import { Note } from "./assets/utils/types";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("")
  const [isFavorite, setIsFavorite] = useState(false);
  const [newNote, setNewNote] = useState<Note[]>([]);

  async function handleAddNote() {
    if (!title.trim()) {
      Alert.Error({ message: "O título é obrigatório!" });
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/create-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, isFavorite }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar nota: ${response.status}`);
      }
      const data = await response.json();
      setNewNote(data);

      Alert.Success({ message: "Nota criada com sucesso" });

      setTitle("");
      setDescription("");
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen h-auto bg-gray-200 text-gray-800 pb-5">
      <Toaster />

      <div className="w-full h-16 bg-white fixed z-10 flex items-center justify-between md:px-9 px-4">
        <div className="flex  md:gap-6 gap-2 items-center">
          <img alt="Logo do CoreNotes" src={Logo} className="size-9" />
          <div className="flex items-center md:gap-14 gap-4">
            <h1 className="md:text-2xl text-[#455A64]">CoreNotes</h1>
            <div className="flex items-center shadow-md border border-gray-300 rounded bg-white md:w-[539px] p-1.5">
              <input
                type="search"
                placeholder="Pesquisar notas"
                className="bg-transparent text-sm md:text-base w-full h-full outline-none"
                aria-label="Pesquisar notas"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Search className="size-4 text-gray-400" />
            </div>
          </div>
        </div>
        <X className="size-5 text-gray-800 cursor-pointer" />
      </div>


      <div className="w-full flex items-center justify-center px-8 mt-24">
        <div className="flex mx-auto w-[590px] flex-col bg-white md:rounded-md rounded-3xl border border-gray-300 shadow-md">
          {/* Input do Título */}
          <div className="flex justify-between items-center px-5 py-2">
            <input
              type="text"
              placeholder="Título"
              className="placeholder:font-medium bg-transparent placeholder:text-gray-900 outline-none w-full"
              aria-label="Título da nota"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
            />
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
              className="border-none outline-none"
            >
              <Star
                className={`size-5 text-gray-800 cursor-pointer ${
                  isFavorite && "fill-[#FFA000]"
                }`}
              />
            </button>
          </div>

          {/* Textarea da Nota */}
          <div className="w-full h-14 border-t border-gray-300 flex px-5 py-2">
            <textarea
              className="w-full resize-none outline-none text-sm text-gray-700"
              placeholder="Criar notas..."
              aria-label="Criar nota"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddNote();
                }
              }}
            />
          </div>
        </div>
      </div>
      <ListNotes newNote={newNote} valueFilter={search} />
    </div>
  );
}
