// Keyboard.jsx
const keys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "Space",
  "Enter",
  "Backspace",
];

const Keyboard = (props) => {
  const handleKeyPress = (key) => {
    props.onKeyPress(key);
  };

  return (
    <div class="keyboard">
      {keys.map((key) => (
        <button onClick={() => handleKeyPress(key)} class="key">
          {key === "Space" ? " " : key}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
