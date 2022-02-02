import React,{useState, useEffect,useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

function StartQuiz({isDisabled}) {
    const selectQuesCategory= useSelector(state=>state.ques.ques_category);
    const difficultyLvl= useSelector(state=>state.ques.ques_difficulty);
    const questionType= useSelector(state=>state.ques.ques_type);
    const numberOfQues= useSelector(state=>state.ques.ques_amount);
    const index= useSelector(state=>state.ques.index);
    const [disableBtn, setDisableBtn]= useState(true)

    const dispatch = useDispatch()
    const navigate= useNavigate();

    const setQuestions=(values)=>{
        dispatch({
            type:'SET_QUESTIONS',
            questions:values
        })
    }

    const changeLoading=(value)=>{
        dispatch({
            type: "CHANGE_LOADING",
            loading: value,
          })
    }

    useEffect(()=>{
        setDisableBtn(isDisabled)
    },[isDisabled])

   



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
        navigate("/questions");

    }
  
   

  
  return <div>
     
      <button  onClick={(e)=>handleRequest(e)} disabled={disableBtn}>Start Quiz</button>
  </div>;
}

export default StartQuiz;
