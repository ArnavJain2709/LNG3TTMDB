import { createSignal } from "solid-js";
import { Text } from "@lightningjs/solid";
import { Column, Row } from "@lightningjs/solid-ui";
import Button from "../components/Button/Button";
import SpaceBar from "../components/Button/SpaceBar";
import SearchTextBox from "../components/Button/SearchTextBox";
import DeleteButton from "../components/Button/DeleteButton";

const ColumnStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Center vertically
  height: "100vh", // Full viewport height to center vertically
  gap: 10, // Space between rows
};

const RowStyles = {
  display: "flex",
  justifyContent: "center",
  width: 1900,
  height: 100,
  color: "00000000",
  gap: 10,
  y: 0, // Center rows vertically
  x: 0, // Adjust x as needed
};

const TextBoxStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 48,
  padding: "10px 20px",
  border: "2px solid #000",
  borderRadius: "8px",
  marginBottom: "20px",
  minHeight: "60px",
  width: "100%", // You can adjust this to fit the container
  textAlign: "center",
};

const Search = () => {
  const [typedText, setTypedText] = createSignal("");

  const handleEnter = (text) => {
    if (text === "SPACE") {
      setTypedText((prev) => prev + " ");
    } else if (text === "DEL") {
      setTypedText((prev) => prev.slice(0, -1)); // Remove the last character
    } else {
      setTypedText((prev) => prev + text);
    }
  };

  return (
    <div>
      <Column style={ColumnStyles}>
        {/* Textbox to display typed text */}
        <Row style={RowStyles}>
          <SearchTextBox style={{ width: 400 }}>{typedText()}</SearchTextBox>
        </Row>
        {/* Keyboard layout */}
        <Row autofocus style={RowStyles}>
          <Button onEnter={() => handleEnter("1")}>1</Button>
          <Button onEnter={() => handleEnter("2")}>2</Button>
          <Button onEnter={() => handleEnter("3")}>3</Button>
          <Button onEnter={() => handleEnter("4")}>4</Button>
          <Button onEnter={() => handleEnter("5")}>5</Button>
          <Button onEnter={() => handleEnter("6")}>6</Button>
          <Button onEnter={() => handleEnter("7")}>7</Button>
          <Button onEnter={() => handleEnter("8")}>8</Button>
          <Button onEnter={() => handleEnter("9")}>9</Button>
          <Button onEnter={() => handleEnter("0")}>0</Button>
        </Row>
        <Row style={RowStyles}>
          <Button onEnter={() => handleEnter("Q")}>Q</Button>
          <Button onEnter={() => handleEnter("W")}>W</Button>
          <Button onEnter={() => handleEnter("E")}>E</Button>
          <Button onEnter={() => handleEnter("R")}>R</Button>
          <Button onEnter={() => handleEnter("T")}>T</Button>
          <Button onEnter={() => handleEnter("Y")}>Y</Button>
          <Button onEnter={() => handleEnter("U")}>U</Button>
          <Button onEnter={() => handleEnter("I")}>I</Button>
          <Button onEnter={() => handleEnter("O")}>O</Button>
          <Button onEnter={() => handleEnter("P")}>P</Button>
        </Row>
        <Row style={RowStyles}>
          <Button onEnter={() => handleEnter("A")}>A</Button>
          <Button onEnter={() => handleEnter("S")}>S</Button>
          <Button onEnter={() => handleEnter("D")}>D</Button>
          <Button onEnter={() => handleEnter("F")}>F</Button>
          <Button onEnter={() => handleEnter("G")}>G</Button>
          <Button onEnter={() => handleEnter("H")}>H</Button>
          <Button onEnter={() => handleEnter("J")}>J</Button>
          <Button onEnter={() => handleEnter("K")}>K</Button>
          <Button onEnter={() => handleEnter("L")}>L</Button>
        </Row>
        <Row style={RowStyles}>
          <Button onEnter={() => handleEnter("Z")}>Z</Button>
          <Button onEnter={() => handleEnter("X")}>X</Button>
          <Button onEnter={() => handleEnter("C")}>C</Button>
          <Button onEnter={() => handleEnter("V")}>V</Button>
          <Button onEnter={() => handleEnter("B")}>B</Button>
          <Button onEnter={() => handleEnter("N")}>N</Button>
          <Button onEnter={() => handleEnter("M")}>M</Button>
          <DeleteButton onEnter={() => handleEnter("DEL")}>DEL</DeleteButton>
        </Row>
        <Row style={RowStyles}>
          <SpaceBar onEnter={() => handleEnter("SPACE")}>SPACE</SpaceBar>
        </Row>
      </Column>
    </div>
  );
};

export default Search;
