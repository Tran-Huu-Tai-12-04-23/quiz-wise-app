import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React, { forwardRef, useImperativeHandle } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Row from "src/components/Row";
import TextDefault from "src/components/TextDefault";
import { styleGlobal } from "src/styles";

const AnswerItem = forwardRef(
  (
    {
      data,
      onPress,
      active,
    }: {
      data: string;
      onPress: () => void;
      active: boolean;
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [dataAnswer, setDataAnswer] = React.useState<any>({
      isCorrect: null,
      borderColor: "transparent",
    });

    const resetAnswer = () => {
      setDataAnswer({
        isCorrect: null,
        borderColor: "transparent",
      });
    };

    useImperativeHandle(ref, () => ({
      resetAnswer,
    }));

    return (
      <TouchableOpacity style={{ width: "99%" }} onPress={onPress}>
        <Row
          between
          full
          center
          style={[
            styles.container,
            {
              backgroundColor: active ? theme.primary : theme.background,
            },
          ]}
        >
          <TextDefault
            center
            style={{
              fontSize: normalize(14),
              color: active ? theme.background : theme.text,
            }}
          >
            {data}
          </TextDefault>
        </Row>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: normalize(8),
    borderRadius: normalize(5),
    justifyContent: "center",
    alignItems: "center",
    ...styleGlobal.shadow,
  },
});

export default AnswerItem;
