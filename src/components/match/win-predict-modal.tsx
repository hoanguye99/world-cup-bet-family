import { InputNumber, Modal } from "antd";
import { UserPrediction } from "../../services/user-matches.services";

interface WinPredictModalProps {
  match: any;
  matchPrediction: UserPrediction | undefined;
  showModal: boolean;
  closeModal: () => void;
}

const WinPredictModal = (props: WinPredictModalProps) => {
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
        <p>{props.matchPrediction?.bets.scoreBet.localBet}</p>
        <InputNumber
          size="middle"
          min={0}
          max={100000}
          defaultValue={props.matchPrediction?.bets.scoreBet.localBet}
          // value={matchPrediction?.bets.scoreBet.localBet}
          disabled={new Date() > new Date(props.match.date)}
          status={props.matchPrediction !== undefined ? '' : 'error'}
          // onChange={(ev:any)=>{
          //   setLocalStore(ev)
          //   const payload={
          //     _id: props.match._id,
          //     local_score: ev,
          //     visitor_score:visitorScore
          //   }
          //   props.service.updateMatch(auth.token,auth.document,props.match._id,payload).then((res:any)=>{
          //     authDispatch({
          //       type:"UPDATE_MATCH",
          //       payload

          //     })
          //   }).catch((err:any)=>{
          //     notification.error({
          //       message: 'Error',
          //       description:
          //         showError(err.response),
          //     });
          //   })
          // }}
        />
      </div>
      <div className="modal-my-result">
        <img src={props.match.visiting_team.image} alt="" />
        <h2> {props.match.visiting_team.name} </h2>
        <InputNumber
          size="middle"
          min={0}
          max={100000}
          defaultValue={props.matchPrediction?.bets.scoreBet.visitorBet}
          // value={matchPrediction?.bets.scoreBet.visitorBet}
          status={props.matchPrediction !== undefined ? '' : 'error'}
          disabled={new Date() > new Date(props.match.date)}
          // onChange={(ev:any)=>{
          //   setVisitorScore(ev)
          //   const payload={
          //     _id: props.match._id,
          //     local_score: localScore,
          //     visitor_score:ev
          //   }
          //   props.service.updateMatch(auth.token,auth.document,props.match._id,payload).then((res:any)=>{
          //     authDispatch({
          //       type:"UPDATE_MATCH",
          //       payload
          //     })
          //   }).catch((err:any)=>{
          //     notification.error({
          //       message: 'Error',
          //       description:
          //         showError(err.response),
          //     });
          //   })
          // }}
        />
      </div>
    </Modal>
  );
};

export default WinPredictModal;
