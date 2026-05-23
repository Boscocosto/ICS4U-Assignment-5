import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { type CareerResponse, getImageUrl, type ImageCell, PERSON_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<CareerResponse>(`${PERSON_ENDPOINT}/${id}/combined_credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.title ?? result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8 p-5">
      <h1 className="font-bold text-3xl">Career</h1>
      <ImageGrid
        images={gridData}
        onClick={(image) => {
          const item = data.cast.find((c) => c.id === image.id);
          const Tv = item?.media_type === "tv" || !!item?.first_air_date;
          if (Tv) {
            navigate(`/tv/show/${image.id}/credits`);
          } else {
            navigate(`/movie/${image.id}/credits`);
          }
        }}
      />
    </section>
  );
};
