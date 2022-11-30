import { Ball, Spinner } from "../icon";

export const ViewVS = (props: any) => {
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
};
export const ViewMatchGroup = (props: any) => {
  return (
    <div className="text-center mt-2">
      <div className="text-xl font-bold mb-2">Bảng {props.groupName}</div>
      <div className="border border-slate-50 rounded-md items-center p-2 bg-[#0202022a]">
        {props.getMatches.map((match: any, index: any) => (
          <ViewVS key={"viewMatchGrounp-" + index} match={match} />
        ))}
      </div>
    </div>
  );
};
export const ViewRound = (props: any) => {
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
};
