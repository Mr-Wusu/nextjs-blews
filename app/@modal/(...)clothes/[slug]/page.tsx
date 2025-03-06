import ClothId from "@/app/_components/ClothId";
import ModalRoot from "@/app/_components/ModalRoot";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <ModalRoot className="h-[85%] w-[90%] bg-rose-200">
      <ClothId
        className="px-5 pb-none"
        bg="bg-rose-200 border-2 border-darkRose2 rounded-[.7rem] overflow-hidden"
        slug={slug}
      />
    </ModalRoot>
  );
}
