import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageGrid, Pagination } from "@/components";
import { getImageUrl, type ImageCell, RATE_LIMIT_DELAY, SEARCH_ENDPOINT, type SearchResponse } from "@/core";
import { useDebounce, useTmdb } from "@/hooks";

export const SearchView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? "movie";
  const debouncedQuery = useDebounce(query, RATE_LIMIT_DELAY);
  const { data } = useTmdb<SearchResponse>(`${SEARCH_ENDPOINT}/${type}`, {
    page,
    query: debouncedQuery,
  });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path ?? result.profile_path),
    primaryText: result.original_title ?? result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 font-bold text-3xl">Search</h1>
      <ImageGrid
        images={gridData}
        onClick={(image) => {
          if (type === "movie") navigate(`/movie/${image.id}/credits`);
          else if (type === "tv") navigate(`/tv/${image.id}/seasons`);
          else navigate(`/person/${image.id}/career`);
        }}
      />
      {data.results.length ? (
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      ) : (
        <p className="text-center text-gray-400">No search results found.</p>
      )}
    </section>
  );
};
