import { AuthProvider } from "@context/authContext";
import BottomSheetProvider from "@context/bottomSheetContext";
import { LoadingProvider } from "@context/loadingGlobalContext";
import { ThemeProvider } from "@context/themContext";
import { ToastProvider } from "@context/toastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";

const queryClient = new QueryClient();
export default function App() {
  const isLoadingComplete = useLoadedAssets();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider>
            <SafeAreaProvider>
              <ToastProvider>
                <BottomSheetProvider>
                  <AuthProvider>
                    <LoadingProvider>
                      <Navigation />
                      <StatusBar />
                    </LoadingProvider>
                  </AuthProvider>
                </BottomSheetProvider>
              </ToastProvider>
            </SafeAreaProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    );
  }
}
