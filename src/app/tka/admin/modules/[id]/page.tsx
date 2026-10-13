import SectionManager from "./manager";

export const instant = false;

export default async function AdminModuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SectionManager id={id} />;
}
