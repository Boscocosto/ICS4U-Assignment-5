import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, ImageOverlay, Pagination } from "@/components";
import { favoriteAction, getImageUrl, type ImageCell, MOVIE_ENDPOINT, type MovieResponse } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const MoviesView = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { favorites, toggleFavorite } = useUserContext();
  const movieCategory = category || "now_playing";
  const [page, setPage] = useState<number>(1);

  const { data } = useTmdb<MovieResponse>(`${MOVIE_ENDPOINT}/${movieCategory}`, { movieCategory, page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  const categories = [
    { key: "now_playing", label: "Now Playing" },
    { key: "popular", label: "Popular" },
    { key: "top_rated", label: "Top Rated" },
    { key: "upcoming", label: "Upcoming" },
  ];

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-bold text-3xl">Movies</h1>
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              className={`rounded px-4 py-2 ${movieCategory === c.key ? "bg-blue-500" : "bg-gray-700"} text-white`}
              key={c.key}
              onClick={() => navigate(`/movies/category/${c.key}`)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/credits`)}>
        {(image) => (
          <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
        )}
      </ImageGrid>
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
