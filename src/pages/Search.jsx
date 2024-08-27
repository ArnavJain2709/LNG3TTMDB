import { createSignal, createEffect, onCleanup } from "solid-js";
import { Column, Row, Button } from "@lightningjs/solid-ui";
import Letter from "../components/Button/Letter";
import SpaceBar from "../components/Button/SpaceBar";
import SearchTextBox from "../components/Button/SearchTextBox";
import DeleteButton from "../components/Button/DeleteButton";
import { useNavigate, useLocation } from "@solidjs/router";

const ColumnStyles = {
  display: "flex",
  flexDirection: "column",
  //justifyContent: "center",
  height: "100vh",
  gap: 10,
  x: 25,
};

const RowStyles = {
  display: "flex",
  justifyContent: "center",
  width: 1900,
  height: 100,
  gap: 10,
};

const Search = ({ onSearch }) => {
  const [typedText, setTypedText] = createSignal("");
  const [isExpanded, setIsExpanded] = createSignal(false);
  const [showHamburger, setShowHamburger] = createSignal(true);
  const navigate = useNavigate();

  let buttonRefs = [];

  const handleEnter = (text) => {
    if (text === "SPACE") {
      setTypedText((prev) => prev + " ");
    } else if (text === "Enter") {
      console.log("Search Query entered: ", typedText());
      navigate("/searchResults", { state: { typedText: typedText() } });
    } else if (text === "DEL") {
      setTypedText((prev) => prev.slice(0, -1));
    } else {
      setTypedText((prev) => prev + text);
    }
  };

  return (
    <>
      {/* Main Search Interface */}
      <Column style={{ ...ColumnStyles }}>
        <Column style={{ gap: 500, height: 100 }}>
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
                // x: 700,
              }}
              onEnter={() => navigate("/search")}
            >
              Search
            </Button>
          </Row>
        </Column>
        <Row style={{ ...RowStyles, marginTop: 170 }}>
          <SearchTextBox style={{ width: 400 }}>{typedText()}</SearchTextBox>
        </Row>
        <Row autofocus style={RowStyles}>
          <Letter
            ref={(el) => (buttonRefs[0] = el)}
            onEnter={() => handleEnter("1")}
          >
            1
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[1] = el)}
            onEnter={() => handleEnter("2")}
          >
            2
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[2] = el)}
            onEnter={() => handleEnter("3")}
          >
            3
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[3] = el)}
            onEnter={() => handleEnter("4")}
          >
            4
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[4] = el)}
            onEnter={() => handleEnter("5")}
          >
            5
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[5] = el)}
            onEnter={() => handleEnter("6")}
          >
            6
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[6] = el)}
            onEnter={() => handleEnter("7")}
          >
            7
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[7] = el)}
            onEnter={() => handleEnter("8")}
          >
            8
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[8] = el)}
            onEnter={() => handleEnter("9")}
          >
            9
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[9] = el)}
            onEnter={() => handleEnter("0")}
          >
            0
          </Letter>
        </Row>
        <Row style={RowStyles}>
          <Letter
            ref={(el) => (buttonRefs[10] = el)}
            onEnter={() => handleEnter("Q")}
          >
            Q
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[11] = el)}
            onEnter={() => handleEnter("W")}
          >
            W
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[12] = el)}
            onEnter={() => handleEnter("E")}
          >
            E
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[13] = el)}
            onEnter={() => handleEnter("R")}
          >
            R
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[14] = el)}
            onEnter={() => handleEnter("T")}
          >
            T
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[15] = el)}
            onEnter={() => handleEnter("Y")}
          >
            Y
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[16] = el)}
            onEnter={() => handleEnter("U")}
          >
            U
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[17] = el)}
            onEnter={() => handleEnter("I")}
          >
            I
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[18] = el)}
            onEnter={() => handleEnter("O")}
          >
            O
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[19] = el)}
            onEnter={() => handleEnter("P")}
          >
            P
          </Letter>
        </Row>
        <Row style={RowStyles}>
          <Letter
            ref={(el) => (buttonRefs[20] = el)}
            onEnter={() => handleEnter("A")}
          >
            A
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[21] = el)}
            onEnter={() => handleEnter("S")}
          >
            S
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[22] = el)}
            onEnter={() => handleEnter("D")}
          >
            D
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[23] = el)}
            onEnter={() => handleEnter("F")}
          >
            F
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[24] = el)}
            onEnter={() => handleEnter("G")}
          >
            G
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[25] = el)}
            onEnter={() => handleEnter("H")}
          >
            H
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[26] = el)}
            onEnter={() => handleEnter("J")}
          >
            J
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[27] = el)}
            onEnter={() => handleEnter("K")}
          >
            K
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[28] = el)}
            onEnter={() => handleEnter("L")}
          >
            L
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[29] = el)}
            onEnter={() => handleEnter("Enter")}
          >
            Enter
          </Letter>
        </Row>
        <Row style={RowStyles}>
          <Letter
            ref={(el) => (buttonRefs[30] = el)}
            onEnter={() => handleEnter("Z")}
          >
            Z
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[31] = el)}
            onEnter={() => handleEnter("X")}
          >
            X
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[32] = el)}
            onEnter={() => handleEnter("C")}
          >
            C
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[33] = el)}
            onEnter={() => handleEnter("V")}
          >
            V
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[34] = el)}
            onEnter={() => handleEnter("B")}
          >
            B
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[35] = el)}
            onEnter={() => handleEnter("N")}
          >
            N
          </Letter>
          <Letter
            ref={(el) => (buttonRefs[36] = el)}
            onEnter={() => handleEnter("M")}
          >
            M
          </Letter>
          <DeleteButton
            ref={(el) => (buttonRefs[37] = el)}
            onEnter={() => handleEnter("DEL")}
          >
            DEL
          </DeleteButton>
        </Row>
        <Row style={RowStyles}>
          <SpaceBar
            ref={(el) => (buttonRefs[38] = el)}
            onEnter={() => handleEnter("SPACE")}
          >
            SPACE
          </SpaceBar>
        </Row>
      </Column>
    </>
  );
};

export default Search;
