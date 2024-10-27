import EmptyView from "@components/EmptyView";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import useLibPagination from "src/services/hooks/lib/useLibPagination";
import { styleGlobal } from "src/styles";
import LibraryItem from "./LibraryItem";
import SearchHeader from "./SearchHeader";
function LibraryScreen() {
  const [searchKey, setSearchKey] = useState("");
  const { hasNextPage, fetchNextPage, isLoading, isFetching, refetch, data } =
    useLibPagination({
      where: {},
      skip: 0,
      take: 10,
    });
  const { theme } = useTheme();

  return (
    <MainLayout>
      <Separator height={normalize(40)} />
      <SearchHeader onChange={(val) => setSearchKey(val)} val={searchKey} />
      {isLoading ||
        (isFetching && (
          <Row full center colGap={10}>
            <TextDefault>Loading...</TextDefault>
            <ActivityIndicator color={theme.primary} />
          </Row>
        ))}
      <FlashList
        refreshing={isFetching}
        onRefresh={refetch}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        data={data}
        ItemSeparatorComponent={() => (
          <Separator height={normalize(2)} style={[styleGlobal.borderBottom]} />
        )}
        renderItem={({ item }) => <LibraryItem item={item} />}
        ListEmptyComponent={() =>
          !isLoading && !isFetching ? <EmptyView /> : null
        }
        estimatedItemSize={20}
      />
    </MainLayout>
  );
}

export default LibraryScreen;
