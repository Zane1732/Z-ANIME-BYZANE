import { fetchAnimeInfoByAnimeId } from "@/app/api/v1/controller/anime";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ animeId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = (await params).animeId;

  if (id === "sw.js") {
    return {};
  }

  const {
    anime: {
      info: { name, poster, description },
    },
  } = await fetchAnimeInfoByAnimeId(id);

  const previousImages = (await parent).openGraph?.images || [];
  const desc: string = description.slice(0, 146) + "...";

  return {
    title: `${name} | AniFire`,
    description: desc,
    keywords: name.split(" "),
    openGraph: {
      title: name + " | AniFire",
      description: desc,
      images: poster ? poster : previousImages,
    },
  };
}

export default function RootInfoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
