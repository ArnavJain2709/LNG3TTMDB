import { createSignal, For } from "solid-js";
import { Tile, Badge, Label, Metadata } from "@lightningjs/solid-ui";

const Carousel = (props) => {
  const [selectedIndex, setSelectedIndex] = createSignal(0);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : props.items.length - 1
      );
    } else if (e.key === "ArrowRight") {
      setSelectedIndex((prev) =>
        prev < props.items.length - 1 ? prev + 1 : 0
      );
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex="0">
      <h2>{props.title}</h2>
      <div style={{ display: "flex", "overflow-x": "auto" }}>
        <For each={props.items}>
          {(item, index) => (
            <Tile
              states={index() === selectedIndex() ? "focus" : ""}
              width={240}
              height={360}
              artwork={{
                src: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                effects: {
                  linearGradient: {
                    angle: 3.14,
                    stops: [0, 0.5],
                    colors: ["#000000", "transparent"],
                  },
                },
              }}
              persistentMetadata={true}
              metadata={{
                title: item.title || item.name,
                maxLines: 1,
              }}
              tone="brand"
              topLeft={<Badge title="HD" tone="brand" />}
              inset={<Metadata title={item.title || item.name} tone="brand" />}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export default Carousel;
