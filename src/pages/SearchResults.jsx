import { useLocation, useNavigate } from "@solidjs/router";
import { Text } from "@lightningjs/solid";
import { createEffect, createSignal, onMount } from "solid-js";
import { searchContent } from "../api/functions";
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

const SearchResults = () => {
  const location = useLocation();
  const { typedText } = location.state || {};
  const [resultsCollection, setResultsCollection] = createSignal([]);
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
    //justifyContent: "center", // Center vertically
    height: "100vh", // Full viewport height to center vertically
    gap: 100, // Space between rows
    x: 25,
  };

  createEffect(async () => {
    if (!typedText) {
      console.log("No item data available");
    } else {
      console.log("Typed text:", typedText);
    }
    const results = await searchContent(typedText);
    if (results.length > 0) {
      // Filter out results without poster_path
      const validResults = results.filter((item) => item.poster_path);
      setResultsCollection(validResults);
      console.log("Results:", validResults);
    }
    console.log(validResults);
  });

  const handleTileClick = (item, type) => {
    console.log("Tile clicked:", item, type);
    navigate("/details", { state: { item, type } });
  };

  return (
    <div>
      {typedText ? (
        <Column style={ColumnStyles}>
          <Row style={{ gap: 20, height: 80 }}>
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
                width: 300,
                height: 80,
                color: "0x071423ff",
                marginLeft: 835,
                // x: 700,
              }}
              onEnter={() => navigate("/search")}
            >
              <Text>🔍</Text>
            </Button>
          </Row>
          <Text skipFocus style={{ fontSize: "50" }}>
            Search results for: {typedText}
          </Text>
          <Row style={RowStyles}>
            {resultsCollection().map((aResult) => (
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
                  src: `https://image.tmdb.org/t/p/w500${aResult.poster_path}`,
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
                  title: aResult.title,
                  maxLines: 1,
                }}
                // progressBar={{ progress: 0.5 }}
                tone="brand"
                topRight={
                  <Label
                    width={75}
                    title={"⭐ " + Math.round(aResult.vote_average / 2)}
                    mountX={0.5}
                    tone={"inverse"}
                  />
                }
                //inset={<Metadata title={aMovie.title} tone="brand" />}
                onEnter={() =>
                  handleTileClick(
                    aResult,
                    aResult.media_type === "movie" ? "movie" : "tv"
                    //aResult.media_type === "movie" ? "movie" : "tv"
                  )
                } // Pass data on click
              />
            ))}
          </Row>
        </Column>
      ) : (
        <Text style={{ color: "white" }}>No item details available</Text>
      )}
    </div>
  );
};

export default SearchResults;

// import { useNavigate, useLocation } from "@solidjs/router";
// import { Button, Column, Row } from "@lightningjs/solid-ui";
// import { Text } from "@lightningjs/solid";
// import { createEffect } from "solid-js";

// const SearchResults = () => {
//   const { typedText } = location.state || {};
//   if (!typedText) {
//     console.log("No item data available");
//     console.log("Typed text:", typedText);
//     return <Text style={{ color: "white" }}>No item details available</Text>;
//   }

//   return (
//     <>
//       <Text>{typedText}</Text>;
//     </>
//   );
// };

// export default SearchResults;
