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
  const [one, setOne] = useState({});
  let { id } = useParams();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.topics.vocaByIDTopic);
  useEffect(() => {
    dispatch(fetchVocaByIDTopic(id));
  }, [dispatch, id]);

  const onHome = () => {
    navigator("/");
  };

  const [success, setSuccess] = useState("");
  const landedOn = (e) => {
    if (e.dropData.id === e.dragData.id) {
      setOne({ ...one, [e.dropData.id]: e.dropData.img });
    }
  };
  console.log(one);
  const oneArr = Object.values(one);
  let count = 0;
  oneArr.forEach((item, index) => {
    if (item === "") {
    } else {
      count = count + 1;
    }
  });

  const dropped = (e) => {
    e.containerElem.style.visibility = "hidden";
  };

  const [countSuccess, setCountSuccess] = useState(false);
  const onDragEndFail = (e) => {
    console.log(e);
    if (countSuccess) {
      var audio = new Audio(success1);
      audio.play();
      setSuccess(true);
    } else {
      var audio = new Audio(fail1);
      audio.play();
      setSuccess(false);
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
  const onDrag = (e) => {};
  const onDragStart = (e) => {
    setSuccess("");
  };
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const [img, setImage] = useState(
    "https://resourcesk.bkt.net.vn/plugins/game/GameFlashVocab/star_4.png"
  );
  const [tranfrom, setTranfrom] = useState(0);
  console.log(tranfrom);
  const len = data.length / 3;
  useEffect(() => {
    for (let index = 1; index < len; index++) {
      if (count === 3 * index) {
        setStart(3 * index);
        setEnd(3 * index + 3);
        if (tranfrom === 0) {
          setTranfrom(870);
        } else {
          setTranfrom(870 * index);
        }
      }
    }
    for (let index = 0; index < len; index++) {
      if (count === len) {
        setImage(
          "https://resourcesk.bkt.net.vn/plugins/game/GameFlashVocab/star_3.png"
        );
      }
      if (count === len * 2) {
        setImage(
          "https://resourcesk.bkt.net.vn/plugins/game/GameFlashVocab/star_2.png"
        );
      }
      if (count === len * 3) {
        setImage(
          "https://resourcesk.bkt.net.vn/plugins/game/GameFlashVocab/star_1.png"
        );
        navigator(`/topic`);
      }
    }
  }, [count, len, navigator, tranfrom]);
  const styles = {
    transform: `translateX(-${tranfrom}px)`,
  };
  return (
    <div className={cx("topic")}>
      <button className={cx("icon")} onClick={onHome}>
        <IoHome />
      </button>
      <div className={cx("background")}>
        <div className={cx("row")} style={styles}>
          {data.map((item, index) => (
            <DragDropContainer
              targetKey={item.name}
              onDrop={landedOn}
              onDrag={onDrag}
              onDragStart={onDragStart}
              onDragEnd={onDragEndFail}
              dragData={{ img: item.name, id: item.idvocabulary + 1 }}
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
        <div className={cx("row")} style={styles}>
          {data.map((item, index) => {
            return (
              <DropTarget
                key={index}
                targetKey={item.name}
                onHit={dropped}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                dropData={{ img: item.name, id: item.idvocabulary + 1 }}
              >
                {oneArr[index] !== item.name && (
                  <div className={cx("box-text")}>{item.name}</div>
                )}
                {oneArr[index] === item.name && (
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
            <img src={img} alt="" />
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
