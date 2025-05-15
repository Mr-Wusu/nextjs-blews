"use client";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "./Button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {PulseLoader } from "react-spinners";

export default function ClothUploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveCloth = useMutation(api.clothes.uploadCloth);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    const selectedImage = formData.get("image") as File;
    const description = formData.get("description") as string;
    const alt = formData.get("alt") as string;  
    const price = formData.get("price") as string;
    const parsedPrice = parseFloat(price);

    if(!selectedImage || !description || !alt || isNaN(parsedPrice)) {
      return toast.error("Please fill in the fields correctly"!);
    }

    setIsSubmitting(true);

    try {
      // Step 1: Get upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: Upload the image
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });
      const { storageId } = await result.json();

      // Step 3: Save card data
      await saveCloth({      
        description,
        price: parseFloat(price),
        alt,
        image: storageId,
      });

      toast.success("Cloth uploaded successfully!");
      formRef.current.reset(); // Reset the form after successful upload
      
    } catch (error) {
      console.error("Error uploading cloth", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form
        className="flex flex-col gap-4 px-5 py-6"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <textarea
          className="min-h-32 bg-white border-2 rounded px-2 py-1 w-[20rem] border-rose-500 focus:outline-none resize-vertical transform translateZ-0"
          placeholder="Cloth description"
          name="description"
          required
        />
        <input
          className="h-9 bg-white border-2 rounded px-2 w-[20rem] border-rose-500 focus:outline-none"
          placeholder="Enter a tag for this picture"
          required
          name="alt"
        />
        <input
          className="h-9 bg-white border-2 rounded px-2 w-[20rem] border-rose-500 focus:outline-none"
          type="number"
          placeholder="Enter cloth's price"
          name="price"
          required
        />
        <input className="text-sm" type="file" name="image" required />
        <Button type="submit" className="min-w-fit px-2 mt-4">
          {isSubmitting ? (
            <div className="flex gap-2 items-center justify-center">
              <p>Uploading</p>
              <PulseLoader color="#fecdd3" loading={true} size={8} />
            </div>
          ) : (
            "Upload cloth"
          )}
        </Button>
      </form>
      <Toaster />
    </>
  );
}
