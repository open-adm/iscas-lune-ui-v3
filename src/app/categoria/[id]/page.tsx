import { PageId } from "@/types/PageId";
import { ViewCategoria } from "@/view/categoria/ViewCategoria";

export default async function CategoriaPageView({ params }: PageId) {
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;
  return <ViewCategoria id={id} />;
}
