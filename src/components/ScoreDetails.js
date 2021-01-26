import "../App.css";
const ScoreDetails = ({ grades }) => {
  const details = grades.map((grade, key) => (
    <p key={key}>
      Test {key + 1}:<span style={{ paddingLeft: "5%" }}>{grade}%</span>
    </p>
  ));

  return (
    <div className="details" >
      {details}
    </div>
  );
};

export default ScoreDetails;
