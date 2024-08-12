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
import { Text } from "@lightningjs/solid";
import { fetchMovies, fetchTvShows } from "../api/functions";
import { Server } from "ws";

const Poster = () => {
  const [movieCollection, setMovieCollection] = createSignal([]);
  const [showCollection, setShowCollection] = createSignal([]);
  const navigate = useNavigate(); // Hook to access navigation functionality

  const RowStyles = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1900,
    height: 400,
    color: "00000000",
    gap: 26,
    y: 0, // Center rows vertically
    x: 0, // Adjust x as needed
    //marginLeft: 30,
  };

  const TileStyles = {
    display: "flex-item",
    marginLeft: 30,
  };

  const ColumnStyles = {
    display: "flex",
    flexDirection: "column",
    //alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    height: "100vh", // Full viewport height to center vertically
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

  return (
    <div>
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
              topLeft={<Badge title="HD" tone="brand" />}
              topRight={
                <Label
                  width={75}
                  title={"⭐ " + Math.round(aMovie.vote_average / 2)}
                  mountX={0.5}
                  tone={"inverse"}
                />
              }
              //inset={<Metadata title={aMovie.title} tone="brand" />}
              onEnter={() => handleTileClick(aMovie, "movie")} // Pass data on click
            />
          ))}
        </Row>
        <Text skipFocus style={{ fontSize: "50", marginLeft: "30px" }}>
          TV shows
        </Text>
        <Row style={{ ...RowStyles, marginTop: "20px" }}>
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
              topLeft={<Badge title="HD" tone="brand" />}
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
            />
          ))}
        </Row>
      </Column>
    </div>
  );
};

export default Poster;
