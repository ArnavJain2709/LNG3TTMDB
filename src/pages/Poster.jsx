import { createSignal, onMount } from "solid-js";
import { Tile, Badge, Label, Metadata, Row } from "@lightningjs/solid-ui";
import { fetchMovies } from "../api/functions";

const Poster = () => {
  const [movie, setMovie] = createSignal(null);
  const [movie2, setMovie2] = createSignal(null);

  onMount(async () => {
    const movies = await fetchMovies();
    console.log("movies/----------");
    console.log(movies);
    if (movies.length > 0) {
      setMovie(movies[0]);
      setMovie2(movies[1]);
    }
  });

  return (
    <>
      <Row scroll="none">
        {movie() && (
          <Tile
            states="focus"
            width={480}
            height={270}
            artwork={{
              src: `https://image.tmdb.org/t/p/w500${movie().poster_path}`,
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
              title: movie().title,
              maxLines: 1,
            }}
            progressBar={{ progress: 0.5 }}
            tone="brand"
            topLeft={<Badge title="HD" tone="brand" />}
            topRight={<Label width={75} title="Label" mountX={0.5} />}
            inset={<Metadata title={movie().title} tone="brand" />}
          />
        )}

        {movie2() && (
          <Tile
            states="focus"
            width={480}
            height={270}
            artwork={{
              src: `https://image.tmdb.org/t/p/w500${movie2().poster_path}`,
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
              title: movie2().title,
              maxLines: 1,
            }}
            progressBar={{ progress: 0.5 }}
            tone="brand"
            topLeft={<Badge title="HD" tone="brand" />}
            topRight={<Label width={75} title="Label" mountX={0.5} />}
            inset={<Metadata title={movie2().title} tone="brand" />}
          />
        )}
      </Row>
    </>
  );
};

export default Poster;
