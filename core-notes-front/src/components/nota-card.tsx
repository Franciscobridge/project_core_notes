import { useEffect, useState } from "react";
import { CheckCircle, Pencil, Star, X } from "lucide-react";
import PaintBucket from "../assets/point-bucket.png";
import { colors } from "../assets/utils/colors";
import Alert from "./alert";
import { DataNoteType, NoteCardProps } from "@/assets/utils/types";

export default function NotaCard({ note, update }: NoteCardProps) {
  const [showColors, setShowColors] = useState(false);
  const [colorCard, setColorCard] = useState("#ffffff");
  const [readOnly, setReadOnly] = useState(true);
  const [dataNote, setDataNote] = useState<DataNoteType>({
    title: "",
    description: "",
  });
  const [isFavorite, setIsFavorite] = useState(note.isFavorite);

  useEffect(() => {
    setDataNote({ title: note.title, description: note.description });
    setColorCard(note.color);
    setIsFavorite(note.isFavorite);
  }, [note]);

  function handleEditNote() {
    setReadOnly(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setDataNote((prev) => ({ ...prev, [name]: value }));
  }

  const saveDataChanged = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/update-note/${note.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataNote),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao editar nota: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setReadOnly(true);
      Alert.Success({ message: "Nota editada com sucesso!" });
    } catch (error) {
      Alert.Error({ message: "Erro ao editar nota"})
      console.log(error);
    }
  };

  const handleChangeColorNote = async (color: string) => {
    try {
      const response = await fetch(
        `http://localhost:3333/update-note-color/${note.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ color }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao editar nota: ${response.status}`);
      }

      setColorCard(color);
      setShowColors(false);
    } catch (error) {
      console.log(error);
      Alert.Error({ message: "Erro ao editar nota"})
    }
  };

  const handleToogleNoteFavorite = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/update-note-favorite/${note.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isFavorite: !isFavorite }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao editar nota: ${response.status}`);
      }
      setIsFavorite(!isFavorite);
      update();
    } catch (error) {
      Alert.Error({ message: "Erro ao editar nota"})
      console.log(error);

    }
  };

  const handleDeleteNote = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/delete-note/${note.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao deletar nota: ${response.status}`);
      }
      Alert.Success({ message: "Nota deletada com sucesso!"})
      update();
    } catch (error) {
      Alert.Error({ message: "Erro ao deletar nota"})
      console.log(error)
    }
  };

  return (
    <div
      className={`relative flex flex-col max-w-[395px] min-w-[335px] min-h-[390px] rounded-[32px] shadow-md border border-gray-300`}
      style={{ background: colorCard }}
    >
      <div className="flex justify-between items-center px-8 py-3 gap-2">
        <input
          name="title"
          readOnly={readOnly}
          className="font-medium bg-transparent w-full outline-none truncate"
          value={dataNote.title}
          onChange={handleChange}
        />
        <button onClick={handleToogleNoteFavorite}>
          <Star
            className={`size-5 text-[#51646E] cursor-pointer ${
              isFavorite ? "fill-[#FFA000]" : ""
            }`}
          />
        </button>
      </div>
      <div className="flex flex-grow px-8 border-t border-gray-500 py-2">
        <textarea
          name="description"
          readOnly={readOnly}
          value={dataNote.description}
          className="text-[#4F4F4D] text-sm resize-none w-full bg-transparent outline-none"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4 justify-between items-center py-3 px-8 w-full">
        <div className="flex gap-3 relative">
          <button
            className="flex items-center justify-center hover:bg-black/15 rounded-full p-1 duration-200 transition"
            title="Editar nota"
            onClick={handleEditNote}
          >
            <Pencil className="size-5 text-[#51646E]" />
          </button>
          <div className="flex items-center justify-center hover:bg-black/15 rounded-full p-1 duration-200 transition">
            <img
              src={PaintBucket}
              alt="icone"
              className="cursor-pointer size-5"
              onClick={() => setShowColors(!showColors)}
            />
          </div>

          {/* Menu de cores */}
          {showColors && (
            <div className="absolute w-52 md:w-[395px] left-0 -bottom-20 z-10 md:bottom-full bg-white shadow-lg rounded-lg p-2">
              <div className="flex flex-wrap gap-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full cursor-pointer border border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => handleChangeColorNote(color)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {readOnly ? (
          <button
            className="flex items-center justify-center hover:bg-black/15 rounded-full p-1 duration-200 transition"
            title="eliminar nota"
            onClick={handleDeleteNote}
          >
            <X className="size-5 text-[#51646E] cursor-pointer" />
          </button>
        ) : (
          <button
            className="flex items-center justify-center hover:bg-black/15 rounded-full p-1 duration-200 transition"
            title="salvar nota"
            onClick={saveDataChanged}
          >
            <CheckCircle className="size-5 text-[#51646E] cursor-pointer font-bold" />
          </button>
        )}
      </div>
    </div>
  );
}
