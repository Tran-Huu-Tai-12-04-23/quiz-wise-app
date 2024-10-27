import { ButtonOutlined, ButtonPrimary, IconButton } from "@components/Button";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import { navigate, replace } from "@navigation/NavigationService";
import { APP_ROUTE, BOTTOM_TAB_ROUTE } from "@navigation/route";
import HomeIcon from "assets/svg/home-icon";
import React, { useMemo, useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { IQuiz } from "src/dto/quiz.dto";
import SaveToLibraryScreen from "../../SaveToLibrary";

function FinishedView({
  result,
  data,
}: {
  result: Array<Number | null>;
  data: IQuiz[];
}) {
  const { theme } = useTheme();
  const [isSaveToLib, setIsShowLib] = useState(false);

  const totalCorrect = useMemo(() => {
    return data.filter((item, index) => {
      if (item.correctAnswerIndex === result[index]) {
        return true;
      }
      return false;
    });
  }, [data, result]);
  return (
    <MainLayout>
      {/* modal save to library */}
      <Modal animationType="slide" visible={isSaveToLib}>
        <SaveToLibraryScreen
          onClose={() => setIsShowLib(!isSaveToLib)}
          quizData={data}
        />
      </Modal>
      {/* modal save to library */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Row
          direction="column"
          full
          center
          style={{ marginTop: 100, paddingHorizontal: normalize(20) }}
          rowGap={10}
        >
          <Row
            direction="column"
            center
            full
            style={{
              backgroundColor: theme.backgroundSecond,
              borderRadius: 10,
              padding: 10,
            }}
            rowGap={10}
          >
            <TextDefault color={theme.textSecond}>Quiz complete</TextDefault>
            <TextDefault bold style={{ fontSize: normalize(18) }}>
              Congratulations!
            </TextDefault>
            <CircularProgress
              radius={normalize(80)}
              value={(totalCorrect.length / data.length) * 100}
              titleFontSize={2}
              valueSuffix={"%"}
              activeStrokeColor={theme.success}
              inActiveStrokeOpacity={0.2}
              inActiveStrokeWidth={normalize(20)}
              activeStrokeWidth={normalize(20)}
              duration={2000}
            />
            <Row full center colGap={20}>
              <Row
                colGap={5}
                style={{
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: theme.success,
                    width: normalize(10),
                    height: normalize(10),
                    borderRadius: 1000,
                  }}
                />
                <TextDefault bold>{totalCorrect.length} Correct</TextDefault>
              </Row>
              <Row start colGap={5} style={{ alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: theme.danger,
                    width: normalize(10),
                    height: normalize(10),
                    borderRadius: 1000,
                  }}
                />
                <TextDefault bold>
                  {data.length - totalCorrect.length} Incorrect
                </TextDefault>
              </Row>
            </Row>

            <TextDefault style={{ color: theme.textSecond }}>
              You have completed the quiz
            </TextDefault>
            <Row center colGap={10}>
              <TextDefault bold>Score:</TextDefault>
              <TextDefault>
                {totalCorrect.length}/{data.length}
              </TextDefault>
            </Row>
          </Row>

          <Separator height={normalize(20)} />
          <Row direction="column" center full rowGap={10}>
            <ButtonPrimary
              minWidth={"100%"}
              title="Play again"
              onPress={() =>
                replace(APP_ROUTE.QUIZ_PLAY, {
                  data: data,
                })
              }
            />
            <ButtonOutlined
              minWidth={"100%"}
              title="Save To My Library"
              onPress={function (): void {
                setIsShowLib(!isSaveToLib);
              }}
            />
          </Row>

          <Separator height={10} style={{ marginTop: "auto" }} />
        </Row>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          right: "50%",
          transform: [{ translateX: normalize(20) }],
        }}
      >
        <IconButton
          icon={<HomeIcon color={theme.primary} />}
          onPress={() => navigate(BOTTOM_TAB_ROUTE.HOME)}
        />
      </View>
    </MainLayout>
  );
}

export default FinishedView;
