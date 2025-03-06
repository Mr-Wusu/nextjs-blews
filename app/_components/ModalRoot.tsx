"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

export default function ModalRoot({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalUpload = document.getElementById("root-modal");
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
      className={`${className} overflow-hidden rounded-[.7rem]`}
      ref={modalRef}
      onClose={handleCloseModal}
    >
      <div className=" bg-rose-600 hover:bg-rose-500 transition-all duration-300 h-7 w-7 flex items-center justify-center  absolute top-0 right-0 rounded-tr-[.7rem] rounded-bl-[.7rem] z-40">
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
