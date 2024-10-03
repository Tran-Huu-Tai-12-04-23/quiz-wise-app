import { ButtonPrimary } from "@components/Button";
import HeaderCommon from "@components/HeaderCommon";
import Row from "@components/Row";
import Separator from "@components/Separator";
import { useLoading } from "@context/loadingGlobalContext";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import { replace } from "@navigation/NavigationService";
import { APP_ROUTE } from "@navigation/route";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import useCreateQuiz from "src/services/hooks/quiz/useRemovePodOrder";
import { styleGlobal } from "src/styles";
import ChooseLevel, { ChooseLevelRef } from "./Steps/ChooseLevel";
import ChooseSubject, { ChooseSubjectRef } from "./Steps/ChooseSubject";
import EnterDescription, {
  EnterDescriptionRef,
} from "./Steps/EnterDescription";
import Success from "./Steps/Success";

const mapTitle = [
  "Choose your subject",
  "Choose your level",
  "Enter description",
  "Success",
];
function CreateQuizScreen() {
  const { mutateAsync, data } = useCreateQuiz();
  const { startLoading, stopLoading } = useLoading();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const slide = useRef<PagerView | null>(null);
  const [state, setState] = useState<{
    type: string;
    level: string;
    description: string;
  }>({
    type: "",
    level: "",
    description: "",
  });

  const chooseSubjectRef = useRef<ChooseSubjectRef>(null);
  const chooseLevelRef = useRef<ChooseLevelRef>(null);
  const enterDesRef = useRef<EnterDescriptionRef>(null);
  const pages = [
    <ChooseSubject ref={chooseSubjectRef} />,
    <ChooseLevel ref={chooseLevelRef} />,
    <EnterDescription ref={enterDesRef} />,
    <Success />,
  ];

  const handleNextStep = async () => {
    switch (currentPage) {
      case 0: {
        const subject = chooseSubjectRef.current?.getSubjectSelected();
        if (subject) {
          setState({ ...state, type: subject });
          setCurrentPage(currentPage + 1);
        } else {
          Alert.alert("Please choose subject");
        }
        break;
      }
      case 1: {
        const level = chooseLevelRef.current?.getLevel();
        if (level) {
          setState({ ...state, level });
          setCurrentPage(currentPage + 1);
        } else {
          Alert.alert("Please choose level");
        }
        break;
      }
      case 2: {
        startLoading();
        const description = enterDesRef.current?.getDescription();
        if (description) {
          setState({ ...state, description });
        }
        await mutateAsync(state)
          .then((res) => {
            if (!res) return;
            Alert.alert("Success", "Create quiz successfully");
            stopLoading();
            setCurrentPage(currentPage + 1);
          })
          .catch((e) => {
            Alert.alert(
              "Cảnh báo",
              e?.response?.data?.message ??
                "Đã có lỗi xảy ra vui quáim thử lài sau"
            );
            stopLoading();
          });

        break;
      }
      case 3: {
        replace(APP_ROUTE.QUIZ_PLAY, {
          data: data,
        });
        break;
      }
    }
  };

  useEffect(() => {
    // Do something when reach the last page
    slide.current?.setPage(currentPage);
  }, [currentPage]);

  return (
    <MainLayout>
      <Separator height={normalize(40)} />
      <HeaderCommon title={mapTitle[currentPage]} />

      <PagerView
        scrollEnabled={false}
        ref={slide}
        style={styles.container}
        initialPage={currentPage}
      >
        {pages.map((page, index) => (
          <Fragment key={index}>{page}</Fragment>
        ))}
      </PagerView>
      <Row
        full
        between
        style={[
          styles.bottomAction,
          {
            borderColor: theme.border,
            alignItems: "center",
          },
        ]}
      >
        <Row
          start
          style={{ flex: 1, alignItems: "center" }}
          colGap={normalize(10)}
        >
          {[1, 2, 3, 4]?.map((_it, index) => {
            return (
              <View
                key={index}
                style={{
                  width: currentPage === index ? normalize(40) : normalize(15),
                  height: normalize(15),
                  backgroundColor:
                    currentPage === index
                      ? theme.primary
                      : theme.backgroundSecond,
                  borderRadius: normalize(15),
                }}
              />
            );
          })}
        </Row>
        <ButtonPrimary
          title={currentPage === pages.length - 1 ? "Play quiz" : "Next"}
          onPress={handleNextStep}
        />
      </Row>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    position: "relative",
    paddingHorizontal: 16,
  },
  bottomAction: {
    position: "absolute",
    bottom: normalize(20),
    width: "100%",
    paddingHorizontal: normalize(20),
    alignItems: "flex-end",
    ...styleGlobal.borderTop,

    paddingVertical: normalize(10),
  },
});

export default CreateQuizScreen;
