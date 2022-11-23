import { Divider, InputNumber, Modal, notification, Table } from 'antd';
import {
  useGetAllUser,
  useGetPredictionsMatch,
  userMatchesKeys,
} from '../../hooks/query/user-matches';
import {
  UserPrediction,
  UserShort,
} from '../../services/user-matches.services';
import { useQueryClient } from '@tanstack/react-query';
import { UseQueryResult } from '@tanstack/react-query';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';

interface ScorePredictModalProps {
  token: any;
  service: any;
  match: any;
  matchPrediction: UserPrediction | undefined;
  showModal: boolean;
  closeModal: () => void;
  getAllUser: UseQueryResult<UserShort[], unknown>;
  getPredictionsMatch: UseQueryResult<UserPrediction[], unknown>;
  authCurrentScore: number | undefined;
}

const ScorePredictModal = (props: ScorePredictModalProps) => {
  // const { auth } = useContext(AuthContext);

  const dataSource = props.getPredictionsMatch.data
    ?.filter((userPrediction) => userPrediction.bets?.scoreBet?.localBet)
    .map((userPrediction) => ({
      names: props.getAllUser.data?.find(
        (obj) => obj._id === userPrediction.user_id
      )?.names,
      score: `${userPrediction.bets.scoreBet.localBet} - ${userPrediction.bets.scoreBet.visitorBet}`,
      value: userPrediction.bets.scoreBet.betAmount,
    }));

  const queryClient = useQueryClient();

  const columns = [
    {
      title: 'Bet thủ',
      dataIndex: 'names',
      key: 'names',
    },
    {
      title: 'Tỉ số',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Cược',
      dataIndex: 'value',
      key: 'value',
    },
    // {
    //   dataIndex: 'name',
    //   key: 'name',
    //   render: (text:any) => <a>{text}</a>
    // },
  ];

  return (
    <Modal
      title="Dự đoán tỉ số"
      open={props.showModal}
      onOk={props.closeModal}
      onCancel={props.closeModal}
    >
      <h1>Dự đoán của tôi</h1>
      <div className="modal-my-result">
        <img src={props.match.local_team.image} alt="" />
        <h2>{props.match.local_team.name}</h2>
        <InputNumber
          size="middle"
          min={0}
          max={100000}
          defaultValue={props.matchPrediction?.bets?.scoreBet?.localBet}
          // value={matchPrediction?.bets.scoreBet.localBet}
          disabled={new Date() > new Date(props.match.date)}
          onChange={(ev: any) => {
            const payload = {
              match_id: props.match._id,
              localBet: ev,
              visitorBet: props.matchPrediction?.bets?.scoreBet?.visitorBet ?? null,
              betAmount: props.matchPrediction?.bets?.scoreBet?.betAmount ?? null,
            };
            props.service
              .betScore(props.token, payload)
              .then((res: any) => {
                queryClient.invalidateQueries(
                  userMatchesKeys.getPredictionsMatch(props.match._id)
                );
                queryClient.invalidateQueries(userMatchesKeys.getAllUser());
                queryClient.invalidateQueries(userMatchesKeys.getPredictionsUser());
              })
              .catch((err: any) => {
                notification.error({
                  message: 'Error',
                });
              });
          }}
        />
      </div>
      <div className="modal-my-result">
        <img src={props.match.visiting_team.image} alt="" />
        <h2> {props.match.visiting_team.name} </h2>
        <InputNumber
          size="middle"
          min={0}
          max={100000}
          defaultValue={props.matchPrediction?.bets?.scoreBet?.visitorBet}
          // value={matchPrediction?.bets.scoreBet.visitorBet}
          disabled={new Date() > new Date(props.match.date)}
          onChange={(ev: any) => {
            const payload = {
              match_id: props.match._id,
              localBet: props.matchPrediction?.bets?.scoreBet?.localBet ?? null,
              visitorBet: ev,
              betAmount: props.matchPrediction?.bets?.scoreBet?.betAmount ?? null,
            };
            props.service
              .betScore(props.token, payload)
              .then((res: any) => {
                queryClient.invalidateQueries(
                  userMatchesKeys.getPredictionsMatch(props.match._id)
                );
                queryClient.invalidateQueries(userMatchesKeys.getAllUser());
                queryClient.invalidateQueries(userMatchesKeys.getPredictionsUser());
              })
              .catch((err: any) => {
                notification.error({
                  message: 'Error',
                });
              });
          }}
        />
      </div>
      <div className="modal-my-result">
        <h2 className="flex items-center gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-9 h-9 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Điểm cược</span>
        </h2>
        <InputNumber
          size="large"
          min={0}
          max={props.authCurrentScore}
          defaultValue={props.matchPrediction?.bets?.scoreBet?.betAmount}
          // value={matchPrediction?.bets.scoreBet.visitorBet}
          disabled={new Date() > new Date(props.match.date)}
          onChange={(ev: any) => {
            const payload = {
              match_id: props.match._id,
              localBet: props.matchPrediction?.bets?.scoreBet?.localBet ?? null,
              visitorBet: props.matchPrediction?.bets?.scoreBet?.visitorBet ?? null,
              betAmount: ev,
            };
            props.service
              .betScore(props.token, payload)
              .then((res: any) => {
                queryClient.invalidateQueries(
                  userMatchesKeys.getPredictionsMatch(props.match._id)
                );
                queryClient.invalidateQueries(userMatchesKeys.getAllUser());
                queryClient.invalidateQueries(userMatchesKeys.getPredictionsUser());
              })
              .catch((err: any) => {
                notification.error({
                  message: 'Error',
                });
              });
          }}
        />
      </div>
      <h1 className="mt-6">Dự đoán ESS</h1>
      <div>
        <div className="container-fifa-rank table-special-01">
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
      </div>
    </Modal>
  );
};

export default ScorePredictModal;
