import { createSignal, onMount, createEffect, on } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
import {
  Tile,
  Badge,
  Label,
  Metadata,
  Row,
  Column,
  tileStyles,
  Button,
} from "@lightningjs/solid-ui";
import {
  Text,
  View,
  activeElement,
  setActiveElement,
} from "@lightningjs/solid";
import {
  fetchMovies,
  fetchTvShows,
  getBackdropUrl,
  fetchTrending,
} from "../api/functions";

const Movies = () => {
  const [movieCollection, setMovieCollection] = createSignal([]);
  const [showCollection, setShowCollection] = createSignal([]);
  const navigate = useNavigate();
  const [backdropPath, setBackdropPath] = createSignal("");
  const [activePoster, setActivePoster] = createSignal({
    title: "No title",
    poster_path: "",
    vote_average: 0,
    overview: "No overview",
  });
  let imageLinks = [];
  let counter = 0;

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
  const DescriptionStyles = {
    //fontFamily: "Lato",
    maxLines: 3,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    //fontWeight: 8,
    lineHeight: 50,
    width: 1300,

    contain: "width",
    fontSize: 45,
  };

  const TileStyles = {
    display: "flex-item",
  };

  const ColumnStyles = {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    height: "100vh",
    x: 25,
    gap: 50,
  };

  onMount(async () => {
    const movies = await fetchMovies();
    //const shows = await fetchTvShows();
    if (movies.length > 0) {
      setMovieCollection(movies);
    }

    movieCollection().forEach((movie) => {
      imageLinks.push(getBackdropUrl(movie.backdrop_path));
    });
    console.log("Image links:", imageLinks);
    // Set the first movie as the active poster initially
    if (movies.length > 0) {
      setActivePoster(movies[0]);
      setBackdropPath(getBackdropUrl(movies[0].backdrop_path));
    }
  });

  const handleTileClick = (item, type) => {
    console.log("Tile clicked:", item, type);
    navigate("/details", { state: { item, type } });
  };

  return (
    <View
      width="1920"
      height="1080"
      src={backdropPath()}
      colorTop="0x000000ff"
      colorBottom="0xffffffff"
    >
      <Column style={ColumnStyles}>
        <Row style={{ gap: 20, height: 80, y: 0, x: 0 }}>
          <Button
            style={{
              width: 300,
              height: 80,
              color: "0x071423ff",
              // x: 700,
            }}
            autofocus
            onEnter={() => navigate("/poster")}
          >
            Home
          </Button>
          <Button
            style={{
              width: 300,
              height: 80,
              color: "0x071423ff",
              // x: 700,
            }}
            onEnter={() => navigate("/movies")}
          >
            Movies
          </Button>
          <Button
            style={{
              width: 300,
              height: 80,
              color: "0x071423ff",
              // x: 700,
            }}
            onEnter={() => navigate("/tv")}
          >
            TV
          </Button>
          <Button
            style={{
              width: 100,
              height: 80,
              color: "0x071423ff",
              marginLeft: 835,
              // x: 700,
            }}
            onEnter={() => navigate("/search")}
          >
            <Text style={{ fontSize: 80 }}>🔍</Text>
          </Button>
        </Row>
        <Text skipFocus style={{ fontWeight: 10, fontSize: "80" }}>
          {activePoster().title}
        </Text>
        <Text skipFocus style={{ ...DescriptionStyles, x: 30 }}>
          {activePoster().overview}
        </Text>
        <Text skipFocus style={{ fontWeight: 10, fontSize: "50" }}>
          Movies
        </Text>
        {/* <Row style={RowStyles} autofocus forwardFocus={0}> */}
        <Row style={RowStyles} autofocus>
          {movieCollection().map((aMovie, index) => (
            <Tile
              style={TileStyles}
              transition={{
                x: true,
                scale: { duration: 1500, easing: "ease-in-out" },
              }}
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
              progressBar={{ progress: getRandomValue() }}
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
              onLeft={() => {
                if (counter > 0) {
                  counter--;
                  setActivePoster(movieCollection()[counter]);
                  setBackdropPath(imageLinks[counter]);
                }
              }}
              onRight={() => {
                if (counter < movieCollection().length - 1) {
                  counter++;
                  setActivePoster(movieCollection()[counter]);
                  setBackdropPath(imageLinks[counter]);
                }
              }}
            />
          ))}
        </Row>
      </Column>
    </View>
  );
};

export default Movies;
