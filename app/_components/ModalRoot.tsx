"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
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
  const [modalUpload, setModalUpload] = useState<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Access document only in the browser
    const rootModal = document.getElementById("root-modal");
    setModalUpload(rootModal);

    // Show the modal if not already open
    if (rootModal && modalRef.current && !modalRef.current.open) {
      modalRef.current.showModal();
    }
  }, []);

  function handleCloseModal() {
    if (modalRef.current) {
      modalRef.current.close();
    }
    router.back();
  }

  if (!modalUpload) return null;

  return createPortal(
    <dialog
      className={`${className} overflow-hidden rounded-[.7rem] z-50`}
      ref={modalRef}
      onClose={handleCloseModal}
    >
      <div className="bg-rose-600 hover:bg-rose-500 transition-all duration-300 h-7 w-7 flex items-center justify-center absolute top-0 right-0 rounded-tr-[.7rem] rounded-bl-[.7rem] z-40">
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
