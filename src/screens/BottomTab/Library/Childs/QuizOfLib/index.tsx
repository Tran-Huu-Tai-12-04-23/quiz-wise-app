import BackBtn from "@components/BackBtn";
import EmptyView from "@components/EmptyView";
import QuizItem from "@components/QuizItem";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import Helper, { normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import { useRoute } from "@react-navigation/native";
import React, { useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ILibrary } from "src/services/hooks/lib/dto";
import useLoadQuizOfLibraryPagination from "src/services/hooks/lib/useLoadQuizOfLibraryPagination";
import { styleGlobal } from "src/styles";

const QuizOfLibScreen = () => {
  const { lib } = useRoute().params as { lib: ILibrary };

  const { data, isLoading, fetchNextPage, refetch, isRefetching } =
    useLoadQuizOfLibraryPagination(
      {
        where: {},
        skip: 0,
        take: 10,
      },
      lib.id
    );

  const header = useMemo(
    () => (
      <Row full between>
        <BackBtn />
        <TextDefault size={normalize(20)}>
          {Helper.uppercaseFirstLetter(lib?.name)}
        </TextDefault>
      </Row>
    ),
    [lib]
  );

  return (
    <MainLayout>
      <Separator height={normalize(40)} />
      <Row full direction="column" rowGap={10} style={styles.container}>
        {header}
        <FlatList
          style={styles.list}
          refreshing={isRefetching}
          onRefresh={refetch}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          data={data}
          ItemSeparatorComponent={() => (
            <Separator
              height={normalize(10)}
              style={styleGlobal.borderBottom}
            />
          )}
          renderItem={({ item }) => <QuizItem data={item} />}
          ListEmptyComponent={() =>
            !isLoading && !isRefetching ? (
              <EmptyView title="No quiz in library" />
            ) : null
          }
        />
      </Row>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: normalize(10),
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export default React.memo(QuizOfLibScreen);
