import { useState } from "react";
import { Button } from "@/components";
import { useUserContext } from "@/hooks";

export const SettingsView = () => {
  const { userName, setUserName } = useUserContext();
  const { visibleMovieGenres, visibleTvGenres, toggleGenreVisibility } = useUserContext();
  const [value, setValue] = useState(userName);
  const [error, setError] = useState("");

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Settings</h1>
      <div className="max-w-md space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
        <div>
          <h2 className="font-semibold text-lg">Profile</h2>
          <p className="text-gray-400 text-sm">Update your profile</p>
        </div>
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Username</label>
          <input
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => {
              setValue(event.target.value);
              setError("");
            }}
            placeholder="Enter your name"
            type="text"
            value={value}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setValue(userName)} variant="grey">
            Reset
          </Button>
          <Button
            onClick={() => {
              const trimmed = value.trim();

              if (!trimmed) {
                setError("Username cannot be empty");
                return;
              } else {
                setUserName(trimmed);
                setError("");
              }
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="max-w-md space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
        <h2 className="font-semibold text-lg">Movie Genres</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "28", name: "Action", value: "action" },
            { id: "12", name: "Adventure", value: "adventure" },
            { id: "16", name: "Animation", value: "animation" },
            { id: "35", name: "Comedy", value: "comedy" },
            { id: "80", name: "Crime", value: "crime" },
            { id: "18", name: "Drama", value: "drama" },
            { id: "27", name: "Horror", value: "horror" },
            { id: "10749", name: "Romance", value: "romance" },
          ].map((g) => (
            <label key={g.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={visibleMovieGenres.includes(g.value)}
                onChange={() => toggleGenreVisibility("movie", g.value)}
              />
              {g.name}
            </label>
          ))}
        </div>
        <div className="max-w-md space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
          <h2 className="font-semibold text-lg">TV Genres</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "10759", name: "Action & Adventure", value: "action_adventure" },
              { id: "16", name: "Animation", value: "animation" },
              { id: "35", name: "Comedy", value: "comedy" },
              { id: "80", name: "Crime", value: "crime" },
              { id: "18", name: "Drama", value: "drama" },
              { id: "10762", name: "Kids", value: "kids" },
              { id: "9648", name: "Mystery", value: "mystery" },
              { id: "10765", name: "Sci-Fi & Fantasy", value: "sci_fi_fantasy" },
            ].map((g) => (
              <label key={g.value} className="flex items-center gap-2">
                <input type="checkbox" checked={visibleTvGenres.includes(g.value)} onChange={() => toggleGenreVisibility("tv", g.value)} />
                {g.name}
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
