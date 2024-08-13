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
import ButtonsPage from "./ButtonsPage";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item, type } = location.state || {};

  // Signal to manage the visibility of ButtonsPage
  const [isExpanded, setIsExpanded] = createSignal(false);
  const [showHamburger, setShowHamburger] = createSignal(true);

  const DescriptionStyles = {
    fontFamily: "Lato",
    fontWeight: 10,
    lineHeight: 50,
    width: 1300,
    maxLines: 10,
    contain: "width",
    fontSize: 45,
  };

  createEffect(() => {
    console.log("Details component rendered");
    console.log("Item:", item);
    console.log("Type:", type);

    // Event listener for keyboard inputs
    const handleKeyDown = (event) => {
      if (event.key === "Backspace" || event.key === "ArrowLeft") {
        setIsExpanded(true); // Expand ButtonsPage on backspace or left arrow key
        setShowHamburger(false); // Hide hamburger icon when expanded
      } else if (event.key === "ArrowRight") {
        setIsExpanded(false); // Collapse ButtonsPage on right arrow key
        setShowHamburger(true); // Show hamburger icon when collapsed
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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
      >
        <div
          style={{
            position: "relative", // Ensures child elements like ButtonsPage are positioned relative to this container
            width: "100%",
            height: "100%",
          }}
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
              zIndex: 1, // Content layer
            }}
          >
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

          {/* Overlaying ButtonsPage */}
          {isExpanded() && (
            <div
              style={{
                position: "absolute", // Overlay position
                top: 0,
                left: 0,
                zIndex: 2, // Higher z-index to appear on top of the content
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)", // Optional: Darken the background for emphasis
              }}
            >
              <ButtonsPage />
            </div>
          )}

          {/* Hamburger Button */}
          {!isExpanded() && showHamburger() && (
            <Button
              onEnter={() => {
                setIsExpanded(true);
                setShowHamburger(false);
              }}
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute", // Positioned on top of the content
                top: 10,
                left: 10,
                y: 540,
                zIndex: 3, // Highest z-index to appear on top of everything
              }}
            >
              <Text>☰</Text> {/* Hamburger Icon */}
            </Button>
          )}
        </div>
      </View>
    </>
  );
};

export default Details;
