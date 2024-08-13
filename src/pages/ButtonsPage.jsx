import { Button } from "@lightningjs/solid-ui";
import { Row, Column } from "@lightningjs/solid-ui";
import { useNavigate } from "@solidjs/router";
import { Text } from "@lightningjs/solid";

const ButtonsPage = () => {
  function onEnter(event, elm) {
    this.states.toggle("disabled");
  }

  const RowStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 300,
    height: 1080,
    color: "00000000",
    gap: 0,
    // y: 540,
    //x: 20,
  };

  const navigate = useNavigate();
  const handleSearchEnter = () => {
    navigate("/search");
  };
  const handleHomeEnter = () => {
    navigate("/poster");
  };

  return (
    <div>
      <Column style={RowStyles}>
        <Button
          style={{
            width: 300,
            height: 80,
            display: "flex",
            justifyContent: "center",
          }}
          autofocus
          onEnter={() => handleSearchEnter()}
        >
          <Text style={{ fontSize: 100 }}>Search</Text>
        </Button>
        <Button
          style={{
            width: 300,
            height: 80,
          }}
          onEnter={() => handleHomeEnter()}
        >
          Home
        </Button>
      </Column>
    </div>
  );
};

export default ButtonsPage;
