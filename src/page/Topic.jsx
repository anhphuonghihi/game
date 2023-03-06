import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTopic } from "../redux/features/gameSlice";

import classNames from "classnames/bind";
import styles from "../styles/_Topic.module.scss";
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const Topic = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTopic());
  }, [dispatch]);

  const onHome = () => {
    navigator("/");
  };
  const { data } = useSelector((state) => state.topics.topic);
  const onDetalisTopic = (id) => {
    navigator(`/topic/${id}`);
  };

  return (
    <div className={cx("topic")}>
      <button className={cx("icon")} onClick={onHome}>
        <IoHome />
      </button>
      <div className={cx("background")}>
        <div className={cx("container")}>
          <h1 className={cx("title")}>Select Topic</h1>
          <div className={cx("content")}>
            {data &&
              data.slice(0, data.length).map((item, index) => (
                <button
                  key={index}
                  className={cx("box")}
                  style={{
                    backgroundImage: `url(https://resourcesk.bkt.net.vn/ImagesPNG/${item.image}.png)`,
                  }}
                  onClick={() => onDetalisTopic(item.idtopic)}
                >
                  <h3>{item.name}</h3>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
