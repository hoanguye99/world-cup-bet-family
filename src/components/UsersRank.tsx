import { UseQueryResult } from "@tanstack/react-query";
import { Table } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import rank1 from "../assets/rank1.png";
import rank2 from "../assets/rank2.png";
import rank3 from "../assets/rank3.png";
import { UserShort } from "../services/user-matches.services";
interface UsersRankProps {
  getAllUser: UseQueryResult<UserShort[], unknown>;
}

function UsersRank(props: UsersRankProps) {
  const [data, setData] = useState<any[] | undefined>(undefined);
  const formatter = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    maximumFractionDigits: 5,
    notation: "compact",
  });
  useEffect(() => {
    if (props.getAllUser.data) {
      setData(
        props.getAllUser.data
          .map((e: any, index: number) => {
            let countBets = 0;
            let sumBets = 0;
            sumBets = e.bets.reduce((sum: number, b: any) => {
              return sum + getPoint(b);
            }, 0);
            countBets = e.bets.reduce((sum: number, b: any) => {
              return sum + getCountBet(b);
            }, 0);

            return {
              name: e.names,
              score: e.score,
              bets: {
                count: countBets,
                result:
                  countBets > 0 ? ((sumBets / countBets) * 100).toFixed(0) : 0,
              },
            };
          })
          .sort((a: any, b: any) => {
            if ((a.bets.count ?? 0) <= 0) {
              return 1;
            }
            if ((b.bets.count ?? 0) <= 0) {
              return -1;
            }
            if (b.score === a.score) return b.bets.result - a.bets.result;
            return b.score - a.score;
          })
      );
    }
  }, [props.getAllUser.data]);
  const columns = [
    {
      title: "Hạng",
      dataIndex: "",
      key: "indexs",
      render: (value: any, record: any, index: number) => {
        if (index === 0)
          return <img src={rank1} alt="" className="w-10 h-10" />;
        if (index === 1)
          return <img src={rank2} alt="" className="w-10 h-10" />;
        if (index === 2)
          return <img src={rank3} alt="" className="w-10 h-10" />;
        return (
          <div className="text-center w-10 text-white text-lg">{index + 1}</div>
        );
      },
    },
    {
      title: "Bet thủ",
      dataIndex: "name",
      key: "name",
      render: (text: any) => (
        <div className="text-center text-white">{text}</div>
      ),
    },
    {
      title: "Tỉ lệ thắng",
      dataIndex: "bets",
      key: "bets",
      render: (bets: any) => {
        return (
          <div className="text-center text-white">
            {/* <div>{bets.count}</div> */}
            {bets.result}%
          </div>
        );
      },
    },
    {
      title: "Tích lũy",
      dataIndex: "score",
      key: "score",
      render: (text: any) => (
        <div className="text-center text-white md:pl-3">
          {formatter.format(Number(text))}
          {/* {text} */}
        </div>
      ),
    },
  ];
  let getPoint = (val: any) => {
    if (
      val.match.has_played === undefined ||
      val.match.has_played === false ||
      val.match.has_played === null ||
      val.match.local_team.result === null ||
      val.match.visiting_team.result === null
    )
      return 0;
    let point = 0;
    if (
      (val.match.local_team.result > val.match.visiting_team.result &&
        (val.bets.winBet?.value ?? "") === "local") ||
      (val.match.local_team.result === val.match.visiting_team.result &&
        (val.bets.winBet?.value ?? "") === "tie") ||
      (val.match.local_team.result < val.match.visiting_team.result &&
        (val.bets.winBet?.value ?? "") === "visitor")
    )
      point++;
    if (
      val.bets?.scoreBet?.localBet === val.match.local_team.result &&
      val.bets?.scoreBet?.visitorBet === val.match.visiting_team.result
    )
      point++;

    return point;
  };
  let getCountBet = (val: any) => {
    if (
      val.match.has_played === false ||
      val.match.has_played === null ||
      val.match.local_team.result === null ||
      val.match.visiting_team.result === null
    )
      return 0;
    let point = 0;
    if (val.bets.winBet?.value !== undefined || val.bets.winBet?.value !== null)
      point++;
    if (
      val.bets?.scoreBet?.localBet !== undefined &&
      val.bets?.scoreBet?.visitorBet !== undefined
    )
      point++;

    return point;
  };
  // setData(props.getAllUser.data.sort((a:any,b:any)=> b.score - a.score))

  return (
    <div className="container-fifa-rank">
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}

export default UsersRank;
