import React, { useState } from "react";
import axios from "axios";

const TVShowsGenreTags = ({ setShows }) => {
  const [clickedTags, setClickedTags] = useState([]);

  const genresData = [
    {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 36,
        name: "History",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 10402,
        name: "Music",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 10770,
        name: "TV Movie",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
  ];

  const handleTagClick = async (id) => {
    let updatedTags;
    if (clickedTags.includes(id)) {
      updatedTags = clickedTags.filter((tagId) => tagId !== id);
    } else {
      updatedTags = [...clickedTags, id];
    }
    setClickedTags(updatedTags);

    // Fetch TV shows based on selected genres
    const fetchURL = `https://api.themoviedb.org/3/discover/tv?api_key=3ef16179b4be2afc7c81bf6333abb5b5&with_genres=${updatedTags.join(
      ","
    )}`;
    try {
      const response = await axios.get(fetchURL);
      setShows(response.data.results || []);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
      setShows([]);
    }
  };

  return (
    <div id="tags">
      {genresData.map((genre) => (
        <div
          key={genre.id}
          className={`tag ${clickedTags.includes(genre.id) ? "clicked" : ""}`}
          onClick={() => handleTagClick(genre.id)}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default TVShowsGenreTags;
