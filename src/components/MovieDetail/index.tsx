import React, { useEffect, useState } from "react";
import { getMovieDetails } from "@/components/API"; 

interface DetailMovieProps {
  movie: Movie;
  onClose: () => void;
  isOpen: boolean;
}

const DetailMovie: React.FC<DetailMovieProps> = ({ movie, onClose, isOpen }) => {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

  useEffect(() => {

    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movie.id.toString());

        if (data) {
          setMovieDetails(data);
        } else {
          // Handle error jika data kosong atau request gagal
          console.error("Failed to fetch movie details");
        }
      } catch (error) {
        console.error("An error occurred while fetching movie details:", error);
      }
    };

    if (isOpen) {
      // Panggil fungsi fetchMovieDetails saat modal dibuka
      fetchMovieDetails();
    }
  }, [isOpen, movie.id]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-75">
      <div className="bg-white w-3/4 p-4 rounded-lg h-[40rem] relative">
   
      <button
          className="absolute top-4 right-4 bg-transparent border-none text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {movieDetails && (
          <>
            <h2 className="text-2xl font-semibold">{movieDetails.title}</h2>
            <img
              src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="rounded-lg max-h-96"
            />
            <p className="text-base mt-4">{movieDetails.overview}</p>
            <p className="text-base mt-2">
              <strong>Release Date:</strong> {movieDetails.release_date}
            </p>
            <p className="text-base mt-2">
              <strong>Rating:</strong> {movieDetails.vote_average}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailMovie;
