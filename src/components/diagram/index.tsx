import "antd/dist/antd.css";
import { Ball, Spinner } from "../icon";
import wc_cup from "../../assets/wcup.png";
import { ViewMatchGroup, ViewRound, ViewVS } from "./view-vs";
function Diamgram(props: any) {
  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-4 gap-5 p-5 items-center">
      <div className="order-2 lg:order-2 col-span-1 text-white flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-5">
          <div className="col-span-1 grid grid-cols-2 gap-2 gap-y-10">
            {["A", "B", "C", "D"].map((val: string) => (
              <ViewMatchGroup
                key={"group-key-" + val}
                getMatches={props.getMatchesByGroup(val)}
                groupName={val}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="order-3 lg:order-3 col-span-1 text-white flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-5">
          <div className="col-span-1 grid grid-cols-2 gap-2 gap-y-10">
            {["E", "F", "G", "H"].map((val: string) => (
              <ViewMatchGroup
                key={"group-key-" + val}
                getMatches={props.getMatchesByGroup(val)}
                groupName={val}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="order-1 lg:order-2 col-span-2 text-white flex flex-col gap-10">
        <ViewRound
          title="Vòng 1/8"
          matchs={props.getMatchesByGroup("ROUND_OF_16")}
        />
        <ViewRound
          title="Vòng tứ kết"
          matchs={props.getMatchesByGroup("QUARTER_FINAL")}
        />
        <ViewRound
          title="Vòng bán kết"
          matchs={props.getMatchesByGroup("SEMI_FINAL")}
          className="grid grid-cols-2 items-center gap-1 content-center "
        />
        <ViewRound
          title="Tranh hạng ba"
          matchs={props.getMatchesByGroup("THIRD_PLACE")}
          className="grid grid-cols-1 items-center gap-1 content-center "
        />
        <ViewRound
          title={
            <div className="flex flex-col items-center justify-center">
              <img src={wc_cup} className="w-10 h-24"></img>
              <div>Chung kết</div>
            </div>
          }
          matchs={props.getMatchesByGroup("FINAL")}
          className="grid grid-cols-1 items-center gap-1 content-center "
        />
      </div>
    </div>
  );
}

export default Diamgram;
