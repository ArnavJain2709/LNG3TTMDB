import { useNavigate, useLocation } from "@solidjs/router";
import { Button, Column, Row } from "@lightningjs/solid-ui";
import { Text } from "@lightningtv/solid";
import { createEffect } from "solid-js";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item, type } = location.state || {};

  createEffect(() => {
    console.log("Details component rendered");
    console.log("Item:", item);
    console.log("Type:", type);
  });

  const handleBackClick = () => {
    console.log("Back button clicked");
    navigate("/");
  };

  if (!item) {
    console.log("No item data available");
    return <Text style={{ color: "white" }}>No item details available</Text>;
  }

  return (
    <Column
      style={{
        padding: 20,
        gap: 20,
        backgroundColor: "#333",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Button onEnter={handleBackClick}>Back to Poster</Button>
      <Row style={{ gap: 20 }}>
        <Column style={{ gap: 10 }}>
          <Text fontSize={24} fontWeight="bold" style={{ color: "white" }}>
            {item.title || item.name}
          </Text>
          <Text style={{ color: "white" }}>Type: {type}</Text>
          <Text style={{ color: "white" }}>
            Vote Average: {item.vote_average}
          </Text>
          <Text style={{ color: "white" }}>Description: {item.overview}</Text>
        </Column>
      </Row>
    </Column>
  );
};

export default Details;
