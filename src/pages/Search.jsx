import { createSignal } from "solid-js";
import SearchBar from "./SearchBar";
import Keyboard from "./Keyboard";
import { Text } from "@lightningjs/solid";

import {
  Column,
  Tile,
  Badge,
  Label,
  Metadata,
  tileStyles,
  Row,
} from "@lightningjs/solid-ui";
import Button from "../components/Button/Button";

const ColumnStyles = {
  display: "flex",
  flexDirection: "column",
  //alignItems: "center", // Center horizontally
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
  //marginLeft: 30,
};

const childrenItems = {
  flexItem: true,
  //alignSelf: "center",
};
const TileStyles = {
  display: "flex-item",
};
const Search = () => {
  const handleEnter = (text) => {
    console.log(text);
  };

  return (
    <div>
      <Column style={{ ColumnStyles }}>
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
        </Row>
        <Row style={RowStyles}>
          <Button onEnter={() => handleEnter("SPACE")}>SPACE</Button>
        </Row>
      </Column>
    </div>
  );
};

export default Search;
