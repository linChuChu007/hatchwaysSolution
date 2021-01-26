import "../App.css";

const TagButton = ({ tags }) => {
  const btns = tags.map((tag) => (
    <button key={tag} className="tagBtn">
      {tag}
    </button>
  ));
  return <div style={{ marginLeft: "15%" }}>{btns}</div>;
};
export default TagButton;
