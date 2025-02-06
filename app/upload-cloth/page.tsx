export default function UploadCloth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form className="flex flex-col gap-3">
        <input type="file" />
        <textarea placeholder="Cloth description" />
        <input type="number" placeholder="Enter cloth's price" />
        <button type="submit">Upload cloth</button>
      </form>
    </div>
  );
}
