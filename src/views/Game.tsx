import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { Layout, Modal, Tabs } from "antd";
import "antd/dist/antd.css";
import { useContext, useEffect, useState } from "react";
import Countdown from "react-countdown";
import "../App.css";
import logoworldcup from "../assets/world-cup-2022-logo.svg";
import Diagram from "../components/diagram";
import FifaRank from "../components/FifaRank";
import { FirtSignInModal } from "../components/first-sign-in-modals";
import HistoryBet from "../components/History";
import Match from "../components/match/Match";
import Podium from "../components/Podium";
import { SpinWheel } from "../components/spin-wheel";
import UsersRank from "../components/UsersRank";
import { ViewKnockOut } from "../components/ViewKnockOut";
import { AuthContext } from "../context/AuthContext";

import {
  useGetAllUser,
  useGetPredictionsUser,
} from "../hooks/query/user-matches";

import { teamsService } from "../services/teams.services";
import { Footer } from "./footer";
const { Header } = Layout;
function Game() {
  const { auth } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();
  const getPredictionsUser = useGetPredictionsUser(auth.token, auth.document);
  const getAllUser = useGetAllUser(auth.token);

  const authCurrentScore = getAllUser.data?.find(
    (obj: any) => obj._id === auth.document
  )?.score;

  const [service, setService] = useState(new teamsService());
  const [teams, setTeams] = useState();
  const [teamsSelect, setTeamsSelect] = useState();
  const [matches, setMatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(auth.isAdded);
  const [isModalSpinOpen, setIsModalSpinOpen] = useState(true);
  const getTeams = async () => {
    setTeams(await (await service.getTeams(auth.token)).teams);
    setTeamsSelect(await (await service.getTeams(auth.token)).teamsSelect);
  };
  const getMatches = () => {
    service.getMatches(auth.token).then(() => {
      setMatches(service.getMatchesByGroup("A"));
    });
  };
  const onChangeTabGroup = (key: any) => {
    setMatches(service.getMatchesByGroup(key));
  };

  const onChangeRank = (key: any) => {
    console.log(key);
  };
  const countDownDate = new Date("Dec 9, 2022 21:00:00").getTime();

  useEffect(() => {
    getTeams();
    getMatches();
  }, []);
  // const sound = useSound(worldCupTheme);
  // useEffect(() => {
  //   if (sound) sound[0];
  // }, [sound]);
  const listMatches = matches.map((match: any, index: any) => {
    return (
      <Match
        forceRender={true}
        key={index}
        match={match}
        service={service}
        getPredictionsUser={getPredictionsUser}
        getAllUser={getAllUser}
        authCurrentScore={authCurrentScore}
      />
    );
  });

  const items = [
    {
      label: "Bảng A",
      key: "A",
      children: <div className="matches">{listMatches}</div>,
    }, // remember to pass the key prop
    {
      label: "Bảng B",
      key: "B",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: "Bảng C",
      key: "C",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: "Bảng D",
      key: "D",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: "Bảng E",
      key: "E",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: "Bảng F",
      key: "F",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: "Bảng G",
      key: "G",
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: "Bảng H",
      key: "H",
      children: <div className="matches">{listMatches}</div>,
    },
    // {
    //   label: 'Tất cả các trận',
    //   key: 'all',
    //   children: (
    //     <div className="matches">
    //       <AllMatches service={service} />
    //     </div>
    //   ),
    // },
  ];

  const tabsRank = [
    {
      label: "Bet thủ",
      key: "players",
      children: <UsersRank getAllUser={getAllUser} />,
    },
    {
      label: "FIFA",
      key: "fifa",
      children: <FifaRank teams={teams}></FifaRank>,
    },
  ];
  const itemsB = [
    {
      label: "Vòng bảng",
      key: "groups",
      children: (
        <Tabs
          destroyInactiveTabPane={true}
          className="tabs-group"
          onChange={onChangeTabGroup}
          items={items}
        />
      ),
    }, // remember to pass the key prop
    {
      label: "Knock out",
      key: "knock_out",
      children: (
        <>
          <ViewKnockOut
            service={service}
            getPredictionsUser={getPredictionsUser}
            getAllUser={getAllUser}
            authCurrentScore={authCurrentScore}
          />
        </>
      ),
    },
    {
      label: "Sơ đồ giải",
      key: "diagram",
      children: <Diagram dataMatches={service.matches} />,
    },

    {
      label: "Xếp hạng",
      key: "clasifieds",
      children: (
        <Tabs className="tabs-group" onChange={onChangeRank} items={tabsRank} />
      ),
    },
    {
      label: "Lịch sử",
      key: "history",
      children: (
        <>
          <HistoryBet predictionsUser={getPredictionsUser} />
          {/* <img
            src="https://media.ithethao.vn//uploads/2022/10/21/so-do-thi-dau-world-cup-2022-phan-nhanh-knock-out-vck-bong-da-the-gioi_124098.jpg"
            className="w-96 p-10"
          ></img> */}
        </>
      ),
    },
  ];

  const onChangeB = (key: any) => {
    console.log(key);
  };
  const formatter = new Intl.NumberFormat("vi-VN", {
    // style: "currency",
    currency: "VND",
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return (
    <>
      <div className="App bg-cover bg-center md:bg-left select-none">
        <Header className="content-header">
          <h1 className="text-white">{auth.names}</h1>
          <div className="flex gap-8">
            <h2 className="text-white">
              {formatter.format(Number(authCurrentScore))}
            </h2>
            <button
              onClick={() => queryClient.refetchQueries()}
              className="bg-transparent border-0 cursor-pointer text-white mt-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 ${isFetching && "animate-spin"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
        </Header>
        <img src={logoworldcup} alt="" className="img-logo" />
        <div className="container-podium-rank">
          <Podium service={service} teamsSelect={teamsSelect} />
        </div>
        {countDownDate > new Date().getTime() && (
          <div className="count-down md:pl-10 text-yellow-300 font-bold text-center bg-white/10 backdrop-blur-sm w-fit m-auto px-16 py-10 rounded-lg">
            <p className="text-sm blur-none">Close in</p>
            <div className="mt-10">
              {/* {countDown.days}:{countDown.hours}:{countDown.minutes}:
          {countDown.seconds} */}

              <Countdown date={countDownDate} className="text-xl md:text-3xl" />
            </div>
          </div>
        )}
        <Tabs
          className="p-2 md:p-3 tabs-group font-bold"
          onChange={onChangeB}
          items={itemsB}
        />
        <div>
          {/* <audio
            loop
            autoPlay
            onLoad={() => console.log("load")}
            onPlay={() => {
              console.log("play");
            }}
            onCanPlay={(e) => {}}
            id="worldCupTheme"
          >
            <source src="/wc-2010-theme1.ogg" type="audio/ogg" />
            <source src={worldCupTheme} type="audio/mpeg" />
          </audio> */}
        </div>
        <Footer />
      </div>
      <Modal
        footer={[]}
        title="Tink Tink"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <FirtSignInModal auth={auth} authCurrentScore={authCurrentScore} />
      </Modal>
      {/* <Modal
        footer={[]}
        title="Vòng quay may mắn"
        open={isModalSpinOpen}
        onOk={() => {
          setIsModalSpinOpen(false);
        }}
        onCancel={() => {
          setIsModalSpinOpen(false);
        }}
      >
        <SpinWheel />
      </Modal> */}
    </>
  );
}

export default Game;
