import Tabs from "antd/lib/tabs";
import { useEffect, useState } from "react";
import Match from "./match/Match";
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
      label: "Trực tiếp",
      key: "Stream",
      children: (
        <div className="w-full h-full">
          <iframe
            src="https://www.scorebat.com/embed/livescore/"
            frameBorder="0"
            width="600"
            height="760"
            allowFullScreen
            allow="autoplay; fullscreen"
            // style="width:100%;height:760px;overflow:hidden;display:block;"
            className="w-full bg-transparent"
          ></iframe>
          {/* <script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https://www.scorebat.com/embed/embed.js?v=arrv'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));</script> */}
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
