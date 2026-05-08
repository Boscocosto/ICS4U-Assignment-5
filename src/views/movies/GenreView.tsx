import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, Pagination } from "@/components";
import { DISCOVER_ENDPOINT, type GenreResponse, getImageUrl, type ImageCell } from "@/core";
import { useTmdb } from "@/hooks";

export const GenreView = () => {
  const navigate = useNavigate();
  const { mediaType: routeMediaType, genre: routeGenre } = useParams();
  const mediaType = routeMediaType || "movie";
  const genreValue = routeGenre || "action";

  const movieGenres = [
    { id: "28", name: "Action", value: "action" },
    { id: "12", name: "Adventure", value: "adventure" },
    { id: "16", name: "Animation", value: "animation" },
    { id: "35", name: "Comedy", value: "comedy" },
    { id: "80", name: "Crime", value: "crime" },
    { id: "18", name: "Drama", value: "drama" },
    { id: "27", name: "Horror", value: "horror" },
    { id: "10749", name: "Romance", value: "romance" },
  ];

  const tvGenres = [
    { id: "10759", name: "Action & Adventure", value: "action_adventure" },
    { id: "16", name: "Animation", value: "animation" },
    { id: "35", name: "Comedy", value: "comedy" },
    { id: "80", name: "Crime", value: "crime" },
    { id: "18", name: "Drama", value: "drama" },
    { id: "10762", name: "Kids", value: "kids" },
    { id: "9648", name: "Mystery", value: "mystery" },
    { id: "10765", name: "Sci-Fi & Fantasy", value: "sci_fi_fantasy" },
  ];

  const genres = mediaType === "movie" ? movieGenres : tvGenres;
  const genreId = genres.find((g) => g.value === genreValue)?.id ?? genres[0].id;
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<GenreResponse>(`${DISCOVER_ENDPOINT}/${mediaType}`, { page, with_genres: genreId });

  const MediaTypeChange = (type: string) => {
    const firstGenre = (type === "movie" ? movieGenres : tvGenres)[0].value;
    navigate(`/genre/${type}/${firstGenre}`);
    setPage(1);
  };

  const GenreChange = (value: string) => {
    navigate(`/genre/${mediaType}/${value}`);
    setPage(1);
  };

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title ?? result.name ?? "Unknown",
  }));

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-3xl text-white">Browse by Genre</h1>
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            className={`rounded px-4 py-2 ${mediaType === "movie" ? "bg-blue-500" : "bg-gray-700"} text-white`}
            onClick={() => MediaTypeChange("movie")}
          >
            Movies
          </button>
          <button
            className={`rounded px-4 py-2 ${mediaType === "tv" ? "bg-blue-500" : "bg-gray-700"} text-white`}
            onClick={() => MediaTypeChange("tv")}
          >
            TV Shows
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              className={`rounded px-4 py-2 text-white ${genreValue === genre.value ? "bg-blue-500" : "bg-gray-700"}`}
              key={genre.id}
              onClick={() => GenreChange(genre.value)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      {data?.results && (
        <>
          <ImageGrid
            images={gridData}
            onClick={(image) => navigate(mediaType === "movie" ? `/movie/${image.id}/credits` : `/tv/${image.id}/seasons`)}
          />
          <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
        </>
      )}
    </div>
  );
};
