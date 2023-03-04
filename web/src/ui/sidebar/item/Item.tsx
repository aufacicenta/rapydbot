import clsx from "clsx";
import { Col, Container, Row } from "react-grid-system";
import Link from "next/link";

import styles from "./Item.module.scss";
import { ItemProps } from "./Item.types";

export const Item: React.FC<ItemProps> = ({ className, text, icon, url }) => (
  <div className={clsx(styles.item, className)}>
    <Container>
      <Row>
        {!!url && (
          <>
            {icon && (
              <Col lg={1}>
                <span className={styles["item__icon--wrapper"]}>{icon}</span>
              </Col>
            )}
            <Col>
              {text && (
                <Link href={url} passHref>
                  <a className={clsx(styles["item__text--wrapper"], styles.item__url)}>{text}</a>
                </Link>
              )}
            </Col>
          </>
        )}
        {!url && (
          <>
            {icon && (
              <Col lg={1}>
                <span className={styles["item__icon--wrapper"]}>{icon}</span>
              </Col>
            )}
            <Col>{text && <span className={styles["item__text--wrapper"]}>{text}</span>}</Col>
          </>
        )}
      </Row>
    </Container>
  </div>
);
