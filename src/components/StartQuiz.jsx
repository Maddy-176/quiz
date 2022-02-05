import React,{useState, useEffect,useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import "../styles/questions.css"

function StartQuiz({isDisabled}) {

    
    const selectQuesCategory= useSelector(state=>state.ques.ques_category); //fetches the state of ques category of difficulty level from store
    const difficultyLvl= useSelector(state=>state.ques.ques_difficulty); //fetches the state of difficulty level from store
    const questionType= useSelector(state=>state.ques.ques_type); //fetches the state of ques type  from store
    const numberOfQues= useSelector(state=>state.ques.ques_amount);  //fetches number of Ques from store
    const index= useSelector(state=>state.ques.index); //fetches index of questions from store
    const [disableBtn, setDisableBtn]= useState(true)

    const dispatch = useDispatch() //for dispatching actions
    const navigate= useNavigate(); //for routers

    //action creator for setting questions
    const setQuestions=(values)=>{
        dispatch({
            type:'SET_QUESTIONS',
            questions:values
        })
    }

    //actions creator for changing loading
    const changeLoading=(value)=>{
        dispatch({
            type: "CHANGE_LOADING",
            loading: value,
          })
    }

    useEffect(()=>{
        setDisableBtn(isDisabled)
    },[isDisabled])

   


//function to handle question request
    const handleRequest= ()=>{

        let api=`https://opentdb.com/api.php?amount=${numberOfQues}`

        if(selectQuesCategory.length){
            api=api.concat(`&category=${selectQuesCategory}`)
        }
        if(difficultyLvl.length){
            api=api.concat(`&difficulty=${difficultyLvl}`)
        }
        if(questionType.length){
            api=api.concat(`&type=${questionType}`)

        }
        changeLoading(true)

        fetch(api)
        .then(result=>result.json())
        .then((res)=>{
            setQuestions(res.results) 
            changeLoading(false)
        })

        if(index>0){
            dispatch({
                type:"SET_INDEX",
                index:0,
            })

            dispatch({
                type:"SET_SCORE",
                score:0
            })

            dispatch({
                type:"QUESTION_ATTEMPTED",
                attempted:0
            })



        }
        navigate("/questions"); //navigates to question component

    }
  
   

  
  return <div>
     
      <button  onClick={(e)=>handleRequest(e)} disabled={disableBtn} className="start-quiz-btn">Start Quiz</button>
  </div>;
}

export default StartQuiz;
