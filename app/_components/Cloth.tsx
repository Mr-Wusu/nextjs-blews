// In Cloth.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useOrganization } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { MdDelete } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import * as motion from "motion/react-client";
import { useState, useRef } from "react"; // Import useState and useRef
import { useMutation } from "convex/react"; // Import useMutation
import { api } from "@/convex/_generated/api"; // Import api
import { Button } from "./Button";

interface Clothing {
  _id: Id<"clothes">;
  imageUrl: string | null;
  alt: string;
  description: string;
  price: number;
  storageId: Id<"_storage">; // Add storageId to the interface
}

interface ClothProps {
  cloth: Clothing;
}

export default function Cloth({ cloth }: ClothProps) {
  const { membership } = useOrganization();
  const isAdmin = membership?.role === "org:admin";

  const [isEditing, setIsEditing] = useState(false); // State to control edit mode
  const [newImage, setNewImage] = useState<File | null>(null); // State for the new image file
  const formRef = useRef<HTMLFormElement>(null);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const updateClothMutation = useMutation(api.clothes.updateCloth); // Get the updateCloth mutation

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
    }
  }

  async function handleUpdateCloth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    const description = formData.get("description") as string;
    const alt = formData.get("alt") as string;
    const price = formData.get("price") as string;
    const parsedPrice = parseFloat(price);

    let newStorageId: Id<"_storage"> | undefined;

    if (newImage) {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": newImage.type },
        body: newImage,
      });
      const { storageId } = await result.json();
      newStorageId = storageId;
    }

   
    try {
      await updateClothMutation({
        _id: cloth._id,
        alt: alt || undefined,
        description: description || undefined,
        price: isNaN(parsedPrice) ? undefined : parsedPrice,
        image: newStorageId,
        oldImageStorageId: cloth.storageId,
      });
      setIsEditing(false);

    } catch (error) {
      console.error("Error updating cloth:", error);
    }
  }

  return (
    <motion.figure
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      className="relative radius flex flex-col w-[15.3125rem] md:w-[17rem] mx-auto h-[26rem] overflow-hidden border border-darkRose2 shadow-sm shadow-black"
    >
      {isAdmin && !isEditing && (
        <RiFileEditFill
          className="absolute z-10 text-rose-700 text-2xl top-[10px] left-2 hover:text-rose-600 transition-text duration-300 ease-in-out cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      )}
      {isAdmin && (
        <MdDelete
          className="absolute z-10 text-rose-700 text-3xl top-2 right-2 hover:text-rose-600 transition-text duration-300 ease-in-out cursor-pointer"
          onClick={() => console.log("Deleted!")}
        />
      )}

      {isEditing ? (
        <form
          onSubmit={handleUpdateCloth}
          ref={formRef}
          className="absolute inset-0 bg-white/80 z-20 p-4 flex flex-col"
        >
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <textarea
            className="border rounded p-2 flex-grow"
            placeholder="Description"
            name="description"
            defaultValue={cloth.description}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            defaultValue={cloth.price}
            className="border rounded p-2"
          />
          <input
            className="h-9 bg-white border-2 rounded px-2 w-full border-rose-500 focus:outline-none"
            placeholder="Enter a tag for this picture"
            required
            name="alt"
            defaultValue={cloth.alt}
          />
          <Button
            type="submit"
            className="  py-2 px-4 mt-2 w-full"
          >
            Save
          </Button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 py-2 px-4 rounded mt-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="relative h-[52%] ">
            <Image
              src={cloth.imageUrl || "/placeholder-image.jpg"}
              alt={cloth.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <figcaption className="flex flex-col py-3 px-4 gap-2 text-[0.9375rem] md:text-[1.025rem]">
            <h3 className="">Description</h3>
            <p className="">{cloth.description}</p>
            <div className="flex justify-between items-center pr-2">
              <div className="flex flex-col ">
                <p className="text-[15px]">Price:</p>
                <p className="text-[14px]">NGN{cloth.price}</p>
              </div>
              <Link
                className="bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 text-lightRose1 py-1 px-2 tracking-wide rounded self-center transition-bg duration-300 ease-in-out"
                href={`/clothes/${cloth._id}`}
              >
                Sew me
              </Link>
            </div>
          </figcaption>
        </>
      )}
    </motion.figure>
  );
}
