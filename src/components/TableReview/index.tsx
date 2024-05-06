import React, { useState, useEffect } from "react";
import { IReview, IData1Item, IData2Item } from "../../types/data";
import style from "./style.module.scss";

const TableReview: React.FC = () => {
  const [data1, setData1] = useState<IData1Item[]>([]);
  const [data2, setData2] = useState<IData2Item[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response1 = await fetch(
        "http://www.filltext.com/?rows=50&id=%7bnumber|1000%7d&userId=%7bnumber|15%7d&reviewText=%7blorem|32%7d&reviewType=%7bnumber|1%7d&delay=5"
      );
      const response2 = await fetch(
        "http://www.filltext.com/?rows=12&userId=%7bnumber|12%7d&firstName=%7bfirstName%7d&lastName=%7blastName%7d"
      );
      const data1 = await response1.json();
      const data2 = await response2.json();

      setData1(data1);
      setData2(data2);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data1.length > 0 && data2.length > 0) {
      const mergedReviews = mergeData(data1, data2);
      setReviews(mergedReviews);
    }
  }, [data1, data2]);

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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={style.container}>
      <div className={style.switch}>
        <select
          defaultValue={"time"}
          id="sort"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="time">Сначала новые</option>
          <option value="type">Сначала положительные</option>
          <option value="name">Сначала с именем пользователя</option>
        </select>
      </div>
      <div className={style.table}>
        <div className={style.table_row}>
          <div className={style.cell_index}>Индекс ревью</div>
          <div className={style.cell_type}>Тип ревью</div>
          <div className={style.cell_text}>Текст ревью</div>
          <div className={style.cell_name}>Фамилия и имя пользователя</div>
        </div>
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
            <div key={index} className={style.table_row}>
              <div className={style.cell_index}>{index + 1}</div>
              {item.reviewType === 0 ? (
                <div className={style.cell_type_m}>отрицательный</div>
              ) : (
                <div className={style.cell_type_p}>положительный</div>
              )}
              <div className={style.cell_text}>{item.reviewText}</div>
              {item.lastName ? (
                <div className={style.cell_name}>
                  {item.firstName} &nbsp;
                  {item.lastName}
                </div>
              ) : (
                <div className={style.cell_noname}>пользователь не найден</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TableReview;
