import React from 'react';
import { useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import "../styles/result.css"

function TotalScore() {
   
  let navigate=useNavigate();
    const score= useSelector(state=>state.ques.score)
    const attempted= useSelector(state=>state.ques.ques_attempted)
    const questions= useSelector(state=>state.ques.questions)

    const redirect=()=>{
      navigate("/")
      window.location.reload();
    }
  return <div>
     <div className='home'>
          <FontAwesomeIcon icon={faHome}  size="lg" onClick={()=>redirect()}/>
          </div>
          <div className="result-container">
        <div>Thanks for Attending the Quiz</div>
        <div>Total Number of Questions:&nbsp;{questions.length}</div>
        <div>Total Question Attempted:&nbsp;{attempted}</div>
      <div>Total Score: {score}</div>
      </div>
  </div>;
}

export default TotalScore;
