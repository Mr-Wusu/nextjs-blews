"use client"

import { Id } from "@/convex/_generated/dataModel";
import { Button } from "./Button";
import { ButtonWhite } from "./ButtonWhite";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";

interface ConfirmDeleteProps {
  _id: Id<"clothes">;
  storageId: Id<"_storage">;
  setOpenConfirmDelete: (isOpen: boolean) => void;
}

export default function ConfirmDelete({
  _id,
  storageId,
  setOpenConfirmDelete,
}: ConfirmDeleteProps) {
  const deleteCloth = useMutation(api.clothes.deleteCloth); // Get the deleteCloth mutation

  async function handleDeleteCloth(
    _id: Id<"clothes">,
    storageId: Id<"_storage">
  ) {
    // Get the deleteCloth mutation
    // Get the deleteFile mutation

    try {
      await deleteCloth({ _id, storageId });

      toast.success("Cloth deleted successfully!");
    } catch (error) {
      console.error("Error deleting cloth:", error);
    }
  }

  return (
    <div className="absolute top-0 flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-[.88] rounded-lg shadow-lg shadow-black p-6 z-50">
      <h2 className="text-rose-800 font-semibold text-lg">
        Are you sure you want to delete this item?
      </h2>
      <p className="text-gray-600">This action cannot be undone.</p>
      <div className="flex gap-4 mt-4">
        <Button
          className=""
          onClick={() => handleDeleteCloth(_id, storageId)}
        >
          Delete
        </Button>
        <ButtonWhite
          className="bg-lightRose1 text-rose-800 hover:bg-rose-300 hover:text-white"
          onClick={() => setOpenConfirmDelete(false)}
        >
          Cancel
        </ButtonWhite>
      </div>
      <p className="text-gray-500 text-sm mt-2">
        This action will permanently delete the item from the database.
      </p>
    </div>
  );
}
