import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Link, SearchBar } from "@/components";
import { ICON_SIZE } from "@/core";
import { useUserContext } from "@/hooks";

export const Header = () => {
  const navigate = useNavigate();
  const { userName, favorites } = useUserContext();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("movie");

  return (
    <header>
      <nav className="flex items-center gap-6 overflow-x-auto whitespace-nowrap bg-gray-800 p-4">
        <h1 className="font-bold text-2xl text-white">TMDB Explorer</h1>
        <div className="flex items-center gap-4">
          <Link match={["/movies/category/:category"]} to="/movies/category/now_playing">
            Movies
          </Link>
          <Link match={["/tv/category/:category"]} to="/tv/category/airing_today">
            TV
          </Link>
          <Link match={["/trending/:category"]} to="/trending/movies">
            Trending
          </Link>
          <Link match={["/genre/:mediaType/:genre"]} to="/genre/movie/action">
            Genre
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <SearchBar
            onChange={(query) => {
              setQuery(query);
              navigate(`/search?q=${query}&type=${type}`);
            }}
            value={query}
          />
          <ButtonGroup
            onClick={(newType) => {
              setType(newType);
              navigate(`/search?q=${query}&type=${newType}`);
            }}
            options={[
              { label: "Movies", value: "movie" },
              { label: "TV", value: "tv" },
              { label: "People", value: "person" },
            ]}
            value={type}
          />
          <div className="flex items-center">
            <h1 className="mr-4 text-gray-300 text-xl">{userName}</h1>
            <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/favorites")}>
              <FaRegHeart size={ICON_SIZE} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {favorites.size}
                </span>
              )}
            </button>
            <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/settings")}>
              <GoGear size={ICON_SIZE} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
