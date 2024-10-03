import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React from "react";
import { StyleSheet } from "react-native";
import { styleGlobal } from "src/styles";
import RowItem from "./RowItem";

const userInfo: { name: string; email: string } = {
  name: "Tran Huu Tai",
  email: "huutt201@gmail.com",
};
function PersonalInfo() {
  const { theme } = useTheme();
  return (
    <Row direction="column" full start rowGap={normalize(5)}>
      <TextDefault>Personal info</TextDefault>
      <Row
        full
        direction="column"
        start
        style={[
          styles.wrapper,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        {Object.keys(userInfo).map((key, index) => (
          <RowItem
            key={index}
            isBorderBottom={index < Object.keys(userInfo)?.length}
            subTitle={userInfo[key as keyof typeof userInfo]}
            title={key.substring(0, 1).toUpperCase() + key.substring(1)}
          />
        ))}

        <RowItem title={"Reset password"} />
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...styleGlobal.shadow,
    ...styleGlobal.border,
    borderRadius: normalize(10),
  },
});

export default PersonalInfo;
