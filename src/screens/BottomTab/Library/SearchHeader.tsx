import { Input } from "@components/Input";
import Row from "@components/Row";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
function SearchHeader({
  val,
  onChange,
}: {
  val: string;
  onChange: (val: string) => void;
}) {
  return (
    <Row full between style={{ alignItems: "center" }}>
      <Input onChangeText={onChange} text={val} />
      <EvilIcons
        style={{
          position: "absolute",
          right: 10,
        }}
        name="search"
        size={24}
        color="black"
      />
    </Row>
  );
}

export default SearchHeader;
