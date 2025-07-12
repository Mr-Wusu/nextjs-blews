"use client";
import { EnrichedSpecialRequest } from "@/types/types";
import Image from "next/image";
import { Button } from "./Button";
import { MdDelete } from "react-icons/md";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Id as GenericId } from "@/convex/_generated/dataModel";
import { ButtonWhite } from "./ButtonWhite";
type SpecialRequestId = GenericId<"specialRequests">;

function Suggestion({ suggestion }: { suggestion: EnrichedSpecialRequest }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [status, setStatus] = useState(suggestion.status);
  console.log("Suggestion component rendered with suggestion:", suggestion);

  const deleteSuggestion = useMutation(
    api.specialRequests.deleteSpecialRequest
  );
  const updateSuggestionStatus = useMutation(
    api.specialRequests.updateSpecialRequestStatus
  );

  async function handleDelete(id: SpecialRequestId) {
    // Implement the delete functionality here

    try {
      await deleteSuggestion({ requestId: id });
      toast.success("Suggestion deleted successfully!");
    } catch (error) {
      toast.error(`Error deleting suggestion: ${error}`);
    } finally {
      setConfirmDelete(false);
    }
  }

  async function respondToSuggestion(
    id: SpecialRequestId,
    newStatus: "approved" | "rejected"
  ) {
    try {
      await updateSuggestionStatus({
        requestId: id,
        status: newStatus,
      });
      setStatus(newStatus);
      toast.success(`Suggestion ${newStatus} successfully!`);
    } catch (error) {
      toast.error(`Error responding to suggestion: ${error}`);
    }
  }

  return (
    <>
      <article className="bg-white rounded-[.5rem] flex flex-col gap-2 h-fit overflow-hidden shadow-md shadow-black/70 w-fit relative mx-auto">
        <MdDelete
          className="absolute top-2 right-2 z-10 text-3xl text-rose-700 hover:text-rose-600 transition-all duration-200 cursor-pointer"
          onClick={() => setConfirmDelete(true)}
        />

        {confirmDelete && (
          <div className="absolute top-0 flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-[.88] rounded-lg shadow-lg shadow-black p-6 z-50">
            <h2 className="text-rose-800 font-semibold text-lg">
              Are you sure you want to delete this suggestion?
            </h2>
            <p className="text-gray-600">This action cannot be undone.</p>
            <div className="flex gap-4 mt-4">
              <Button
                className=""
                onClick={() => handleDelete(suggestion._id as SpecialRequestId)}
              >
                Delete
              </Button>
              <ButtonWhite
                className="bg-lightRose1 text-rose-800 hover:bg-rose-300 hover:text-white"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </ButtonWhite>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              This action will permanently delete the item from the database.
            </p>
          </div>
        )}

        <div className="relative max-w-[22rem] w-full  h-[15rem]">
          <Image
            className=" object-cover"
            src={suggestion.image}
            alt={suggestion._id.toString()}
            fill
            priority
          />
        </div>
        <div className="flex flex-col gap-1 px-4 pt-2 pb-4 w-[20rem]">
          <div className="flex gap-2">
            <h3 className="text-rose-500 text-[.85rem] leading-4">
              Suggested by:
            </h3>
            <div className="semibold text-darkRose1 flex  items-center gap-2 ">
              <div className="relative h-9 w-9 rounded-full overflow-hidden">
                <Image
                  className="object-cover"
                  src={suggestion.requestedBy.imageUrl}
                  alt={`${suggestion.requestedBy.name}'s profile picture`}
                  fill
                  sizes="36px"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-[.85rem] leading-4">
                  {suggestion.requestedBy.name}
                </p>
                <p
                  className="text-[.75rem] leading-3"
                  style={{ wordBreak: "break-word" }}
                >
                  {suggestion.requestedBy.email}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-2 text-rose-500">
            Description:{" "}
            <span className="block text-darkRose1">
              {suggestion.description}
            </span>
          </p>
        </div>
        {status === "pending" ? (
          <div className="flex gap-5 px-4 pb-5 self-center">
            <Button
              onClick={() =>
                respondToSuggestion(
                  suggestion._id as SpecialRequestId,
                  "approved"
                )
              }
            >
              Accept
            </Button>
            <Button
              onClick={() =>
                respondToSuggestion(
                  suggestion._id as SpecialRequestId,
                  "rejected"
                )
              }
            >
              Reject
            </Button>
          </div>
        ) : (
          <div
            className={`h-10 w-full flex justify-center items-center  tracking-wider capitalize font-bold ${status === "rejected" ? "bg-rose-600 text-white" : status === "approved" ? "bg-rose-300 text-rose-800" : ""}`}
          >
            <p>{status}!</p>
            <span className="text-white">
              {status === "approved" ? " 👌" : " 🙄"}
            </span>
          </div>
        )}
      </article>
      <Toaster />
    </>
  );
}

export default Suggestion;
