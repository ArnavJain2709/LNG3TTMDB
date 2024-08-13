import { useNavigate, useLocation } from "@solidjs/router";
import { Button, Column, Row } from "@lightningjs/solid-ui";
import { Text } from "@lightningjs/solid";
import { createEffect } from "solid-js";
import { getBackdropUrl } from "../api/functions";
import { View } from "@lightningjs/solid";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item, type } = location.state || {};

  const DescriptionStyles = {
    fontFamily: "Roboto",
    fontWeight: 5,
    lineHeight: 50,
    width: 1500,
    maxLines: 10,
    contain: "width",
    fontSize: 35, // Adjust this value to make the font smaller
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
        colorTop="0xffffffff"
        colorBottom="0x000000ff"
      >
        <Column
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 20,
            gap: 20,
            backgroundColor: "#333",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Button autofocus onEnter={handleBackClick}>
            Back to Poster
          </Button>

          <Row style={{ gap: 20 }}>
            <Column style={{ gap: 10 }}>
              <Text>{item.title || item.name}</Text>
              <Text>Rating: {Math.round(item.vote_average * 10) / 10}</Text>
              <Text style={DescriptionStyles}>{item.overview}</Text>
            </Column>
          </Row>
        </Column>
      </View>
    </>
  );
};

export default Details;
