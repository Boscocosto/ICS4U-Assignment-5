import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { getImageUrl, type SeasonsResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  const gridData = (data?.seasons ?? []).map((season) => ({
    id: season.season_number,
    imageUrl: getImageUrl(season.poster_path ?? ""),
    primaryText: season.name,
    secondaryText: season.air_date,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="mb-6 font-bold text-2xl">Seasons</h2>
      {data.seasons.length ? (
        <>
          <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${id}/season/${image.id}`)} />
          <Outlet />
        </>
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
