import ClothUploadForm from "@/app/_components/ClothUploadForm";
import ModalRoot from "@/app/_components/ModalRoot";

export default function UploadCloth() {
  return (
    <ModalRoot className="shadow-teal-700 shadow-xl border border-rose-700 flex flex-col py-2 rounded-[.6rem]">
      <h2 className="text-darkRose2 px-3 hidden">
        <span className="text-rose-600 mr-2">Caveat:</span>This page comes with
        admin priviledge of uploading content for users of the application, to
        consume. Abusing such priviledge may incur legal action(s)! Kindly be
        guided!!!
      </h2>
      <ClothUploadForm />
    </ModalRoot>
  );
}
