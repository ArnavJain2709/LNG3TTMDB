import { View, Text } from "@lightningjs/solid";

/**
 * Primary UI component for user interaction
 */

const styles = {
  container: {
    width: 125,
    height: 75,
    color: 0xffffffff,
    alpha: 0.3,
    borderRadius: 30,
    border: { width: 5, color: 0xcc33ffff },
    scale: 1,
    focus: {
      color: 0x58807dff,
      scale: 1.2,
      border: { width: 5, color: 0xff0000ff },
      alpha: 1,
    },
    active: {
      color: 0x33ff55ff,
    },
    disabled: {
      alpha: 1,
    },
    transition: {
      color: { duration: 0.1 },
      scale: { duration: 0.1 },
      alpha: { duration: 1500, delay: 100, timing: "easy-in" },
    },
  },
};

styles.text = {
  fontSize: 32,
  lineHeight: styles.container.height,
  contain: "width",
  textAlign: "center",
  mountY: -0.5,
  color: 0xf6f6f9ff,
  height: styles.container.height,
  width: styles.container.width,
  focus: {
    fontSize: 40,
  },
};

export default function Button(props) {
  return (
    <View {...props} forwardStates style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
}
