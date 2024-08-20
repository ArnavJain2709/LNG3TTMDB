//new file

import { useNavigate, useLocation } from "@solidjs/router";
import {
  Button,
  Column,
  Row,
  Tile,
  Badge,
  Label,
  Metadata,
  tileStyles,
} from "@lightningjs/solid-ui";
import { Text } from "@lightningjs/solid";
import { createEffect, createSignal } from "solid-js";
import { getBackdropUrl } from "../api/functions";
import { View } from "@lightningjs/solid";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item, type } = location.state || {};

  const DescriptionStyles = {
    fontFamily: "Lato",
    fontWeight: 10,
    lineHeight: 50,
    width: 1300,
    maxLines: 10,
    contain: "width",
    fontSize: 45,
  };

  const handleHome = () => {
    navigate("/poster");
  };
  const handleSearch = () => {
    navigate("/search");
  };

  createEffect(() => {
    console.log("Details component rendered");
    console.log("Item:", item);
    console.log("Type:", type);
  });

  if (!item) {
    console.log("No item data available");
    return <Text style={{ color: "white" }}>No item details available</Text>;
  }

  const backgroundImageUrl = item.backdrop_path
    ? `url()${item.backdrop_path})`
    : "";
  const fullBackgroundImageUrl = getBackdropUrl(item.backdrop_path);

  console.log("Background image URL:", fullBackgroundImageUrl);

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
            // zIndex: 1, // Content layer
          }}
        >
          <Row style={{ gap: 20, height: 80 }}>
            <Button
              style={{
                width: 300,
                height: 80,
                color: "0x071423ff",
                // x: 700,
              }}
              autofocus
              onEnter={() => handleHome()}
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
            >
              TV
            </Button>
            <Button
              style={{
                width: 300,
                height: 80,
                color: "0x071423ff",
                // x: 700,
              }}
              onEnter={() => handleSearch()}
            >
              search
            </Button>
          </Row>
          <Row style={{ gap: 20 }}>
            <Column style={{ gap: 20 }}>
              <Text style={{ x: 30 }}>{item.title || item.name}</Text>
              <Text style={{ x: 30, fontSize: 35 }}>
                Rating: {Math.round(item.vote_average * 10) / 10}
              </Text>
              <Text style={{ ...DescriptionStyles, x: 30 }}>
                {item.overview}
              </Text>
            </Column>
          </Row>
        </Column>
      </View>
    </>
  );
};

export default Details;
