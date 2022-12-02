import "antd/dist/antd.css";
import { useContext, useState } from "react";
import { Select } from "antd";
import { AuthContext } from "../context/AuthContext";

function Podium(props: any) {
  const { auth } = useContext(AuthContext);

  const [imageSecond, setImageSecond] = useState(
    auth.selectedTeams["runner_up"]
  );
  const [imageFirts, setImageFirts] = useState(auth.selectedTeams["champion"]);
  const [imageThird, setImageThird] = useState(
    auth.selectedTeams["third_place"]
  );
  const [disabledInput, setDisabledInput] = useState(
    new Date() > new Date("dec 9 2022 21:00")
  );

  const handleChangeSecond = (value: any) => {
    setImageSecond(value);
    props.service
      .updatePodium(auth.token, auth.document, {
        runner_up: value,
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const handleChangeFirst = (value: any) => {
    setImageFirts(value);
    props.service
      .updatePodium(auth.token, auth.document, {
        champion: value,
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const handleChangeThird = (value: any) => {
    setImageThird(value);
    props.service
      .updatePodium(auth.token, auth.document, {
        third_place: value,
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      background: "#fff0",
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "yellow" : "green",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "red" : "blue",
      },
    }),
  };
  return (
    <>
      {/* <span className="text-white">{JSON.stringify(props.teamsSelect)}</span> */}
      <div className="container-podium">
        <div className="podium">
          <img
            src={props.service.getImageByTeamId(imageSecond)?.image}
            alt=""
          />
          <div className="selectPodium">
            <Select
              style={{
                width: 120,
                background: "#fff0",
              }}
              onChange={handleChangeSecond}
              options={props.teamsSelect}
              showSearch
              defaultValue={auth.selectedTeams["runner_up"]}
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              disabled={disabledInput}
            />
            <b className="opacity-0 h-5 md:h-auto">2</b>
          </div>
        </div>
        <div className="podium">
          <img src={props.service.getImageByTeamId(imageFirts)?.image} alt="" />
          <div className="selectPodium">
            <Select
              style={{
                width: 120,
                background: "#fff0",
              }}
              className="text-white font-bold"
              onChange={handleChangeFirst}
              options={props.teamsSelect}
              showSearch
              defaultValue={auth.selectedTeams["champion"]}
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              disabled={disabledInput}
            />
            <b className="opacity-0 h-5 md:h-auto">1</b>
          </div>
        </div>
        <div className="podium">
          <img src={props.service.getImageByTeamId(imageThird)?.image} alt="" />
          <div className="selectPodium">
            <Select
              style={{
                width: 120,
                background: "!transparent",
              }}
              className="bg-transparent"
              onChange={handleChangeThird}
              options={props.teamsSelect}
              defaultValue={auth.selectedTeams["third_place"]}
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              disabled={disabledInput}
            />
            <b className="opacity-0 h-5 md:h-auto">3</b>
          </div>
        </div>
      </div>
    </>
  );
}

export default Podium;
