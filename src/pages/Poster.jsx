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
import { Server } from "ws";
import Button from "../components/Button/Button";
import ButtonsPage from "./ButtonsPage";

const Poster = () => {
  const [movieCollection, setMovieCollection] = createSignal([]);
  const [showCollection, setShowCollection] = createSignal([]);
  const navigate = useNavigate(); // Hook to access navigation functionality
  const [backdropPath, setBackdropPath] = createSignal(""); // Consistent naming

  const RowStyles = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1900,
    height: 400,
    color: "00000000",
    gap: 0,
    y: 0, // Center rows vertically
    x: 0, // Adjust x as needed
    //marginLeft: 30,
  };

  const TileStyles = {
    display: "flex-item",
    //marginLeft: 30,
  };

  const ColumnStyles = {
    display: "flex",
    flexDirection: "column",
    //alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    height: "100vh", // Full viewport height to center vertically
    x: 25,
    gap: 50, // Space between rows
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
      src={"https://image.tmdb.org/t/p/w1280/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg"} // Use the correct variable
      colorTop="0xffffffff"
      colorBottom="0x000000ff"
    >
      {/* <Button autofocus>Back to Poster</Button> */}
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
              progressBar={{ progress: 0.5 }}
              tone="brand"
              //topLeft={<Badge title="HD" tone="brand" />}
              topRight={
                <Label
                  width={75}
                  title={"⭐ " + Math.round(aMovie.vote_average / 2)}
                  mountX={0.5}
                  tone={"inverse"}
                />
              }
              //onFocus={() => handleFocus(aMovie.backdrop_path)} // Update backdrop on focus
              //inset={<Metadata title={aMovie.title} tone="brand" />}
              onEnter={() => handleTileClick(aMovie, "movie")} // Pass data on click
            />
          ))}
        </Row>
        <Text skipFocus style={{ fontSize: "50" }}>
          TV shows
        </Text>
        <Row style={{ ...RowStyles, marginTop: "10px" }}>
          {showCollection().map((aShow) => (
            <Tile
              //autofocus
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
              progressBar={{ progress: 0.5 }}
              tone="brand"
              topRight={
                <Label
                  width={75}
                  title={"⭐ " + Math.round(aShow.vote_average / 2)}
                  mountX={0.5}
                  tone={"inverse"}
                />
              }
              inset={<Metadata title={aShow.title} tone="brand" />}
              onEnter={() => handleTileClick(aShow, "show")} // Pass data on click
              //onFocus={() => handleFocus(aShow.backdrop_path)} // Update backdrop on focus
            />
          ))}
        </Row>
      </Column>
    </View>
  );
};

export default Poster;
