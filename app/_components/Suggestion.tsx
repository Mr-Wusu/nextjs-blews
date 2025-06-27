import { SuggestionType } from "@/types/types";
import Image from "next/image";

function Suggestion({ suggestion }: { suggestion: SuggestionType }) {
  return (
    <article className="bg-white rounded-[.5rem] flex flex-col gap-2 h-fit overflow-hidden shadow-md shadow-black/70">
      <div className="relative w-full h-[15rem]">
        <Image
          className=" object-cover"
          src={suggestion.image}
          alt={suggestion.id.toString()}
          fill
        />
      </div>
      <div className="flex flex-col gap-1 px-4 pt-2 pb-4">
        <h3 className="text-rose-500">
          Suggested by:{" "}
          <span className="semibold text-darkRose1">
            {suggestion.requestedBy}
          </span>
        </h3>
        <p className="mt-2 text-rose-500">
          Description:{" "}
          <span className="block text-darkRose1">{suggestion.description}</span>
        </p>
      </div>
    </article>
  );
}

export default Suggestion;
