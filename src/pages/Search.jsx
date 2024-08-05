// App.jsx
import { createSignal } from "solid-js";
import SearchBar from "./SearchBar";
import Keyboard from "./Keyboard";
import "./styles2.css";

const Search = () => {
  const [searchText, setSearchText] = createSignal("");

  const handleKeyPress = (key) => {
    if (key === "Enter") {
      // Handle enter key press
      console.log("Search text submitted:", searchText());
    } else if (key === "Backspace") {
      setSearchText(searchText().slice(0, -1));
    } else if (key === "Space") {
      setSearchText(searchText() + " ");
    } else {
      setSearchText(searchText() + key);
    }
  };

  return (
    <div>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Search;
