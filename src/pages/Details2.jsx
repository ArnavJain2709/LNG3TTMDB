// Details.jsx

import { useNavigate, useLocation } from "@solidjs/router";
import { Button, Column, Row, Tile, Label } from "@lightningjs/solid-ui";
import { Text, View } from "@lightningjs/solid";
import { createEffect, createSignal, onMount } from "solid-js";
import {
  fetchRecommendations,
  fetchCastWithImages,
  getBackdropUrl,
} from "../api/functions";

const Details2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item, type } = location.state || {};
  const [movieCollection, setMovieCollection] = createSignal([]);
  const [castCollection, setCastCollection] = createSignal([]);

  const DescriptionStyles = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    lineHeight: 50,
    width: 1300,
    maxLines: 3,
    contain: "width",
    fontSize: 45,
  };

  const RowStyless = {
    display: "flex",
    justifyContent: "flexStart",
    width: 1900,
    height: 340,
    color: "00000000",
    gap: 0,
  };

  const TileStyles = {
    display: "flex-item",
    // focus: {
    //   // color: 0x58807dff,
    //   scale: 1.1,
    //   //borderWidth: 10,
    //   // alpha: 1,
    // },
    // disabled: {
    //   color: 0x333333ff,
    //   scale: 1,
    // },
  };

  onMount(async () => {
    // Fetch recommendations
    const movies = await fetchRecommendations(item.id, type);
    if (movies.length > 0) {
      setMovieCollection(movies);
    }

    // Fetch cast with images
    const cast = await fetchCastWithImages(item.id, type);
    if (cast.length > 0) {
      setCastCollection(cast);
    }
  });

  const handleTileClick = (item, type) => {
    console.log("Tile clicked:", item, type);
    navigate("/details", { state: { item, type } });
  };

  if (!item) {
    console.log("No item data available");
    return <Text style={{ color: "white" }}>No item details available</Text>;
  }

  const fullBackgroundImageUrl = getBackdropUrl(item.backdrop_path);

  return (
    <>
      <View
        width="1920"
        height="1080"
        src={fullBackgroundImageUrl}
        colorTop="0x000000ff"
        colorBottom="0xffffffff"
      >
        {/* Main Content */}
        <Column
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 20,
            gap: 20,
            backgroundColor: "#333",
            height: "100vh",
            width: "100%",
            x: 80,
          }}
        >
          <Row style={{ gap: 20, height: 80 }}>
            <Button
              style={{ width: 300, height: 80, color: "0x071423ff" }}
              autofocus
              onEnter={() => navigate("/poster")}
            >
              Home
            </Button>
            <Button
              style={{ width: 300, height: 80, color: "0x071423ff" }}
              onEnter={() => navigate("/movies")}
            >
              Movies
            </Button>
            <Button
              style={{ width: 300, height: 80, color: "0x071423ff" }}
              onEnter={() => navigate("/tv")}
            >
              TV
            </Button>
            <Button
              style={{ width: 300, height: 80, color: "0x071423ff" }}
              onEnter={() => navigate("/search")}
            >
              Search
            </Button>
          </Row>

          <Row style={{ gap: 20 }}>
            <Column style={{ gap: 20 }}>
              <Text skipFocus style={{ x: 30 }}>
                {item.title || item.name}
              </Text>
              <Text skipFocus style={{ x: 30, fontSize: 35 }}>
                Rating: {Math.round(item.vote_average * 10) / 10}
              </Text>
              <Text skipFocus style={{ ...DescriptionStyles, x: 30 }}>
                {item.overview}
              </Text>

              {/* Cast Members Carousel */}
              <Text
                skipFocus
                style={{ fontSize: 40, fontWeight: 10, marginTop: 30 }}
              >
                Cast:
              </Text>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "flexStart",
                  width: 1900,
                  height: 225,
                  color: "00000000",
                  gap: 0,
                }}
                skipFocus
              >
                {castCollection().map((castMember) => (
                  <Tile
                    style={TileStyles}
                    width={150}
                    height={225}
                    artwork={{ src: castMember.profile_image }}
                    persistentMetadata={true}
                    metadata={{
                      title: castMember.name,
                      maxLines: 1,
                    }}
                    tone="brand"
                  />
                ))}
              </Row>

              {/* Recommendations Carousel */}
              <Text skipFocus style={{ fontSize: 40, fontWeight: 10 }}>
                Recommendations:
              </Text>
              <Row style={{ ...RowStyless }}>
                {movieCollection().map((aMovie) => (
                  <Tile
                    style={TileStyles}
                    width={150}
                    height={225}
                    artwork={{
                      src: `https://image.tmdb.org/t/p/w500${aMovie.poster_path}`,
                    }}
                    persistentMetadata={true}
                    metadata={{
                      title: aMovie.title,
                      maxLines: 1,
                    }}
                    tone="brand"
                    // topRight={
                    //   <Label
                    //     width={75}
                    //     title={"⭐ " + Math.round(aMovie.vote_average / 2)}
                    //     mountX={0.5}
                    //     tone={"inverse"}
                    //   />
                    // }
                    onEnter={() => handleTileClick(aMovie, "movie")}
                  />
                ))}
              </Row>
            </Column>
          </Row>
        </Column>
      </View>
    </>
  );
};

export default Details2;
