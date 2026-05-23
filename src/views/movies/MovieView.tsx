import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { DetailItem, LinkGroup, Modal } from "@/components";
import { getBackdropUrl, getImageUrl, MOVIE_ENDPOINT, type MovieResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const TvRoute = pathname.startsWith("/tv");
  const endpoint = TvRoute ? TV_ENDPOINT : MOVIE_ENDPOINT;
  const { data } = useTmdb<MovieResponse>(`${endpoint}/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const Tv = !!data.first_air_date;

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img alt={data.title} className="h-50 w-full rounded-2xl object-cover" src={getBackdropUrl(data.backdrop_path)} />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img alt={data.title} className="w-50 rounded-xl object-cover" src={getImageUrl(data.poster_path)} />
          <div className="space-y-4 overflow-y-auto">
            <h1 className="font-bold text-3xl">{data.title}</h1>
            <p className="text-gray-300 leading-relaxed">{data.overview}</p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem label="Release" value={Tv ? (data.first_air_date ?? "") : (data.release_date ?? "")} />
              <DetailItem label="Rating" value={data.vote_average} />
            </div>
            <LinkGroup
              options={
                Tv
                  ? [
                      { label: "Seasons", to: "seasons" },
                      { label: "Credits", to: "credits" },
                      { label: "Reviews", to: "reviews" },
                      { label: "Trailers", to: "trailers" },
                    ]
                  : [
                      { label: "Credits", to: "credits" },
                      { label: "Reviews", to: "reviews" },
                      { label: "Trailers", to: "trailers" },
                    ]
              }
            />
            <Outlet context={{ data }} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
