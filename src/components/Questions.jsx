import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import "../styles/questions.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import {decode} from 'html-entities';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

function Questions() {

    const [options, setOptions]= useState();
    const [optionSelected, setOptionSelected]= useState(false);
    const [userAnswer, setUserAnswer] = useState(null);
    const loading= useSelector(state=>state.ques.loading)
    const [isCorrect, setIsCorrect]= useState(false)
    // const total_score= useSelector(state=>state.ques.score);
    const questions= useSelector(state=>state.ques.questions);
    const index= useSelector(state=>state.ques.index)
    const question= questions[index];
    const correct_answer= question?.correct_answer;
    const score= useSelector(state=>state.ques.score)

    let dispatch= useDispatch();
    const navigate= useNavigate();

    const handleUserAnswer=(e)=>{
      
        setOptionSelected(true);
        setUserAnswer(e.target.textContent);
        if(userAnswer===correct_answer){
            dispatch({
                type:"SET_SCORE",
                score:score+1
            })
            alert("correct answer")
            
        }
        else{
          alert("incorrect-answer")
        }
        if(index<questions.length-1){
          dispatch({
            type:"SET_INDEX",
            index:index+1
          })
          setUserAnswer(null);
          setOptionSelected(false)

        }else{
            navigate("/result")

          }

    }

    const handleNext=()=>{
      if(index<questions.length-1){
        dispatch({
          type:"SET_INDEX",
          index:index+1
        })
        
      }else{
       alert("You have reached to the last Question")

      }
    }

    const handlePrevious=()=>{
      if(index===0){
        alert("You are on the First Question")

      }else{
        dispatch({
          type:"SET_INDEX",
          index:index-1
        })
             
      }
    }
    


  
    useEffect(()=>{
        if(!questions) return ;
        const answers=[correct_answer,...(question?.incorrect_answers||[])]
        answers.sort((a,b)=> (0.5-Math.random()))
        setOptions(answers)
        

    },[question])
  return <div >
      {!loading?(
        <div>
          <div className='home'>
          <FontAwesomeIcon icon={faHome}  size="lg" onClick={()=>navigate("/")}/>
          </div>
      <div className="ques-container">
      <div className='card' style={{width:"40%"}}>
          <div className='card-body'>
              <div className="question">Q{index+1} &nbsp;&nbsp;{decode(question?.question)}</div>
              {options?.map((option,index)=>{
                  return(
                    <button className="option btn btn-primary" index={index} 
                    onClick={(e)=>handleUserAnswer(e)}>
                      {option}</button>

                  )
              })}
                  
          </div>
          {console.log("questions",question?.incorrect_answers, options, question?.correct_answer)}
      </div>
      {/* <div className="btn-container">
      <button className='btn btn-primary previous-btn' onClick={handlePrevious}>Previous</button>
      <button className='btn btn-primary next-btn' onClick={handleNext}>Next</button>
      </div> */}
      {console.log("set user answer",questions)}
      </div>
      {console.log()}
      </div>

      ):"Loading..."
}
  </div>
}

export default Questions;
