import { createSignal, onMount } from "solid-js";
import {
  Tile,
  Badge,
  Label,
  Metadata,
  Row,
  Column,
} from "@lightningjs/solid-ui";
import { fetchMovies, fetchTvShows } from "../api/functions";
import { withPadding } from "@lightningtv/solid-ui";

const Poster = () => {
  const [movieCollection, setMovieCollection] = createSignal([]);
  const [showCollection, setShowCollection] = createSignal([]);

  const RowStyles = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1500,
    height: 500,
    color: "00000000",
    gap: 26,
    y: 0, // Center rows vertically
    x: 0, // Adjust x as needed
  };

  const ColumnStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    height: "100vh", // Full viewport height to center vertically
    gap: 20, // Space between rows
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

  return (
    <>
      <Column style={ColumnStyles}>
        <Row style={RowStyles}>
          {movieCollection().map((aMovie) => (
            <Tile
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
              topRight={<Label width={75} title="Label" mountX={0.5} />}
              inset={<Metadata title={aMovie.title} tone="brand" />}
            />
          ))}
        </Row>

        <Row style={{ ...RowStyles, marginTop: 10 }}>
          {showCollection().map((aShow) => (
            <Tile
              autofocus
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
              topRight={<Label width={75} title="Label" mountX={0.5} />}
              inset={<Metadata title={aShow.title} tone="brand" />}
            />
          ))}
        </Row>
      </Column>
    </>
  );
};

export default Poster;
