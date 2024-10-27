import { config } from "@helper/helpers";
import { BOTTOM_TAB_ROUTE } from "@navigation/route";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import LibraryScreen from "src/screens/BottomTab/Library";
import QuizOfLibScreen from "src/screens/BottomTab/Library/Childs/QuizOfLib";

const { Navigator, Screen } = createStackNavigator();

const libScreens = [
  {
    name: BOTTOM_TAB_ROUTE.LIBRARY,
    component: LibraryScreen,
  },
  {
    name: BOTTOM_TAB_ROUTE.QUIZ_OF_LIB,
    component: QuizOfLibScreen,
  },
];

const LibNav = () => {
  return (
    <Navigator
      screenOptions={
        {
          tabBarStyle: {
            height: Platform.OS == "android" ? 60 : 80,
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          ...config,
        } as any
      }
    >
      {libScreens.map((lib) => (
        <Screen name={lib.name} key={lib.name} component={lib.component} />
      ))}
    </Navigator>
  );
};

export default LibNav;
