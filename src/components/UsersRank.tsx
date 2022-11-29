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
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
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
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Tích lũy",
      dataIndex: "score",
      key: "score",
      render: (text: any) => (
        <a>
          {text > 1000 ? formatter.format(Number(text / 1000)) + "K" : text}
        </a>
      ),
    },
  ];

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
