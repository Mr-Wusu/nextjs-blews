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
      className={`${className} overflow-x-hidden`}
      ref={modalRef}
      onClose={handleCloseModal}
    >
      <div className="bg-rose-600 h-7 w-7 flex items-center justify-center  absolute -top-1 -right-1">
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
