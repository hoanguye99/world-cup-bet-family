import "antd/dist/antd.css";
import { useContext, useEffect, useState } from "react";
import { Button, InputNumber, Modal, notification } from "antd";
import { AuthContext } from "../../context/AuthContext";
import { showError } from "../../alerts";
import {
  useGetAllUser,
  useGetPredictionsMatch,
  useGetPredictionsUser,
} from "../../hooks/query/user-matches";
import {
  UserPrediction,
  UserShort,
} from "../../services/user-matches.services";
import ScorePredictModal from "./score-predict-modal";
import WinPredictModal from "./win-predict-modal";
import { UseQueryResult } from "@tanstack/react-query";

interface MatchProps {
  getPredictionsUser: UseQueryResult<UserPrediction[], unknown>;
  getAllUser: UseQueryResult<UserShort[], unknown>;
  match: any;
  forceRender: boolean;
  service: any;
  authCurrentScore: number | undefined;
}

function Match(props: MatchProps) {
  const { auth, authDispatch } = useContext(AuthContext);

  const matchPrediction = props.getPredictionsUser.data?.find(
    (match) => match.match_id === props.match._id
  );

  const getPredictionsMatch = useGetPredictionsMatch(
    auth.token,
    props.match._id
  );

  // const [visitorScore, setVisitorScore] = useState()
  const [showScorePredictModal, setShowScorePredictModal] = useState(false);
  const [showWinPredictModal, setShowWinPredictModal] = useState(false);
  // const [resultMatch, setResultMatch] = useState<any>({});

  return (
    <>
      <div className="container-match shadow-md">
        <svg
          width="297"
          height="297"
          viewBox="0 0 297 297"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.6215 15.278C102.986 -4.28743 193.718 -3.96485 281.122 16.222C301.073 103.678 301.16 194.408 281.378 281.722C194.01 301.254 103.285 300.932 15.8782 280.778C-4.0564 193.321 -4.14411 102.594 15.6215 15.278Z"
            fill="#edeee4"
          ></path>
        </svg>
        <div className="content-match">
          <h3>
            {new Date(props.match.date).toLocaleString("vi", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </h3>
          <div className="teams">
            <div
              className={`border-4 rounded-md bg-white ${
                props.match.local_team.result === null
                  ? "border-white"
                  : props.match.local_team.result >
                    props.match.visiting_team.result
                  ? "border-green-500"
                  : props.match.local_team.result ===
                      props.match.visiting_team.result && "border-gray-300"
              }`}
            >
              <img
                src={props.match.local_team.image}
                alt=""
                className="w-10 "
              />
            </div>
            {props.match.local_team.name}
            {props.match.has_played ? (
              <span className="has_played">
                {props.match.local_team.result}
              </span>
            ) : (
              <span className="has_not_played">
                {matchPrediction?.bets?.scoreBet?.localBet}
              </span>
            )}
          </div>
          <h1>VS</h1>
          <div className="teams">
            <div
              className={`border-4 rounded-md bg-white ${
                props.match.visiting_team.result === null
                  ? "border-white"
                  : props.match.local_team.result <
                    props.match.visiting_team.result
                  ? "border-green-500"
                  : props.match.local_team.result ===
                      props.match.visiting_team.result && "border-gray-300"
              }`}
            >
              <img
                src={props.match.visiting_team.image}
                alt=""
                className="w-10"
              />
            </div>
            {props.match.visiting_team.name}
            {props.match.has_played ? (
              <span className="has_played">
                {props.match.visiting_team.result}
              </span>
            ) : (
              <span className="has_not_played">
                {matchPrediction?.bets?.scoreBet?.visitorBet}
              </span>
            )}
          </div>
          <svg
            width="96"
            height="25"
            viewBox="0 0 96 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ff004c"
              d="M29.5654 12.1734L32.7897 15.431L36.0139 12.1734L32.7897 8.92823L29.5654 12.1734ZM14.9761 12.1734L17.805 15.0331L20.6463 12.1734L17.805 9.32611L14.9761 12.1734ZM0.386719 12.1734L2.8574 14.6601L5.32808 12.1734L2.8574 9.68666L0.386719 12.1734ZM58.7318 12.1734L62.7467 16.2268L66.7739 12.1734L62.7467 8.13245L58.7318 12.1734ZM44.1424 12.1734L47.7867 15.8289L51.4062 12.1734L47.7867 8.53034L44.1424 12.1734ZM95.4091 11.4771C95.2679 9.09816 94.429 6.81476 92.9984 4.91574C91.5678 3.01672 89.6097 1.58739 87.372 0.808542C85.1342 0.0296895 82.7172 -0.0636941 80.4266 0.540198C78.1361 1.14409 76.075 2.41812 74.5039 4.20117C72.9329 5.98421 71.9225 8.1962 71.6006 10.5573C71.2787 12.9183 71.6597 15.3224 72.6955 17.4655C73.7312 19.6086 75.3752 21.3944 77.4194 22.597C79.4636 23.7996 81.8163 24.365 84.1798 24.2216C87.3477 24.0295 90.3102 22.5791 92.4159 20.1893C94.5216 17.7994 95.5982 14.6657 95.4091 11.4771ZM86.0823 3.818C87.9979 4.43825 89.6342 5.71969 90.7024 7.43617C90.2545 7.74995 89.728 7.93087 89.183 7.95836C88.6755 7.98368 88.1696 7.88362 87.7094 7.66687C87.2492 7.45012 86.8487 7.1233 86.5429 6.71492C86.237 6.30654 86.0352 5.82899 85.9549 5.32402C85.8746 4.81905 85.9183 4.30205 86.0823 3.818ZM76.7184 17.2339C75.6745 15.8726 75.0631 14.2259 74.9642 12.5091C74.9642 12.248 74.9642 11.9994 74.9642 11.7382C75.5812 11.7798 76.1714 12.0076 76.6578 12.3919C77.1442 12.7762 77.5043 13.2991 77.691 13.8924C77.8777 14.4858 77.8825 15.122 77.7045 15.718C77.5266 16.3141 77.1743 16.8424 76.6937 17.2339H76.7184ZM76.3478 7.28697C77.4304 5.59471 79.0705 4.34019 80.9803 3.7434C81.0657 3.99685 81.1197 4.25988 81.1409 4.52665C81.1881 5.34935 80.9089 6.1573 80.3645 6.77282C79.8201 7.38835 79.0552 7.76109 78.2378 7.80916C77.5608 7.87599 76.8813 7.7094 76.3107 7.33668L76.3478 7.28697ZM84.0069 20.5412C82.8082 20.609 81.6087 20.4226 80.4862 19.9942C80.6762 19.3564 81.0655 18.7973 81.5963 18.3999C82.127 18.0024 82.7709 17.7878 83.4325 17.7878C84.094 17.7878 84.7379 18.0024 85.2686 18.3999C85.7994 18.7973 86.1886 19.3564 86.3787 19.9942C85.6096 20.3122 84.7978 20.5134 83.9698 20.591L84.0069 20.5412ZM86.9717 11.5642L85.8846 14.685C85.8284 14.8597 85.7172 15.0111 85.5679 15.1165C85.4186 15.222 85.2392 15.2756 85.0569 15.2694L81.7709 15.1948C81.5897 15.194 81.4136 15.1343 81.2689 15.0245C81.1241 14.9147 81.0186 14.7607 80.9679 14.5855L80.0167 11.415C79.9672 11.239 79.9739 11.0519 80.036 10.88C80.0981 10.7082 80.2124 10.5603 80.3626 10.4575L83.0557 8.5676C83.2038 8.46216 83.3807 8.40558 83.5621 8.40558C83.7436 8.40558 83.9205 8.46216 84.0686 8.5676L86.6752 10.5695C86.8304 10.6876 86.9408 10.8556 86.988 11.0456C87.0351 11.2356 87.0163 11.4361 86.9346 11.6139L86.9717 11.5642ZM90.5418 16.7614C89.993 16.4128 89.5678 15.8985 89.3271 15.292C89.0863 14.6855 89.0423 14.0179 89.2013 13.3847C89.3603 12.7514 89.7141 12.185 90.2123 11.7665C90.7105 11.3479 91.3274 11.0986 91.9748 11.0543C91.9748 11.1787 91.9748 11.3031 92.0366 11.4274C92.1387 13.3439 91.5993 15.2395 90.5048 16.8111L90.5418 16.7614Z"
            ></path>
          </svg>
          <div className="my-2 flex justify-between items-center">
            <Button
              type="primary"
              onClick={() => setShowScorePredictModal(true)}
              disabled={props.match.local_team.name === undefined}
            >
              Dự đoán tỉ số
            </Button>
            <Button
              type="default"
              onClick={() => setShowWinPredictModal(true)}
              disabled={props.match.local_team.name === undefined}
            >
              Dự đoán kết quả
            </Button>
          </div>
        </div>
      </div>
      <ScorePredictModal
        token={auth.token}
        service={props.service}
        match={props.match}
        matchPrediction={matchPrediction}
        showModal={showScorePredictModal}
        closeModal={() => setShowScorePredictModal(false)}
        getAllUser={props.getAllUser}
        getPredictionsMatch={getPredictionsMatch}
        authCurrentScore={props.authCurrentScore}
      />
      <WinPredictModal
        token={auth.token}
        service={props.service}
        match={props.match}
        matchPrediction={matchPrediction}
        showModal={showWinPredictModal}
        closeModal={() => setShowWinPredictModal(false)}
        getAllUser={props.getAllUser}
        getPredictionsMatch={getPredictionsMatch}
        authCurrentScore={props.authCurrentScore}
      />
    </>
  );
}

export default Match;
