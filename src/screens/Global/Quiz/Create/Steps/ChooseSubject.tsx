import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import { localImages } from "assets/localImage";
import React, { Fragment, forwardRef, useImperativeHandle } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { styleGlobal } from "src/styles";

export interface ChooseSubjectRef {
  getSubjectSelected: () => string;
}

const ChooseSubject = forwardRef<ChooseSubjectRef, any>((props, ref) => {
  const [subjectSelected, setSubjectSelected] = React.useState<string>("");
  const { theme } = useTheme();

  const subjects = [
    {
      name: "English",
      icon: (
        <Image source={localImages().english} style={styleGlobal.cardItem} />
      ),
    },
    {
      name: "Coding",
      icon: <Image source={localImages().book} style={styleGlobal.cardItem} />,
    },
    {
      name: "Construction",
      icon: (
        <Image source={localImages().coding} style={styleGlobal.cardItem} />
      ),
    },
    {
      name: "Math",
      icon: (
        <Image source={localImages().education} style={styleGlobal.cardItem} />
      ),
    },
  ];

  useImperativeHandle(ref, () => ({
    getSubjectSelected: () => subjectSelected,
  }));

  return (
    <Fragment>
      <Row direction="column" rowGap={10} start full style={styles.container}>
        <TextDefault size={24} style={{ color: theme.textSecond }}>
          Hey chairley , what subject you want improve today?
        </TextDefault>

        <Separator height={normalize(20)} />

        <Row direction="row" between wrap full rowGap={10} colGap={10}>
          {subjects.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSubjectSelected(item.name)}
              key={index}
              style={{ width: "45%" }}
            >
              <Row
                direction="column"
                rowGap={5}
                center
                full
                style={{
                  marginBottom: normalize(20),
                  backgroundColor:
                    subjectSelected === item.name
                      ? theme.primary
                      : theme.backgroundSecond,
                  borderRadius: normalize(10),
                  padding: normalize(10),
                }}
              >
                {item.icon}
                <TextDefault
                  size={18}
                  style={{
                    marginLeft: normalize(10),
                    color:
                      subjectSelected === item.name
                        ? theme.contrastText
                        : theme.textSecond,
                  }}
                >
                  {item.name}
                </TextDefault>
              </Row>
            </TouchableOpacity>
          ))}
        </Row>
      </Row>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  dot: {
    width: normalize(25),
    height: normalize(10),
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: normalize(20),
  },
});

export default ChooseSubject;
