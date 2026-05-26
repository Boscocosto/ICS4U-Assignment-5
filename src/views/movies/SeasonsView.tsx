import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ImageGrid, ImageOverlay } from "@/components";
import { favoriteAction, getImageUrl, type SeasonsResponse, TV_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { favorites, toggleFavorite } = useUserContext();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  const gridData = (data?.seasons ?? []).map((season) => ({
    id: season.season_number,
    imageUrl: getImageUrl(season.poster_path),
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
          <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${id}/season/${image.id}`)}>
            {(image) => <ImageOverlay actions={[favoriteAction((image) => favorites.has(image.id), toggleFavorite)]} image={image} />}
          </ImageGrid>
          <Outlet />
        </>
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
