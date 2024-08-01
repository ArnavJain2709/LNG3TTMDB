import { createSignal, onMount } from "solid-js";
import {
  Tile,
  Badge,
  Label,
  Metadata,
  Row,
  Column,
} from "@lightningjs/solid-ui";
import { fetchMovies } from "../api/functions";

const Poster = () => {
  const [movie, setMovie] = createSignal(null);
  const [movie2, setMovie2] = createSignal(null);
  const [movieCollection, setMovieCollection] = createSignal([]);

  onMount(async () => {
    const movies = await fetchMovies();
    // console.log("movies/----------");
    // console.log(movies);
    if (movies.length > 0) {
      setMovieCollection(movies);
    }
  });

  return (
    <>
      <Row scroll="none">
        {movieCollection().map((aMovie) => (
          <Tile
            states="focus"
            width={480}
            height={270}
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
    </>
  );
};

export default Poster;
