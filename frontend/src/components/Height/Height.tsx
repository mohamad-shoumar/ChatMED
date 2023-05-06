import React from "react";
import styles from "./height.module.scss";
import { useState } from "react";
interface HeightProps {
  image: any;
  title: string;
  value: number;
  unit: string;
}

export const Height: React.FC<HeightProps> = ({
  image,
  title,
  value,
  unit,
}) => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.cardTitle}>{title}</div>
          <img className={styles.cardIcon} src={image} alt="Card Image" />
        </div>
        <div className={styles.bot}>
          <div className={styles.cardValue}>{value}</div>
          <div className={styles.cardUnit}>{unit}</div>
        </div>
      </div>
    </div>
  );
};
