import React, { useState, useEffect } from "react";
import { IReview, IData1Item, IData2Item } from "../../types/data";
import style from "./style.module.scss";

interface IRowReviewsProps {
  sort: string;
  reviews: IReview[];
}
const RowReview: React.FC = ({ sort, reviews }: IRowReviewsProps) => {
  const mergeData = (data1: IData1Item[], data2: IData2Item[]): IReview[] => {
    const userIdSet = new Set(data1.map((item) => item.userId));
    return data1.map((item) => {
      const matchingItem = data2.find(
        (data2Item) => data2Item.userId === item.userId
      );
      return {
        ...item,
        ...(matchingItem && {
          firstName: matchingItem.firstName,
          lastName: matchingItem.lastName,
        }),
      };
    });
  };

  return (
    <div className={style.table}>
      {reviews
        .sort((a, b) =>
          sort === "type"
            ? b.reviewType - a.reviewType
            : sort === "time"
            ? b.id - a.id
            : sort === "name"
            ? a.firstName
              ? -1
              : 1
            : 0
        )
        .map((item, index) => (
          <div key={index} className={style.row}>
            <div className={style.number}>{index + 1}</div>
            {item.reviewType === 0 ? (
              <div className={style.type_m}>отрицательный</div>
            ) : (
              <div className={style.type_p}>положительный</div>
            )}
            <div className={style.text}>{item.reviewText}</div>
            {item.lastName ? (
              <div className={style.name}>
                {item.firstName} &nbsp;
                {item.lastName}
              </div>
            ) : (
              <div className={style.noname}>пользватель не найден</div>
            )}
          </div>
        ))}
    </div>
  );
};

export default RowReview;
