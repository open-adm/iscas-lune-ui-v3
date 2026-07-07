import { ViewProduto } from "@/view/produto/ViewProduto";
import { Metadata } from "next";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;
    const nomeCategoria = decodeURIComponent(slug);

    return {
        title: `${nomeCategoria} | Iscas Lune`,
        description: `Confira nossa linha de ${nomeCategoria.toLowerCase()} para pesca esportiva.`,

    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;

    return <ViewProduto slug={slug} />;
}
