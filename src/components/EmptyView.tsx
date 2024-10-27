import EmptyIcon from "assets/svg/empty-icon";
import React from "react";
import Row from "./Row";
import TextDefault from "./TextDefault";

function EmptyView({ title = "No data" }: { title?: string }) {
  return (
    <Row rowGap={10} full direction="column" center>
      <EmptyIcon />
      <TextDefault>{title}</TextDefault>
    </Row>
  );
}

export default EmptyView;
