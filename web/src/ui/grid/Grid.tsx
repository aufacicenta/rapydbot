import clsx from "clsx";
import React from "react";
import { Col as RGSCol, Container as RGSContainer, Row as RGSRow } from "react-grid-system";

import styles from "./Grid.module.scss";
import { ColProps, ContainerProps, GridProps, RowProps } from "./Grid.types";

export const Grid: React.FC<GridProps> & {
  Col: React.FC<ColProps>;
  Row: React.FC<RowProps>;
  Container: React.FC<ContainerProps>;
} = ({ children, className }) => <div className={clsx(styles.grid, className)}>{children}</div>;

const Container: React.FC<RowProps> = ({ children, className, ...props }) => (
  <RGSContainer className={clsx(className)} {...props}>
    {children}
  </RGSContainer>
);

const Row: React.FC<RowProps> = ({ children, className, ...props }) => (
  <RGSRow className={clsx(className)} {...props}>
    {children}
  </RGSRow>
);

const Col: React.FC<ColProps> = ({ children, justifyContent, className, ...props }) => (
  <RGSCol className={clsx(className, { [styles["col__justify-content--end"]]: justifyContent === "end" })} {...props}>
    {children}
  </RGSCol>
);

Grid.Row = Row;
Grid.Col = Col;
Grid.Container = Container;
