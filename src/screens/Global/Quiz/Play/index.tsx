import BackBtn from "@components/BackBtn";
import { ButtonPrimary } from "@components/Button";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useBottomSheet } from "@context/bottomSheetContext";
import { useLoading } from "@context/loadingGlobalContext";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import { deviceWidth } from "@helper/utils";
import MainLayout from "@layout/MainLayout";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { IQuiz } from "src/dto/quiz.dto";
import { styleGlobal } from "src/styles";
import AnswerItem from "./components/AnswerItem";
import FinishedView from "./components/Finished";
import QuestionItem from "./components/QuestionItem";

function PlayQuizScreen() {
  const { data } = useRoute().params as {
    data: IQuiz[];
  };

  const { openBottomSheet, hideBottomSheet } = useBottomSheet();
  const { startLoading, stopLoading } = useLoading();
  const [restTimeBySecond, setRestTimeBySecond] = useState(0);
  const lstRef = useRef<any>([]);
  const { theme } = useTheme();
  const [newData, setNewData] = useState([...data, ...data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(
    data.map(() => null)
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const animatedValue = useSharedValue(0);
  const MAX = 3;
  /// handle check result of question
  const offset = useSharedValue<number>(0);

  /// style bottom sheet for result question
  const animatedStyles = useAnimatedStyle(() => ({
    height: offset.value,
  }));

  const animatedStyle = useAnimatedStyle(() => {
    if (animatedValue.value > currentIndex + 0.5) {
      runOnJS(setActivityIndex)(currentIndex + 1);
    } else {
      runOnJS(setActivityIndex)(currentIndex);
    }
    const opacity = interpolate(
      animatedValue.value,
      [currentIndex, currentIndex + 0.3, currentIndex + 0.8, currentIndex + 1],
      [1, 0, 0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacity,
    };
  });

  const handleResetAnswer = () => {
    for (let i = 0; i < lstRef.current.length; i++) {
      if (lstRef.current[i]) {
        lstRef.current[i].resetAnswer();
      }
    }
  };

  useEffect(() => {
    handleResetAnswer();
  }, [currentIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    setRestTimeBySecond(0);
    interval = setInterval(() => {
      setRestTimeBySecond((prev) => prev + 1);
    }, 1000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (currentIndex > data.length - 1) {
      startLoading();
      timeoutId = setTimeout(() => {
        stopLoading();
      }, 1000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentIndex]);

  if (currentIndex > data.length - 1) {
    return <FinishedView result={answers} data={data} />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Row
        direction="row"
        style={{
          position: "absolute",
          top: normalize(40),
          right: normalize(20),
          left: normalize(20),
          zIndex: 1000,
          alignItems: "center",
        }}
        rowGap={10}
        between
      >
        <BackBtn color={"white"} />
        <TextDefault bold style={{ fontSize: normalize(18), color: "white" }}>
          {currentIndex + 1}/{data.length}
        </TextDefault>
      </Row>
      <MainLayout>
        <Row full direction="column" style={{ flex: 1 }} rowGap={10} start>
          <LinearGradient
            // Background Linear Gradient
            colors={[theme.primary, theme.primary, theme.primary]}
            style={{
              width: deviceWidth,
              minHeight: deviceWidth * 0.9,
              borderBottomEndRadius: normalize(20),
              borderBottomStartRadius: normalize(20),
            }}
          >
            <Separator height={normalize(40)} />
            <View style={[styles.cardContainer]}>
              {data.map((item, index) => {
                if (index > currentIndex + MAX || index < currentIndex) {
                  return null;
                }
                return (
                  <QuestionItem
                    newData={newData}
                    setNewData={setNewData}
                    maxVisibleItems={MAX}
                    item={item}
                    index={index}
                    dataLength={newData.length}
                    animatedValue={animatedValue}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    key={index}
                  />
                );
              })}
            </View>
          </LinearGradient>
          <Animated.View
            style={[
              { width: "100%", padding: normalize(10), flex: 1 },
              animatedStyle,
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Row direction="column" start rowGap={5}>
                <TextDefault bold style={{ fontSize: normalize(16) }}>
                  Choose the correct answer
                </TextDefault>
                <Separator height={normalize(20)} />
                {data[currentIndex]?.options.map((item, index) => {
                  return (
                    <AnswerItem
                      active={answers[currentIndex] === index + 1}
                      onPress={() => {
                        setAnswers((prev) => {
                          const newAnswers = [...prev];
                          newAnswers[currentIndex] = index + 1;
                          return newAnswers;
                        });
                      }}
                      ref={(ref) => (lstRef.current[index] = ref)}
                      data={item}
                      key={index}
                    />
                  );
                })}
              </Row>
              <Separator height={normalize(50)} />
            </ScrollView>
          </Animated.View>
        </Row>

        <Animated.View
          style={[
            styles.activityContainer,
            styles.bottomContainer,
            {
              backgroundColor: theme.background,
              borderColor:
                isCorrect === null
                  ? theme.primary
                  : isCorrect
                  ? theme.success
                  : theme.danger,
              ...styleGlobal.borderTop,
            },
            animatedStyles,
          ]}
        >
          <Row start full direction="column" rowGap={10}>
            <TextDefault color={theme.textSecond}>Result</TextDefault>
            <TextDefault
              size={normalize(20)}
              color={
                isCorrect === null
                  ? theme.primary
                  : isCorrect
                  ? theme.success
                  : theme.danger
              }
            >
              Incorrect!
            </TextDefault>
            <Row center full>
              <ButtonPrimary
                backgroundColor={
                  isCorrect === null
                    ? theme.primary
                    : isCorrect
                    ? theme.success
                    : theme.danger
                }
                onPress={() => {
                  if (
                    answers[currentIndex] ===
                    data[currentIndex].correctAnswerIndex
                  ) {
                    setIsCorrect(true);
                  } else {
                    setIsCorrect(false);
                  }
                  if (offset.value === 0) {
                    offset.value = withTiming(normalize(160));
                  } else {
                    offset.value = withTiming(0);
                    setIsCorrect(null);
                    setCurrentIndex((prev) => prev + 1);
                  }
                }}
                minWidth={deviceWidth / 2}
                title={isCorrect !== null ? "Next" : "Check"}
              />
            </Row>
          </Row>
        </Animated.View>
      </MainLayout>
    </GestureHandlerRootView>
  );
}
export default PlayQuizScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    paddingTop: normalize(20),
    paddingBottom: normalize(70),
    padding: normalize(10),
  },
  container: {
    flex: 1,
    backgroundColor: "#111111",
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
});
