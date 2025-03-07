import { Table } from "antd";
import "antd/dist/antd.css";
import rank1 from "../assets/rank1.png";
import rank2 from "../assets/rank2.png";
import rank3 from "../assets/rank3.png";
function FifaRank(props: any) {
  const columns = [
    {
      dataIndex: "fifa_rank",
      key: "fifa_rank",
      render: (text: any) => {
        if (text === "1")
          return <img src={rank1} alt="" className="w-10 h-10" />;
        if (text === "2")
          return <img src={rank2} alt="" className="w-10 h-10" />;
        if (text === "3")
          return <img src={rank3} alt="" className="w-10 h-10" />;
        return (
          <div className="text-center w-10 text-white text-lg">{text}</div>
        );
      },
    },
    {
      dataIndex: "image",
      key: "image",
      render: (text: any) => <img src={text} width={30} alt="" />,
    },
    {
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
    },
  ];
  return (
    <div className="container-fifa-rank">
      <svg
        className="fifa-logo"
        width="300"
        height="42"
        viewBox="0 0 86 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 .024V28h8.714V17.904h6.041l2.347-6.133H8.714V6.11h10.224l2.23-6.086H0zM23.818.024L23.795 28h8.62V.024h-8.597zM66.179 18.87l3.323-11.652 3.439 11.653h-6.762zM74.103.025H65.18L55.28 28h8.32l1.068-3.75h9.69L75.474 28h8.574L74.103.024zM38.341.024V28h8.714V17.904h6.041l2.37-6.133h-8.411V6.109h10.224L59.533.024H38.341zM82.212 2.996h.605c.093 0 .185 0 .278-.024.093 0 .163-.047.233-.07a.547.547 0 00.162-.166.509.509 0 00.07-.283.428.428 0 00-.07-.26c-.046-.07-.093-.117-.162-.14a.444.444 0 00-.233-.072c-.093 0-.162-.023-.255-.023h-.604v1.038h-.024zm-.697-1.58h1.371c.442 0 .79.07 1 .235.232.165.348.448.348.85 0 .306-.07.542-.256.707-.162.165-.395.26-.697.283l.976 1.628h-.697l-.953-1.604h-.395v1.604h-.697V1.415zM82.77 5.92c.349 0 .65-.071.953-.189.302-.141.558-.307.767-.542.209-.236.395-.52.534-.826.116-.33.186-.684.186-1.062 0-.377-.07-.73-.186-1.061-.14-.33-.302-.59-.534-.826-.233-.236-.465-.424-.767-.542a2.544 2.544 0 00-.953-.189c-.349 0-.65.07-.953.189-.302.141-.557.306-.766.542-.21.236-.395.52-.512.826a3.18 3.18 0 00-.186 1.061c0 .378.07.732.186 1.062.14.33.302.59.511.826.233.235.489.424.767.542.28.118.605.189.953.189zm0 .637a3.23 3.23 0 01-1.255-.26 3.076 3.076 0 01-1.022-.707 3.186 3.186 0 01-.674-1.038 3.364 3.364 0 01-.256-1.274 3.364 3.364 0 01.93-2.312A3.466 3.466 0 0181.515.26C81.91.071 82.33 0 82.77 0c.442 0 .86.07 1.255.26.395.165.72.4 1.022.707.28.307.535.637.697 1.038.163.401.256.826.256 1.274 0 .448-.093.873-.256 1.274a3.127 3.127 0 01-.697 1.038 2.859 2.859 0 01-1.022.707 3.23 3.23 0 01-1.255.26z"
          fill="#326295"
        ></path>
      </svg>
      <Table columns={columns} dataSource={props.teams} pagination={false} />
    </div>
  );
}

export default FifaRank;
