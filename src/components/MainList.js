import { useEffect, useState } from "react";
import "../App.css";
import Student from "./Student";

function MainList() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleTagChange = (e) => {
    setTagValue(e.target.value);
  };
  useEffect(
    () =>
      fetch("https://api.hatchways.io/assessment/students")
        .then((response) => response.json())
        .then((data) => {
          const dataWithTag=data.students.map(student=>{ return {...student,tag:[]}})
          setData(dataWithTag)
        }),
    []
  );
  const addTags=(id, tags)=>{
    const updatedData=data.map(student=>{
      if(student.id!==id){
        return student
      }
      return {...student,tag:tags}
    })
    setData(updatedData)
  }

  //filter name
  let filterList = data.filter(
    (student) =>{
      const fullName=student.firstName+student.lastName
      return fullName.trim().toUpperCase().indexOf(inputValue.toUpperCase())!==-1
    }
     
  );
  //filter the tags
  if (tagValue !== "") {
    filterList = filterList.filter((list) => {
      if (typeof list.tag == "undefined") return list;
      else {
        return list.tag.toString().includes(tagValue) ===true;
      }
    });
  }

  const studentList = filterList.map((student) => (
    <Student key={student.id} student={student} parentAddTag={addTags} />
  ));
  return (
    <div className="container">
      <input
        placeholder="Search by name"
        type="text"
        className="no-outline"
        onChange={handleOnChange}
      />
      <p></p>
      <input
        placeholder="Search by tag"
        type="text"
        className="no-outline"
        onChange={handleTagChange}
      />
      <ul>{studentList}</ul>
    </div>
  );
}

export default MainList;
