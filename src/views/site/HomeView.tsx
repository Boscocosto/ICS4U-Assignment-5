import { useNavigate } from "react-router-dom";
import { Button } from "@/components";

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <main className="flex flex-1 items-center justify-center">
        <section className="space-y-8 text-center">
          <h1 className="font-bold text-5xl tracking-tight">TMDB Explorer</h1>
          <p className="text-gray-400 text-lg">Explore movies and discover people using a fast, modern interface.</p>
          <Button onClick={() => navigate("/movies/category/now_playing")}>Enter</Button>
        </section>
      </main>
      <footer className="p-5 text-center text-gray-500 text-sm">Built with React, Vite and React Router</footer>
    </div>
  );
};
