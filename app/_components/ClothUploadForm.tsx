"use client";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "./Button";

export default function ClothUploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/clothes/upload-cloth", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Cloth uploaded successfully");
        // Clear form data
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        toast("Failed to upload cloth", { icon: "❌" });
        console.error("Failed to upload cloth");
      }
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
          {isSubmitting ? "Uploading..." : "Upload cloth"}
        </Button>
      </form>
      <Toaster />
    </>
  );
}
