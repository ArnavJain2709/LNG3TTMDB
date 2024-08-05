// SearchBar.jsx
import { createSignal } from "solid-js";

const SearchBar = (props) => {
  return (
    <input
      type="text"
      value={props.searchText()}
      onInput={(e) => props.setSearchText(e.target.value)}
      id="search-bar"
      placeholder="Type here..."
    />
  );
};

export default SearchBar;
