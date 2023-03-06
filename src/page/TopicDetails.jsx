import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "../styles/_TopicDetails.module.scss";
import { IoHome } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import { fetchVocaByIDTopic } from "../redux/features/gameSlice";
import fail1 from "../asset/music/fail.mp3";
import success1 from "../asset/music/success.mp3";
const cx = classNames.bind(styles);
const TopicDetails = () => {
  const [one, setOne] = useState({
    test1: "",
    test2: "",
    test3: "",
  });
  let { id } = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVocaByIDTopic(id));
    setOne({
      test1: "",
      test2: "",
      test3: "",
    });
  }, []);
  const data = useSelector((state) => state.topics.vocaByIDTopic);

  const onHome = () => {
    navigator("/");
  };

  const [success, setSuccess] = useState("");
  const landedOn = (e) => {
    if (e.dropData.id === 1) {
      setOne({ ...one, test1: e.dropData.img });
    }
    if (e.dropData.id === 2) {
      setOne({ ...one, test2: e.dropData.img });
    }
    if (e.dropData.id === 3) {
      setOne({ ...one, test3: e.dropData.img });
    }
  };
  const oneArr = Object.values(one);
  let count = 0;
  oneArr.forEach((item, index) => {
    if (item === "") {
    } else {
      count = count + 1;
    }
  });
  const [code, setCode] = useState(3);

  const dropped = (e) => {
    // e.containerElem.style.visibility = "hidden";
  };
  const onDragStart = (e) => {
    setCode(code - 1);
  };

  const [countSuccess, setCountSuccess] = useState(false);
  const onDragEndFail = (e) => {
    console.log("onDragEndFail");
    if (countSuccess) {
      var audio = new Audio(success1);
      audio.play();
    } else {
      var audio = new Audio(fail1);
      audio.play();
    }
    setCountSuccess(false);
  };
  const onDragEnter = (e) => {
    console.log("onDragEnter");
    setCountSuccess(true);
  };
  const onDragLeave = (e) => {
    console.log("onDragLeave");
    setCountSuccess(false);
  };
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const len = data.length / 7;
  return (
    <div className={cx("topic")}>
      <button className={cx("icon")} onClick={onHome}>
        <IoHome />
      </button>
      <div className={cx("row")}>
        {data.slice(start, end).map((item, index) => (
          <DragDropContainer
            targetKey={item.name}
            onDrop={landedOn}
            onDragEnd={onDragEndFail}
            dragData={{ img: item.name, id: index + 1 }}
            onDragStart={() => onDragStart(item.name)}
            key={index}
          >
            <div className={cx("box-img")}>
              <img
                src={`https://resourcesk.bkt.net.vn/ImagesPNG/${item.name}.png`}
                alt=""
              />
            </div>
          </DragDropContainer>
        ))}
      </div>
      <div className={cx("row")}>
        {data.slice(start, end).map((item, index) => {
          console.log(one[0]);
          return (
            <DropTarget
              key={index}
              targetKey={item.name}
              onHit={dropped}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              dropData={{ img: item.name, id: index + 1 }}
            >
              {Object.values(one)[index] !== item.name && (
                <div className={cx("box-text")}>{item.name}</div>
              )}

              {Object.values(one)[index] === item.name && (
                <div className={cx("box-img")}>
                  <img
                    src={`https://resourcesk.bkt.net.vn/ImagesPNG/${item.name}.png`}
                    alt=""
                  />
                </div>
              )}
            </DropTarget>
          );
        })}
      </div>
      <div className={cx("score")}>
        <div className={cx("score__number")}>
          Score: <br />
          {count * 100}
        </div>
        <div className={cx("score__star")}>
          <div className={cx("score__border")}>
            {success === true && "Đúng"}
            {success === false && "Sai"}
            {success === null && ""}
          </div>
          <div className={cx("score__image")}>
            <img
              src="https://resourcesk.bkt.net.vn/plugins/game/GameFlashVocab/star_4.png"
              alt=""
            />
          </div>
          <div className={cx("score__border")}></div>
        </div>
        <div className={cx("score__progress")}>
          Progress:
          <br /> {count} /{data.length}
        </div>
      </div>
    </div>
  );
};

export default TopicDetails;
