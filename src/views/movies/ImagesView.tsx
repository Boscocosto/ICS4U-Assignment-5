import { useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { getImageUrl, type ImageCell, type ImagesResponse, PERSON_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<ImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const gridData: ImageCell[] = (data.profiles ?? []).map((image, index) => ({
    id: index,
    imageUrl: getImageUrl(image.file_path),
    primaryText: "",
  }));

  return (
    <section className="mx-auto max-w-7xl space-y-8 p-5">
      <h1 className="font-bold text-3xl">Images</h1>
      {gridData.length ? <ImageGrid images={gridData} /> : <p className="text-center text-gray-400">No images available.</p>}
    </section>
  );
};
