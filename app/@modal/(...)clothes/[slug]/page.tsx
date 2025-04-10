import ClothId from "@/app/_components/ClothId";
import ModalRoot from "@/app/_components/ModalRoot";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <ModalRoot className="h-fit w-[70vw] md:w-[58vw]  ">
      <ClothId
        className="px-5 pb-none"
        bg="border-2 border-darkRose2 overflow-hidden pb-5 md:-mt-[0px] md:w-full"
        clothContainer=""
        slug={slug}
      />
    </ModalRoot>
  );
}
