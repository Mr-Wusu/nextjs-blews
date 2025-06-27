import Suggestion from "@/app/_components/Suggestion";
import suggestions from "@/data/suggestions";
import { SuggestionType } from "@/types/types";

// interface Suggestion {
//   id: number;
//   requestedBy: string;
//   description: string;
//   image: string;
// }
export default function page() {
  return (
    <section className="w-full min-h-screen">
      <div className="md:hidden items-center  px-4 py-24 flex flex-col gap-9">
        <p>This page is for showing all suggestions from each of our users!</p>
        {suggestions.map((suggestion: SuggestionType) => (
          <Suggestion key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
      <div className="hidden md:grid "></div>
    </section>
  );
}
