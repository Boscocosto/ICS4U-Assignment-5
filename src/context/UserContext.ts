import { createContext } from "react";
import type { ImageCell } from "@/core";

export type UserContextType = {
  userName: string;
  favorites: Map<number, ImageCell>;
  setUserName: (userName: string) => void;
  toggleFavorite: (image: ImageCell) => void;
  visibleMovieGenres: string[];
  visibleTvGenres: string[];
  toggleGenreVisibility: (mediaType: "movie" | "tv", genre: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
