import { Divider, InputNumber, Modal, notification, Table } from 'antd';
import {
  useGetAllUser,
  useGetPredictionsMatch,
  userMatchesKeys,
} from '../../hooks/query/user-matches';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import {
  UserPrediction,
  UserShort,
} from '../../services/user-matches.services';
import { useQueryClient } from '@tanstack/react-query';
import { UseQueryResult } from '@tanstack/react-query';
import { debounce } from "lodash"


interface WinPredictModalProps {
  token: any;
  service: any;
  match: any;
  matchPrediction: UserPrediction | undefined;
  showModal: boolean;
  closeModal: () => void;
  getAllUser: UseQueryResult<UserShort[], unknown>;
  getPredictionsMatch: UseQueryResult<UserPrediction[], unknown>;
  authCurrentScore: number | undefined
}

const WinPredictModal = (props: WinPredictModalProps) => {
  const queryClient = useQueryClient();

  const dataSource = props.getPredictionsMatch.data
    ?.filter((userPrediction) => userPrediction.bets?.winBet?.value || userPrediction.bets?.winBet?.betAmount)
    .map((userPrediction) => {
      let teamName;
      switch (userPrediction.bets?.winBet?.value) {
        case 'local':
          teamName = props.match.local_team.name;
          break;
        case 'visitor':
          teamName = props.match.visiting_team.name;
          break;
        case 'tie':
          teamName = 'Hòa';
          // code block
          break;
      }

      return {
        names: props.getAllUser.data?.find(
          (obj) => obj._id === userPrediction.user_id
        )?.names,
        result: teamName,
        value: userPrediction.bets?.winBet?.betAmount,
      };
    });

  const columns = [
    {
      title: 'Bet thủ',
      dataIndex: 'names',
      key: 'names',
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
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

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    const payload = {
      match_id: props.match._id,
      value: e.target.value,
      betAmount: props.matchPrediction?.bets?.winBet?.betAmount ?? null,
    };
    props.service
      .betWinner(props.token, payload)
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
  };

  return (
    <Modal
      title="Dự đoán kết quả"
      open={props.showModal}
      onOk={props.closeModal}
      onCancel={props.closeModal}
    >
      <h1>Dự đoán của tôi</h1>
      <Radio.Group
        className="w-full flex flex-col items-center gap-6"
        onChange={onChange}
        disabled={new Date() > new Date(props.match.date)}
        defaultValue={props.matchPrediction?.bets?.winBet?.value}
      >
        <Radio className="flex items-center gap-5" value={'local'}>
          <div className="flex items-center gap-5">
            <img src={props.match.local_team.image} alt="" />
            <h2>{props.match.local_team.name}</h2>
          </div>
        </Radio>

        <Radio className="flex items-center gap-5" value={'visitor'}>
          <div className="flex items-center gap-5">
            <img src={props.match.visiting_team.image} alt="" />
            <h2> {props.match.visiting_team.name} </h2>
          </div>
        </Radio>
        <Radio className="flex items-center gap-5" value={'tie'}>
          <div className="flex items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
              />
            </svg>

            <h2> Hòa </h2>
          </div>
        </Radio>
      </Radio.Group>
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
          max={1000000}
          defaultValue={props.matchPrediction?.bets?.winBet?.betAmount}
          // value={matchPrediction?.bets.scoreBet.visitorBet}
          disabled={new Date() > new Date(props.match.date) ||  (props.authCurrentScore !== undefined && props.authCurrentScore < 0)}
          onChange={debounce((ev: any) => {
            const payload = {
              match_id: props.match._id,
              value: props.matchPrediction?.bets?.winBet?.value ?? null,
              betAmount: ev,
            };
            props.service
              .betWinner(props.token, payload)
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
          }, 400)}
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

export default WinPredictModal;
