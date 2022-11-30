import { Row, Table } from "antd";
import "antd/dist/antd.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { UseQueryResult } from "@tanstack/react-query";
import { UserShort } from "../services/user-matches.services";
import rank1 from "../assets/rank1.png";
import rank2 from "../assets/rank2.png";
import rank3 from "../assets/rank3.png";
interface UsersRankProps {
  getAllUser: UseQueryResult<UserShort[], unknown>;
}

function UsersRank(props: UsersRankProps) {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState<UserShort[] | undefined>(undefined);
  const formatter = new Intl.NumberFormat("vi-VN", {
    // style: "currency",
    currency: "VND",
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
    notation: "compact",
  });
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
      dataIndex: "names",
      key: "names",
      render: (text: any) => <span className="text-white">{text}</span>,
    },
    {
      title: "Tỉ lệ thắng",
      dataIndex: "bets",
      key: "bets",
      render: (bets: any) => {
        let countBets = 0;
        let sumBets = 0;
        sumBets = bets.reduce((sum: number, b: any) => {
          return sum + getPoint(b);
        }, 0);
        countBets = bets.reduce((sum: number, b: any) => {
          return sum + getCountBet(b);
        }, 0);

        return (
          <span className="text-white md:pl-3">
            {countBets > 0 ? ((sumBets / countBets) * 100).toFixed(0) : 0}%
          </span>
        );
      },
    },
    {
      title: "Tích lũy",
      dataIndex: "score",
      key: "score",
      render: (text: any) => (
        <span className="text-white md:pl-3">
          {text > 1000 ? formatter.format(Number(text)) : text}
        </span>
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
  useEffect(() => {
    if (props.getAllUser.data) {
      setData(
        props.getAllUser.data.sort((a: any, b: any) => b.score - a.score)
      );
    }
  }, [props.getAllUser.data]);

  return (
    <div className="container-fifa-rank">
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}

export default UsersRank;
