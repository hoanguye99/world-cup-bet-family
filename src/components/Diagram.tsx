import "antd/dist/antd.css";
import { Ball, Spinner } from "./icon";
import wc_cup from "../assets/wcup.png";
function Diamgram(props: any) {
  const dataDemoRoundOf16 = [
    {
      local_team: {
        name: "A1",
      },
      visiting_team: {
        name: "B2",
      },
    },
    {
      local_team: {
        name: "C1",
      },
      visiting_team: {
        name: "D2",
      },
    },
    {
      local_team: {
        name: "E1",
      },
      visiting_team: {
        name: "F2",
      },
    },
    {
      local_team: {
        name: "G1",
      },
      visiting_team: {
        name: "H2",
      },
    },
    {
      local_team: {
        name: "H1",
      },
      visiting_team: {
        name: "G2",
      },
    },
    {
      local_team: {
        name: "F1",
      },
      visiting_team: {
        name: "E2",
      },
    },
    {
      local_team: {
        name: "B1",
      },
      visiting_team: {
        name: "A2",
      },
    },
    {
      local_team: {
        name: "D1",
      },
      visiting_team: {
        name: "C2",
      },
    },
  ];

  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-4 gap-5 p-5 items-center">
      <div className="order-2 lg:order-2 col-span-1 text-white flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-5">
          <div className="col-span-1 grid grid-cols-2 gap-2 gap-y-10">
            <ViewMatchGroup service={props.service} groupName={"A"} />
            <ViewMatchGroup service={props.service} groupName={"B"} />
            <ViewMatchGroup service={props.service} groupName={"C"} />
            <ViewMatchGroup service={props.service} groupName={"D"} />
          </div>
        </div>
      </div>
      <div className="order-3 lg:order-3 col-span-1 text-white flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-5">
          <div className="col-span-1 grid grid-cols-2 gap-2 gap-y-10">
            <ViewMatchGroup service={props.service} groupName={"E"} />
            <ViewMatchGroup service={props.service} groupName={"F"} />
            <ViewMatchGroup service={props.service} groupName={"G"} />
            <ViewMatchGroup service={props.service} groupName={"H"} />
          </div>
        </div>
      </div>
      <div className="order-1 lg:order-2 col-span-2 text-white flex flex-col gap-10">
        <ViewRound
          title="Vòng 1/8"
          matchs={props.service.getMatchesByGroup("ROUND_OF_16")}
        />
        <ViewRound
          title="Vòng tứ kết"
          matchs={props.service.getMatchesByGroup("QUARTER_FINAL")}
        />
        <ViewRound
          title="Vòng bán kết"
          matchs={props.service.getMatchesByGroup("SEMI_FINAL")}
          className="grid grid-cols-2 items-center gap-1 content-center "
        />
        <ViewRound
          title="Tranh hạng ba"
          matchs={props.service.getMatchesByGroup("THIRD_PLACE")}
          className="grid grid-cols-1 items-center gap-1 content-center "
        />
        <ViewRound
          title={
            <div className="flex flex-col items-center justify-center">
              <img src={wc_cup} className="w-10 h-24"></img>
              <div>Chung kết</div>
            </div>
          }
          matchs={props.service.getMatchesByGroup("FINAL")}
          className="grid grid-cols-1 items-center gap-1 content-center "
        />
      </div>
    </div>
  );
}
function ViewMatchGroup(props: any) {
  return (
    <div className="text-center mt-2">
      <div className="text-xl font-bold mb-2">Bảng {props.groupName}</div>
      <div className="border border-slate-50 rounded-md items-center p-2 bg-[#0202022a]">
        {props.service
          .getMatchesByGroup(props.groupName)
          .map((match: any, index: any) => (
            <ViewVS key={"viewMatchGrounp-" + index} match={match} />
          ))}
      </div>
    </div>
  );
}

function ViewRound(props: any) {
  return (
    <div className="mb-10">
      <div className="text-xl text-center mb-10 font-bold uppercase">
        {props.title ?? "Vòng..."}
      </div>
      <div
        className={
          props.className ??
          `grid grid-cols-2  md:grid-cols-4 items-center gap-1 content-center`
        }
      >
        {props.matchs?.map((match: any, index: any) => (
          <ViewVS
            key={`viewRound-${index}`}
            match={match}
            className={"border border-white p-3 rounded-md bg-[#0202022a]"}
          />
        ))}
      </div>
    </div>
  );
}

function ViewVS(props: any) {
  return (
    <div className="flex flex-col gap-0 items-center justify-center mb-2">
      <div
        className={`grid grid-cols-5 mt-1 mb-2  items-center justify-center gap-1 ${props.className}`}
      >
        {props.match?.local_team?.image ? (
          <img
            src={props.match?.local_team?.image}
            alt=""
            className="w-5 rounded-md"
          />
        ) : (
          <span className="text-center">
            {props.match?.local_team?.name ?? (
              <div className="w-5 h-5 bg-white rounded-md" />
            )}
          </span>
        )}
        <span className="text-md text-center">
          {props.match?.local_team?.result ?? <Spinner />}
        </span>
        <span className="text-md text-center">
          <Ball />
        </span>
        <span className="text-md text-center">
          {props.match?.visiting_team?.result ?? <Spinner />}
        </span>

        {props.match?.local_team?.image ? (
          <img
            src={props.match?.visiting_team?.image}
            alt=""
            className="w-5 rounded-md"
          />
        ) : (
          <span className=" text-center">
            {props.match?.visiting_team?.name ?? (
              <span className="text-center">
                {props.match?.local_team?.name ?? (
                  <div className="w-5 h-5 bg-white rounded-md" />
                )}
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
export default Diamgram;
