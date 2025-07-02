import Suggestion from "@/app/_components/Suggestion";
import suggestions from "@/data/suggestions";
import { SuggestionType } from "@/types/types";

export default function page() {
  return (
    <section className="w-full min-h-screen">
      <div className="md:hidden items-center  px-4 py-24 flex flex-col gap-9">
        <p className="text-2xl text-center">
          This page is for showing{" "}
          <span className="text-rose-600">suggestions </span> from our{" "}
          <span className="text-rose-600">users! </span>
        </p>
        {suggestions.map((suggestion: SuggestionType) => (
          <Suggestion key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
      <div className="hidden md:grid "></div>
    </section>
  );
}
