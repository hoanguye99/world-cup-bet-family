import 'antd/dist/antd.css';
import '../App.css';
import { useContext, useEffect, useState } from 'react';
import { Tabs, Layout } from 'antd';
import Podium from '../components/Podium';
import Match from '../components/match/Match';
import FifaRank from '../components/FifaRank';
import { teamsService } from '../services/teams.services';
import logoworldcup from '../assets/world-cup-2022-logo.svg';
import { AuthContext } from '../context/AuthContext';
import AllMatches from '../components/AllMatches';
import UsersRank from '../components/UsersRank';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetAllUser,
  useGetPredictionsUser,
} from '../hooks/query/user-matches';
import { Footer } from './footer';

const { Header } = Layout;
function Game() {
  const { auth } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const getPredictionsUser = useGetPredictionsUser(auth.token, auth.document);
  const getAllUser = useGetAllUser(auth.token);

  const authCurrentScore = getAllUser.data?.find(
    (obj) => obj._id === auth.document
  )?.score;

  const [service, setService] = useState(new teamsService());
  const [teams, setTeams] = useState();
  const [teamsSelect, setTeamsSelect] = useState();
  const [matches, setMatches] = useState([]);
  const [group, setGroup] = useState('A');

  const getTeams = async () => {
    setTeams(await (await service.getTeams(auth.token)).teams);
    setTeamsSelect(await (await service.getTeams(auth.token)).teamsSelect);
  };
  const getMatches = () => {
    service.getMatches(auth.token).then(() => {
      setMatches(service.getMatchesByGroup('A'));
    });
  };
  const onChangeTabGroup = (key: any) => {
    setMatches(service.getMatchesByGroup(key));
  };

  const onChangeRank = (key: any) => {
    console.log(key);
  };
  useEffect(() => {
    getTeams();
    getMatches();
  }, []);

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
      label: 'Bảng A',
      key: 'A',
      children: <div className="matches">{listMatches}</div>,
    }, // remember to pass the key prop
    {
      label: 'Bảng B',
      key: 'B',
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: 'Bảng C',
      key: 'C',
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: 'Bảng D',
      key: 'D',
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: 'Bảng E',
      key: 'E',
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: 'Bảng F',
      key: 'F',
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: 'Bảng G',
      key: 'G',
      children: <div className="matches">{listMatches}</div>,
    },
    {
      label: 'Bảng H',
      key: 'H',
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
      label: 'Bet thủ',
      key: 'players',
      children: <UsersRank service={service} />,
    },
    { label: 'FIFA', key: 'fifa', children: <FifaRank teams={teams} /> }, // remember to pass the key prop
  ];
  const itemsB = [
    {
      label: 'Vòng bảng',
      key: 'groups',
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
      label: 'Vòng loại',
      key: 'Finals',
      children: (
        <div className="in-develop">
          <h1>Đang phát triển</h1>
          <img
            src="https://media4.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
            alt=""
          />
        </div>
      ),
    },
    {
      label: 'Xếp hạng',
      key: 'clasifieds',
      children: (
        <Tabs className="tabs-group" onChange={onChangeRank} items={tabsRank} />
      ),
    },
  ];

  const onChangeB = (key: any) => {
    console.log(key);
  };

  return (
    <div className="App">
      <Header className="content-header">
        <h1>FIS ESS {auth.names}</h1>
        <div className="flex gap-8">
          <h2>{authCurrentScore} điểm</h2>
          <button onClick={() => queryClient.refetchQueries()} className="bg-transparent border-0 cursor-pointer text-white mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
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
      <Tabs className="tabs-group" onChange={onChangeB} items={itemsB} />
      <Footer />
    </div>
  );
}

export default Game;
