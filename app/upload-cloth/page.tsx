import ClothUploadForm from "../_components/ClothUploadForm";

export default function UploadCloth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-darkRose2 px-3"><span className="text-rose-600 mr-2">Caveat:</span>This page comes with admin priviledge of uploading content for users of the application, to consume. Abusing such priviledge may incur legal action(s)! Kindly be guided!!!</h2>
      <ClothUploadForm />
    </div>
  );
}
