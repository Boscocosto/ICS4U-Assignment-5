import type { ReactNode } from "react";
import { UserContext } from "@/context";
import { FAVORITES_KEY, type ImageCell, USERNAME_KEY } from "@/core";
import { useLocalStorage } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, "User");
  const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });

  const DEFAULT_MOVIE_GENRES = ["action", "adventure", "animation", "comedy", "crime", "drama", "horror", "romance"];
  const DEFAULT_TV_GENRES = ["action_adventure", "animation", "comedy", "crime", "drama", "kids", "mystery", "sci_fi_fantasy"];
  const [visibleMovieGenres, setVisibleMovieGenres] = useLocalStorage<string[], string[]>("visibleMovieGenres", DEFAULT_MOVIE_GENRES);
  const [visibleTvGenres, setVisibleTvGenres] = useLocalStorage<string[], string[]>("visibleTvGenres", DEFAULT_TV_GENRES);

  const toggleFavorite = (image: ImageCell) => {
    setFavorites((prev) => {
      const cloned = new Map(prev);
      cloned.has(image.id) ? cloned.delete(image.id) : cloned.set(image.id, image);
      return cloned;
    });
  };

  const toggleGenreVisibility = (mediaType: "movie" | "tv", genre: string) => {
    const list = mediaType === "movie" ? visibleMovieGenres : visibleTvGenres;
    const setter = mediaType === "movie" ? setVisibleMovieGenres : setVisibleTvGenres;

    if (list.length === 1 && list.includes(genre)) return;

    const updated = list.includes(genre) ? list.filter((g) => g !== genre) : [...list, genre];
    setter(updated);
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        favorites,
        toggleFavorite,

        visibleMovieGenres,
        visibleTvGenres,
        toggleGenreVisibility,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
