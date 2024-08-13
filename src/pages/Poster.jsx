import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import {
  Tile,
  Badge,
  Label,
  Metadata,
  Row,
  Column,
  tileStyles,
} from "@lightningjs/solid-ui";
import { Text, View } from "@lightningjs/solid";
import { fetchMovies, fetchTvShows, getBackdropUrl } from "../api/functions";
import Button from "../components/Button/Button";
import ButtonsPage from "./ButtonsPage";

const Poster = () => {
  const [movieCollection, setMovieCollection] = createSignal([]);
  const [showCollection, setShowCollection] = createSignal([]);
  const navigate = useNavigate();
  const [backdropPath, setBackdropPath] = createSignal("");

  // Function to generate a random value between 0 and 1 (not included) to 1 decimal place
  const getRandomValue = () =>
    parseFloat((Math.random() * 0.9 + 0.1).toFixed(1));

  const RowStyles = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1900,
    height: 400,
    color: "00000000",
    gap: 0,
    y: 0,
    x: 0,
  };

  const TileStyles = {
    display: "flex-item",
  };

  const ColumnStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    x: 25,
    gap: 50,
  };

  onMount(async () => {
    const movies = await fetchMovies();
    const shows = await fetchTvShows();
    if (movies.length > 0) {
      setMovieCollection(movies);
    }
    if (shows.length > 0) {
      setShowCollection(shows);
    }
  });

  const handleTileClick = (item, type) => {
    console.log("Tile clicked:", item, type);
    navigate("/details", { state: { item, type } });
  };

  const handleFocus = (backdropPath) => {
    setBackdropPath(backdropPath);
  };

  return (
    <View
      width="1920"
      height="1080"
      src={"https://image.tmdb.org/t/p/w1280/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg"}
      colorTop="0xffffffff"
      colorBottom="0x000000ff"
    >
      <Column style={ColumnStyles}>
        <Text skipFocus style={{ fontSize: "50" }}>
          Movies
        </Text>
        <Row style={RowStyles}>
          {movieCollection().map((aMovie) => (
            <Tile
              style={TileStyles}
              transition={{
                x: true,
                scale: { duration: 1500, easing: "ease-in-out" },
              }}
              autofocus
              states="focus"
              width={270}
              height={400}
              artwork={{
                src: `https://image.tmdb.org/t/p/w500${aMovie.poster_path}`,
                effects: {
                  linearGradient: {
                    angle: 3.14,
                    stops: [0, 0.5],
                    colors: ["#000000", "transparent"],
                  },
                },
              }}
              persistentMetadata={true}
              metadata={{
                title: aMovie.title,
                maxLines: 1,
              }}
              progressBar={{ progress: getRandomValue() }} // Apply random progress
              tone="brand"
              topRight={
                <Label
                  width={75}
                  title={"⭐ " + Math.round(aMovie.vote_average / 2)}
                  mountX={0.5}
                  tone={"inverse"}
                />
              }
              onEnter={() => handleTileClick(aMovie, "movie")}
            />
          ))}
        </Row>
        <Text skipFocus style={{ fontSize: "50" }}>
          TV shows
        </Text>
        <Row style={{ ...RowStyles, marginTop: "10px" }}>
          {showCollection().map((aShow) => (
            <Tile
              style={TileStyles}
              transition={{
                x: true,
                scale: { duration: 1500, easing: "ease-in-out" },
              }}
              states="focus"
              width={270}
              height={400}
              artwork={{
                src: `https://image.tmdb.org/t/p/w500${aShow.poster_path}`,
                effects: {
                  linearGradient: {
                    angle: 3.14,
                    stops: [0, 0.5],
                    colors: ["#000000", "transparent"],
                  },
                },
              }}
              persistentMetadata={true}
              metadata={{
                title: aShow.title,
                maxLines: 1,
              }}
              progressBar={{ progress: getRandomValue() }} // Apply random progress
              tone="brand"
              topRight={
                <Label
                  width={75}
                  title={"⭐ " + Math.round(aShow.vote_average / 2)}
                  mountX={0.5}
                  tone={"inverse"}
                />
              }
              onEnter={() => handleTileClick(aShow, "show")}
            />
          ))}
        </Row>
      </Column>
    </View>
  );
};

export default Poster;
