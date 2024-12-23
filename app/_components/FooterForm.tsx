export default function FooterForm() {
  return (
    <form className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold tracking-wide ">
          Paste link here:
        </label>
        <input className="w-[85%] text-[#4c0519] rounded-[.4rem] p-[0.3rem] text-sm outline-none border-2 border-transparent focus:border-[#881337]" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold tracking-wide ">
          Upload image here:
        </label>
        <input className="text-sm cursor-pointer" type="file" />
      </div>
      <button
        type="submit"
        className="bg-rose200 hover:bg-rose300 transition-all duration-300 px-2 py-1 text-darkRose2 rounded-[.4rem] w-max mt-3 text-sm font-semibold tracking-wide hover:text-lightRose2 border-lightRose2 border  shadow-lg"
      >
        Submit
      </button>
    </form>
  );
}
