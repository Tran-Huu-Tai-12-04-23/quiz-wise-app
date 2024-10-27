import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import { navigate } from "@navigation/NavigationService";
import { BOTTOM_TAB_ROUTE } from "@navigation/route";
import FolderIcon from "assets/svg/folder-icon";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ILibrary } from "src/services/hooks/lib/dto";

function LibraryItem({ item }: { item: ILibrary }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(BOTTOM_TAB_ROUTE.QUIZ_OF_LIB, {
          lib: item,
        })
      }
      style={{
        width: "100%",
        padding: normalize(10),
        borderRadius: normalize(10),
      }}
    >
      <Row style={{ alignItems: "center" }} full start colGap={10}>
        <FolderIcon />
        <TextDefault>{item.name}</TextDefault>
      </Row>
    </TouchableOpacity>
  );
}

export default LibraryItem;
