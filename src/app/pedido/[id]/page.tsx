import { PageId } from "@/types/PageId";
import { ViewItensPedido } from "@/view/pedido/ViewItensPedido";

export default async function ItensPedidoPageView({ params }: PageId) {
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;
  return <ViewItensPedido id={id} />;
}
