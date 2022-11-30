import Tabs from "antd/lib/tabs";
import { useEffect, useState } from "react";
import Match from "./match/Match";
import liveIcon from "../assets/live-streaming-icon.png";
export const ViewKnockOut = (props: any) => {
  const [matches, setMatches] = useState([]);
  const [group, setGroup] = useState("ROUND_OF_16");
  const onChangeTabGroup = (key: any) => {
    setGroup(key);
  };
  useEffect(() => {
    setMatches(props.service.getMatchesByGroup(group));
  }, [group]);
  const listMatches = matches.map((match: any, index: any) => {
    return (
      <Match
        forceRender={true}
        key={index}
        match={match}
        service={props.service}
        getPredictionsUser={props.getPredictionsUser}
        getAllUser={props.getAllUser}
        authCurrentScore={props.authCurrentScore}
      />
    );
  });
  const itemsKnockOut = [
    {
      label: "Vòng 1/8",
      key: "ROUND_OF_16",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: "Tứ kết",
      key: "QUARTER_FINAL",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: "Bán kết",
      key: "SEMI_FINAL",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: "Tranh hạng ba",
      key: "THIRD_PLACE",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: "Chung kết",
      key: "FINAL",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: (
        <>
          {/* <img src={liveIcon} className="w-5 bg-white p-[2px] rounded-full" />{" "} */}
          Trực tiếp
        </>
      ),
      key: "Stream",
      children: (
        <div className="w-full h-full">
          {/* <iframe
            src="https://vtv.vn/truyen-hinh-truc-tuyen/vtv2.htm"
            title="Live stream VTV2"
            className="w-full h-screen bg-white"
          ></iframe> */}
          <div className="in-develop">
            <h1>Đang phát triển</h1>
            <img
              src="https://media4.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
              alt=""
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <Tabs
        destroyInactiveTabPane={true}
        className="tabs-knock-out"
        onChange={onChangeTabGroup}
        items={itemsKnockOut}
      />
    </>
  );
};
