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
import { useGetAllUser, useGetPredictionsUser } from '../hooks/query/user-matches';
import { Footer } from './footer';

const { Header } = Layout;
function Game() {
  const { auth } = useContext(AuthContext);

  const getPredictionsUser = useGetPredictionsUser(auth.token, auth.document);
  useGetAllUser(auth.token)

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
      <Match forceRender={true} key={index} match={match} service={service} getPredictionsUser={getPredictionsUser} />
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
        <h2>{auth.score} điểm</h2>
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
