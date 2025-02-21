"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

export default function Modal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalUpload = document.getElementById("modal-uploadcloth-id");
  const router = useRouter();

  function handleCloseModal() {
    router.back();
  }

  useEffect(() => {
    if (!modalRef.current?.open) {
      modalRef.current?.showModal();
    }
  }, []);

  if (!modalUpload) return null;

  return createPortal(
    <dialog
      className="shadow-teal-700 shadow-md border border-teal-600 flex flex-col p-2 rounded-[.7rem] overflow-hidden"
      ref={modalRef}
      onClose={handleCloseModal}
    >
      <div className="bg-rose-600 h-8 w-8 flex items-center justify-center rounded-full absolute -top-2 -right-3 z-[999999]">
        <IoClose
          className="cursor-pointer text-2xl text-lightRose1"
          onClick={handleCloseModal}
        />
      </div>

      {children}
    </dialog>,
    modalUpload
  );
}
