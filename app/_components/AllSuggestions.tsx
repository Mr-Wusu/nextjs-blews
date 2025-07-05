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

  if (suggestions === undefined) {
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
    <div className="flex flex-col gap-y-14">
      {suggestions.map((suggestion: EnrichedSpecialRequest) => (
        <Suggestion key={suggestion._id} suggestion={suggestion} />
      ))}
    </div>
  );
}
