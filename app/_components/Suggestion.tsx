"use client";
import { SuggestionType } from "@/types/types";
import Image from "next/image";
import { Button } from "./Button";
import { MdDelete } from "react-icons/md";

function Suggestion({ suggestion }: { suggestion: SuggestionType }) {
  function handleDelete(id: string) {
    // Implement the delete functionality here
    console.log(`Delete suggestion with id: ${id}`);
  }

  return (
    <article className="bg-white rounded-[.5rem] flex flex-col gap-2 h-fit overflow-hidden shadow-md shadow-black/70 w-fit relative">
      <MdDelete
        className="absolute top-2 right-2 z-10 text-3xl text-rose-700 hover:text-rose-600 transition-all duration-200 cursor-pointer"
        onClick={() => {
          handleDelete(suggestion.id.toString());
        }}
      />

      <div className="relative max-w-[22rem] w-full  h-[15rem]">
        <Image
          className=" object-cover"
          src={suggestion.image}
          alt={suggestion.id.toString()}
          fill
        />
      </div>
      <div className="flex flex-col gap-1 px-4 pt-2 pb-4 w-[20rem]">
        <div className="flex justify-between">
          <h3 className="text-rose-500 text-sm">Suggested by:</h3>
          <div className="semibold text-darkRose1 flex  items-center">
            <div></div>
            <div className="flex flex-col">
              <p className="text-sm leading-3">{suggestion.requestedBy}</p>
              <p className="text-sm text-gray-600">{suggestion.email}</p>
            </div>
          </div>
        </div>

        <p className="mt-2 text-rose-500">
          Description:{" "}
          <span className="block text-darkRose1">{suggestion.description}</span>
        </p>
      </div>
      <div className="flex gap-5 px-4 pb-5 self-center">
        <Button>Accept</Button>
        <Button>Reject</Button>
      </div>
    </article>
  );
}

export default Suggestion;
