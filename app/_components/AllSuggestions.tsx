"use client";

import Suggestion from "./Suggestion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { EnrichedSpecialRequest } from "@/types/types";
import {PulseLoader } from "react-spinners";


export default function AllSuggestions() {

  const suggestions = useQuery(
    api.specialRequests.getAllEnrichedSpecialRequests
  );

  const reversedSuggestions = suggestions?.slice().reverse();
  const identity = useQuery(api.specialRequests.getUserIdentity);
  console.log(identity);

  if (identity === undefined) {
    return (
      <div className="flex items-center gap-3 mt-16">
        <p>Loading</p>
        <PulseLoader color="#e11d48" loading={true} size={12} />
      </div>
    );
  }
  if (identity === null) {
    return (
      <div className="grid place-content-center">
        You must be logged in as admin to view suggestions.
      </div>
    );
  }

  if (reversedSuggestions === undefined) {
    return (
      <div className="h-full flex items-center mt-10">Loading suggestions</div>
    );
  }
  if (suggestions == null)
    return (
      <div className="grid place-content-center">
        There are no special requests yet
      </div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 px-4">
      {reversedSuggestions.map((suggestion: EnrichedSpecialRequest) => (
        <Suggestion key={suggestion._id} suggestion={suggestion} />
      ))}
    </div>
  );
}
