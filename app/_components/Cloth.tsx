"use client";

import Image from "next/image";
import Link from "next/link";
import { useOrganization, useAuth } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { MdDelete, MdClose } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "./Button";
import { PulseLoader } from "react-spinners";
import ConfirmDelete from "./ConfirmDelete";
import toast, { Toaster, Toast } from "react-hot-toast";

interface Clothing {
  _id: Id<"clothes">;
  imageUrl: string | null;
  alt: string;
  description: string;
  price: number;
  storageId: Id<"_storage">;
}

interface ClothProps {
  cloth: Clothing;
}

export default function Cloth({ cloth }: ClothProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const user = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const updateClothMutation = useMutation(api.clothes.updateCloth);

  const [addToCart, setAddToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { membership } = useOrganization();
  const isAdmin = membership?.role === "org:admin";
  console.log(user);

 
  function showToastWithCloseButton(message: string) {
    toast.custom((t: Toast) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } fixed top-4 right-1/2 translate-x-1/2 z-[9999] bg-white shadow-md border border-gray-200 rounded p-4 px-6 flex items-center justify-between gap-4 w-full max-w-sm`}
      >
        <span className="text-rose-900 font-semibold tracking-wide">
          {message}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(t.id);
          }}
          className="text-gray-400 hover:text-gray-700 text-lg font-bold cursor-pointer"
        >
          <MdClose className="bg-rose-600 text-white h-5 w-5 rounded-full p-1  hover:bg-rose-500" />
        </button>
      </div>
    ));
  }

  const addToCartHandler = async () => {
    //check if user is looged in and is not an admin
    if (!user.isSignedIn)
      showToastWithCloseButton("Sign in to add cloth to cart");
    if (user.orgRole === "org:admin")
      showToastWithCloseButton("Admin should not be doing this 😒!");
    setAddToCart(true);
  };

  async function imageChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
    }
  }

  async function updateClothHandler(e: React.FormEvent<HTMLFormElement>) {
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

    setIsUpdating(true);
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
      setIsUpdating(false);
    } catch (error) {
      console.error("Error updating cloth:", error);
      setIsUpdating(false);
    }
  }

  return (
    <figure className="h-fit w-[19rem] rounded-[.7rem] flex flex-col mx-autoclo shadow-sm shadow-black relative mx-auto">
      <div className="flex flex-col h-full pb-1 relative">
        {isAdmin && (
          <div className="absolute w-full px-2 h-fit flex justify-between z-10 bg-transparent top-3 text-rose-700 text-2xl">
            <RiFileEditFill
              className="cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
            <MdDelete
              className="cursor-pointer"
              onClick={() => setOpenConfirmDelete(true)}
            />
          </div>
        )}
        {openConfirmDelete && (
          <ConfirmDelete
            _id={cloth._id}
            storageId={cloth.storageId}
            setOpenConfirmDelete={setOpenConfirmDelete}
          />
        )}
        {isAdmin && isEditing && (
          <form
            onSubmit={updateClothHandler}
            ref={formRef}
            className="absolute inset-0 bg-white/85 z-20 p-4 flex flex-col h-full w-full"
          >
            <input type="file" accept="image/*" onChange={imageChangeHandler} />
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
            <Button type="submit" className="  py-2 px-4 mt-2 w-full">
              {isUpdating ? (
                <div className="flex gap-2 items-center justify-center">
                  <p>Updating</p>
                  <PulseLoader color="#fecdd3" loading={true} size={8} />
                </div>
              ) : (
                "Update cloth"
              )}
            </Button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 py-2 px-4 rounded mt-2"
            >
              Cancel
            </button>
          </form>
        )}
        <div className="relative overflow-hidden h-[14.6rem] rounded-t-[.7rem]">
          <Image
            src={`${cloth.imageUrl}` || "/images/avatar.jpg"}
            alt={cloth.alt}
            fill
            className="absolute object-cover"
          />
        </div>
        <div className="flex flex-col h-fit w-full gap-3 px-3 pt-3 pb-4">
          <p className="w-fit font-semibold self-end">NGN {cloth.price}</p>
          <p className="px-2">{cloth.description}</p>
          {!isAdmin && !addToCart ? (
            <div className="flex justify-between px-3 mt-1">
              <Button
                className="font-semibold py-2 w-fit px-3 tracking-wide"
                onClick={addToCartHandler}
              >
                Add to cart
              </Button>
              <Link
                className="bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-400 hover:to-rose-700 transition-all duration-700 py-2 px-3 tracking-wide rounded-[.27rem] text-lightRose2 font-semibold "
                href={`/clothes/${cloth._id}`}
              >
                See details
              </Link>
            </div>
          ) : !addToCart ? (
            <Link
              href={`/clothes/${cloth._id}`}
              className="w-3/4 mx-auto grid place-content-center bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-400 hover:to-rose-700 transition-all duration-700 py-2 px-2 rounded-[.27rem] text-lightRose2 font-semibold tracking-wider"
            >
              See details
            </Link>
          ) : (
            ""
          )}

          {addToCart && user.isSignedIn === true ? (
            <div className="flex justify-between bg-transparent h-fit px-6 items-center">
              <Button
                type="button"
                className="w-fit px-4 py-2 text-xl font-semibold"
                onClick={() => {
                  if (cartCount === 0) {
                    setAddToCart(false);
                  } else {
                    setCartCount((prevCount) => prevCount - 1);
                  }
                }}
              >
                <FiMinus />
              </Button>
              <p>{cartCount}</p>
              <Button
                onClick={() => {
                  setCartCount((prev) => prev + 1);
                }}
                type="button"
                className="w-fit px-4 text-xl font-semibold py-2"
              >
                <FiPlus />
              </Button>
            </div>
          ) : addToCart && user.isSignedIn === false ? (
            <Link
              className="w-fit bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r py-2 px-3 tracking-wide rounded-[.27rem] text-lightRose2 font-semibold ml-auto mr-3"
              href={`/clothes/${cloth._id}`}
            >
              See details
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>

      <Toaster />
    </figure>
  );
  // return (
  //   <figure
  //     className={`relative radius flex flex-col w-[15.3125rem] md:w-[17rem] mx-auto h-fit overflow-hidden border border-darkRose2 shadow-sm shadow-black ${isScrolling ? "slide-up" : isEditing ? "h-[23rem]": isEditing && isScrolling ?"bg-black/50" : "bg-white/80"} transition-all duration-300 ease-in-out`}
  //   >
  //     {isAdmin && !isEditing && (
  //       <RiFileEditFill
  //         className="absolute z-10 text-rose-700 text-2xl top-[10px] left-2 hover:text-rose-600 transition-text duration-300 ease-in-out cursor-pointer"
  //         onClick={() => setIsEditing(true)}
  //       />
  //     )}
  //     {isAdmin && (
  //       <MdDelete
  //         className="absolute z-10 text-rose-700 text-3xl top-2 right-2 hover:text-rose-600 transition-text duration-300 ease-in-out cursor-pointer"
  //         onClick={() => setOpenConfirmDelete(true)}
  //       />
  //     )}
  //     {openConfirmDelete && (
  //       <ConfirmDelete
  //         _id={cloth._id}
  //         storageId={cloth.storageId}
  //         setOpenConfirmDelete={setOpenConfirmDelete}
  //       />
  //     )}

  //     {isEditing ? (
  //       <form
  //         onSubmit={handleUpdateCloth}
  //         ref={formRef}
  //         className="absolute inset-0 bg-white/80 z-20 p-4 flex flex-col h-[13rem]"
  //       >
  //         <input type="file" accept="image/*" onChange={handleImageChange} />
  //         <textarea
  //           className="border rounded p-2 flex-grow"
  //           placeholder="Description"
  //           name="description"
  //           defaultValue={cloth.description}
  //         />
  //         <input
  //           type="number"
  //           placeholder="Price"
  //           name="price"
  //           defaultValue={cloth.price}
  //           className="border rounded p-2"
  //         />
  //         <input
  //           className="h-9 bg-white border-2 rounded px-2 w-full border-rose-500 focus:outline-none"
  //           placeholder="Enter a tag for this picture"
  //           required
  //           name="alt"
  //           defaultValue={cloth.alt}
  //         />
  //         <Button type="submit" className="  py-2 px-4 mt-2 w-full">
  //           {isUpdating ? (
  //             <div className="flex gap-2 items-center justify-center">
  //               <p>Updating</p>
  //               <PulseLoader color="#fecdd3" loading={true} size={8} />
  //             </div>
  //           ) : (
  //             "Update cloth"
  //           )}
  //         </Button>
  //         <button
  //           type="button"
  //           onClick={() => setIsEditing(false)}
  //           className="bg-gray-300 py-2 px-4 rounded mt-2"
  //         >
  //           Cancel
  //         </button>
  //       </form>
  //     ) : (
  //       <>
  //         <div className="relative h-[13rem] ">
  //           <Image
  //             src={cloth.imageUrl || "/placeholder-image.jpg"}
  //             alt={cloth.alt}
  //             fill
  //             className="object-cover"
  //             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  //           />
  //         </div>
  //         <figcaption className="flex flex-col py-3 px-4 gap-2 text-[0.9375rem] md:text-[1.025rem]">
  //           <h3 className="">Description</h3>
  //           <p className="text-pretty">{cloth.description}</p>
  //           <div className="flex justify-between items-center pr-2">
  //             <div className="flex flex-col ">
  //               <p className="text-[15px]">Price:</p>
  //               <p className="text-[14px]">NGN{cloth.price}</p>
  //             </div>
  //             <Link
  //               className="bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 text-lightRose1 py-1 px-2 tracking-wide rounded self-center transition-bg duration-300 ease-in-out"
  //               href={`/clothes/${cloth._id}`}
  //               // scroll={false}
  //             >
  //               Sew me
  //             </Link>
  //           </div>
  //         </figcaption>
  //       </>
  //     )}
  //   </figure>
  // );
}
