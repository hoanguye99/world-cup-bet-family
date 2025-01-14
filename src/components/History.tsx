import { Table } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { Spinner } from "./icon";

function HistoryBet(props: any) {
  const [predictionsUser, setPredictionsUser] = useState([]);

  useEffect(() => {
    let arr = props.predictionsUser.data
      .slice()
      .reverse()
      .map((val: any) => ({
        id_match: val.match_id,
        match: {
          local_img: val.match.local_team.image,
          visiting_img: val.match.visiting_team.image,
        },
        bet: {
          local_name: val.match.local_team.name,
          visiting_name: val.match.visiting_team.name,
          win_bet: val.bets?.winBet?.value,
          betWin:
            val.match.has_played === false ||
            val.match.has_played === null ||
            val.match.local_team.result === null ||
            val.match.visiting_team.result === null
              ? // val.bets.winBet?.value === null ||
                // val.bets.winBet?.value === undefined
                null
              : (val.match.local_team?.result >
                  val.match.visiting_team.result &&
                  val.bets.winBet?.value === "local") ||
                (val.match.local_team?.result ===
                  val.match.visiting_team?.result &&
                  val.bets.winBet?.value === "tie") ||
                (val.match.local_team?.result <
                  val.match.visiting_team.result &&
                  val.bets.winBet?.value === "visitor")
              ? "Win"
              : "Lose",
        },
        score_bet: {
          local: val.bets?.scoreBet?.localBet ?? null,
          visitor: val.bets?.scoreBet?.visitorBet ?? null,
          betScore:
            val.match.has_played === undefined ||
            val.match.has_played === false ||
            val.match.has_played === null ||
            val.match.local_team.result === null ||
            val.match.visiting_team.result === null
              ? null
              : val.bets.scoreBet === undefined
              ? null
              : val.bets?.scoreBet?.localBet === val.match.local_team.result &&
                val.bets?.scoreBet?.visitorBet ===
                  val.match.visiting_team.result
              ? "Win"
              : "Lose",
        },
        betAmount:
          Number(val.bets?.winBet?.betAmount ?? 0) +
          Number(val.bets?.scoreBet?.betAmount ?? 0),

        changed: {
          has_played: val.match.has_played ?? false,
          result: val.changed ?? 0,
        },
      }));
    setPredictionsUser(arr);
  }, [props.predictionsUser]);
  const formatter = new Intl.NumberFormat("vi-VN", {
    // style: "currency",
    currency: "VND",
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    notation: "compact",
  });
  const columns = [
    // {
    //   dataIndex: "id_match",
    //   key: "id_match",
    //   render: (text: any) => <a>{text}</a>,
    // },
    {
      dataIndex: "match",
      key: "match",
      title: "Trận",
      render: (match: any) => (
        <div className="flex justify-center ">
          <div className="w-8 h-8 md:w-16 md:h-16 relative">
            <img
              src={match.local_img}
              className="absolute w-6 md:w-12 md:h-auto z-10 left-0 top-0"
            ></img>
            <img
              src={match.visiting_img}
              className="absolute w-6 md:w-12 z-20 right-0 bottom-0"
            ></img>
          </div>
        </div>
      ),
    },
    {
      dataIndex: "bet",
      title: "Đặt",
      render: (bet: any) => (
        <div className="flex justify-center items-center text-sm md:text-base text-white">
          <div
            className={`text-center ${
              bet.betWin === "Win"
                ? "text-green-500"
                : bet.betWin === "Lose"
                ? "text-pink-300"
                : ""
            }`}
          >
            <span>{bet.win_bet === "local" && bet.local_name}</span>
            <span>{bet.win_bet === "visitor" && bet.visiting_name}</span>
            <span>{bet.win_bet === "tie" && "Hòa"}</span>
            <span className="text-gray-400">{!bet.win_bet && "___"} </span>
          </div>
        </div>
      ),
    },
    {
      dataIndex: "score_bet",
      title: "Đặt tỉ số",
      render: (score_bet: any) => (
        <div className="flex justify-center gap-1 text-sm md:text-base items-center text-white">
          {score_bet.local !== null && score_bet.visitor !== null ? (
            <div
              className={`text-center ${
                score_bet.betScore === "Win"
                  ? "text-green-500"
                  : score_bet.betScore === "Lose"
                  ? "text-pink-300"
                  : ""
              }`}
            >
              <span className="text-center">{score_bet.local ?? 0}</span>
              <span className="text-center">-</span>
              <span className="text-center">{score_bet.visitor ?? 0}</span>
            </div>
          ) : (
            <span className="text-gray-400">___</span>
          )}
        </div>
      ),
    },
    {
      dataIndex: "changed",
      title: "Biến động",
      render: (changed: any) => (
        <div
          className={`text-white text-center md:text-base
        ${
          changed.result > 0
            ? "text-green-500"
            : changed.result < 0
            ? "text-pink-300"
            : "text-gray-400"
        }`}
        >
          {changed.result > 0 && "+"}
          {formatter.format(Number(changed.result))}
        </div>
      ),
    },
    // {
    //   dataIndex: "result",
    //   title: "Kết quả",
    //   render: (text: any) => (
    //     <div className="text-white uppercase text-sm md:text-base">
    //       {!text.has_played && (
    //         <div className="w-10">
    //           <Spinner />
    //         </div>
    //       )}
    //       {text.has_played && (
    //         <div className="gap-1 break-words">
    //           {text.betWin ?? "--"} / {text.betScore ?? "__"}
    //         </div>
    //       )}
    //     </div>
    //   ),
    // },
  ];
  return (
    <div className="container-fifa-rank">
      <Table
        columns={columns}
        dataSource={predictionsUser}
        pagination={false}
      />
    </div>
  );
}

export default HistoryBet;
