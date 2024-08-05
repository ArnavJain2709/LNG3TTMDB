import { Text } from "@lightningjs/solid";
import styles from "../styles";
import { Button } from "@lightningjs/solid-ui";

const HelloWorld = () => {
  return (
    <>
      <Text autofocus style={styles.headlineText}>
        Hello World!
      </Text>
      <Text style={styles.headlineSubText}>
        M for here, C for Counter, P for Poster
        {/* <button>A button</button> */}
      </Text>
    </>
  );
};

export default HelloWorld;
