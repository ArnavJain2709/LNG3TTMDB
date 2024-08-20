import { createSignal, createEffect, onCleanup } from "solid-js";
import { Column, Row, Button } from "@lightningjs/solid-ui";
import Letter from "../components/Button/Letter";
import SpaceBar from "../components/Button/SpaceBar";
import SearchTextBox from "../components/Button/SearchTextBox";
import DeleteButton from "../components/Button/DeleteButton";
import { useNavigate } from "@solidjs/router";
import { Text } from "@lightningjs/solid";
import ButtonsPage from "./ButtonsPage";

const ColumnStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100vh",
  gap: 10,
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

  createEffect(() => {
    const handleKeyDown = (event) => {
      if (isExpanded()) {
        const validButtonRefs = buttonRefs.filter(
          (ref) => ref && typeof ref.focus === "function"
        );
        const index = validButtonRefs.findIndex(
          (ref) => ref === document.activeElement
        );

        if (event.key === "ArrowLeft") {
          if (index > 0) validButtonRefs[index - 1].focus();
        } else if (event.key === "ArrowRight") {
          if (index < validButtonRefs.length - 1)
            validButtonRefs[index + 1].focus();
        } else if (event.key === "ArrowUp") {
          // Handle focus for moving up if needed
        } else if (event.key === "ArrowDown") {
          // Handle focus for moving down if needed
        } else if (event.key === "Escape") {
          // Added Escape key for closing the menu
          setIsExpanded(false);
          setShowHamburger(true);
        }
      } else {
        if (event.key === "ArrowLeft") {
          setIsExpanded(true);
          setShowHamburger(false);
        } else if (event.key === "ArrowRight") {
          setIsExpanded(false);
          setShowHamburger(true);
        } else if (event.key === "Backspace") {
          setIsExpanded(!isExpanded());
          setShowHamburger(!showHamburger());
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Main Search Interface */}
      <Column style={{ ...ColumnStyles, zIndex: 1 }}>
        <Row style={RowStyles}>
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

      {/* Overlaying ButtonsPage */}
      {isExpanded() && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
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
            width: 50,
            height: 50,
            backgroundColor: "#444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 3,
          }}
        >
          <Text>☰</Text> {/* Hamburger Icon */}
        </Button>
      )}
    </div>
  );
};

export default Search;
