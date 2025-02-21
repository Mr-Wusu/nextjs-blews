import ClothId from "@/app/_components/ClothId";
import ModalRoot from "@/app/_components/ModalRoot";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const slug = (await params).slug;
  return (
    <ModalRoot className="h-fit rounded-[.7rem] w-[90%] flex flex-col items-center justify-center px-4">
      <ClothId slug={slug}/>
    </ModalRoot>
  );
}
