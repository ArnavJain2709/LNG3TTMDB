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
import { createEffect } from "solid-js";
import { getBackdropUrl } from "../api/functions";
import { View } from "@lightningjs/solid";
import ButtonsPage from "./ButtonsPage";

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
    fontSize: 45, // Adjust this value to make the font smaller
  };

  const TileStyles = {
    display: "flex-item",
    //marginLeft: 30,
  };

  createEffect(() => {
    console.log("Details component rendered");
    console.log("Item:", item);
    console.log("Type:", type);
  });

  const handleBackClick = () => {
    console.log("Back button clicked");
    navigate("/poster");
  };

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
        color

        //
      >
        <Row
          style={{
            display: "flex",
            width: 500,
          }}
        >
          <ButtonsPage />
          {/* <Button
            autofocus
            // style={{
            //   width: 20,
            // }}

            onEnter={handleBackClick}
          >
            Back to Poster
          </Button> */}
          <Column
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 20,
              gap: 20,
              backgroundColor: "#333",
              height: "100vh",
              width: 1800,
            }}
          >
            {/* <Button autofocus onEnter={handleBackClick}>
              Back to Poster
            </Button> */}

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
        </Row>
      </View>
    </>
  );
};

export default Details;
