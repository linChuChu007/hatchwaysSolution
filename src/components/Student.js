import { useState } from "react";
import ScoreDetails from "./ScoreDetails";
import TagButton from "./TagButton";

const Student = ({ student,parentAddTag }) => {
  const [detailDisplay, setDetailDisplay] = useState(false);
  const [value, setValue] = useState("");
  

  const getAverage = (grades) =>
    grades.reduce((a, b) => parseInt(a) + parseInt(b), 0) / grades.length;
  const handleAddTag = (e) => {
    if (e.keyCode === 13) {
      if(student.tag.indexOf(e.target.value)===-1){
        const newTags = [...student.tag, e.target.value];
        parentAddTag(student.id,newTags)
      }
      setValue('')
      
    }
  };

  let tagBtns = "";

  if (student.tag !== 'undefined') {
    tagBtns = <TagButton tags={student.tag} />;
  }
  const scoreList=detailDisplay ? <ScoreDetails grades={student.grades} /> :""
  return (
    <div>
      <img src={student.pic} height="120" width="120" />
      <h1>
        {student.firstName.toUpperCase()} {student.lastName.toUpperCase()}
        <button
          onClick={() => {
            setDetailDisplay((value) => !value);
          }}
          className="align-right"
        >
          {detailDisplay === false ? "+" : "-"}
        </button>
      </h1>

      <ul>
        <li>Email: {student.email}</li>
        <li>Company: {student.company}</li>
        <li> Skill: {student.skill}</li>
        <li>Average:{getAverage(student.grades)}%</li>
      </ul>
      {scoreList} 
      {tagBtns}
      <p>
        <input
          className="tag"
          placeholder="Add a tag"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleAddTag}
        />
      </p>
      <hr />
    </div>
  );
};

export default Student;
