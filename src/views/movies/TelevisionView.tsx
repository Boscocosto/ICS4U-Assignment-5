import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, Pagination } from "@/components";
import { getImageUrl, type ImageCell, type MovieResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const TelevisionView = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const tvCategory = category || "airing_today";
  const [page, setPage] = useState<number>(1);

  const { data } = useTmdb<MovieResponse>(`${TV_ENDPOINT}/${tvCategory}`, { page, tvCategory });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  const categories = [
    { key: "airing_today", label: "Airing Today" },
    { key: "on_the_air", label: "On The Air" },
    { key: "popular", label: "Popular" },
    { key: "top_rated", label: "Top Rated" },
  ];

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-bold text-3xl">TV Shows</h1>
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              className={`rounded px-4 py-2 ${tvCategory === c.key ? "bg-blue-500" : "bg-gray-700"} text-white`}
              key={c.key}
              onClick={() => navigate(`/tv/category/${c.key}`)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${image.id}/seasons`)} />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
