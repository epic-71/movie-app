import { createContext, useState } from "react";

const allMovies = [
  {
    id: "123",
    title: "Inception",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
  },
  {
    id: "124",
    title: "The Shawshank Redemption",
    image:
      "https://m.media-amazon.com/images/I/91VIHzW1kvL._AC_UF1000,1000_QL80_.jpg",
    cast: "Tim Robbins, Morgan Freeman, Bob Gunton",
  },
  {
    id: "183",
    title: "The Dark Knight",
    image:
      "https://m.media-amazon.com/images/S/pv-target-images/e9a43e647b2ca70e75a3c0af046c4dfdcd712380889779cbdc2c57d94ab63902.jpg",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
  },
  {
    id: "12354",
    title: "Pulp Fiction",
    image:
      "https://i.etsystatic.com/19076383/r/il/f84fcd/2688807366/il_570xN.2688807366_491b.jpg",
    cast: "John Travolta, Uma Thurman, Samuel L. Jackson",
  },
  {
    id: "128883",
    title: "Fight Club",
    image:
      "https://m.media-amazon.com/images/I/81+B96KVxtL._AC_UF1000,1000_QL80_.jpg",
    cast: "Brad Pitt, Edward Norton, Helena Bonham Carter",
  },
];
const initialMovies = JSON.parse(localStorage.getItem("movies")) || allMovies;

const MovieDetailsContext = createContext();

const MovieDetailsContextProvider = ({ children }) => {
  const [movies, setMovies] = useState(initialMovies);

  return (
    <MovieDetailsContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieDetailsContext.Provider>
  );
};

export { MovieDetailsContext, MovieDetailsContextProvider };
