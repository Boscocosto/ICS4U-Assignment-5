import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ImageGrid, ImageOverlay, Pagination } from "@/components";
import { favoriteAction, getImageUrl, type ImageCell, type MovieResponse, TRENDING_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const { favorites, toggleFavorite } = useUserContext();
  const interval = searchParams.get("interval") || "day";
  const movieType = category === "movies" ? "movie" : "tv";

  const { data } = useTmdb<MovieResponse>(`${TRENDING_ENDPOINT}/${movieType}/${interval}`, { interval, movieType, page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              className={`rounded px-4 py-2 text-white transition ${category === "movies" ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"} `}
              onClick={() => navigate("/trending/movies")}
            >
              Movies
            </button>
            <button
              className={`rounded px-4 py-2 text-white transition ${category === "tv" ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"} `}
              onClick={() => navigate("/trending/tv")}
            >
              TV
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className={`rounded px-4 py-2 text-white transition ${interval === "day" ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"} `}
              onClick={() => setSearchParams({ interval: "day" })}
            >
              Today
            </button>
            <button
              className={`rounded px-4 py-2 text-white transition ${interval === "week" ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"} `}
              onClick={() => setSearchParams({ interval: "week" })}
            >
              Week
            </button>
          </div>
        </div>
      </div>
      <ImageGrid
        images={gridData}
        onClick={(image) => navigate(movieType === "movie" ? `/movie/${image.id}/credits` : `/tv/${image.id}/seasons`)}
      >
        {(image) => (
          <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
        )}
      </ImageGrid>
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
