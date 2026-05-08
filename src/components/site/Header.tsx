import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Link, SearchBar } from "@/components";

export const Header = () => {
  const navigate = useNavigate();
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
        </div>
      </nav>
    </header>
  );
};
