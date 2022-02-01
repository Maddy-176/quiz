import React, { useEffect, useState } from 'react';
import "../styles/landingpage.css"
import { useSelector, useDispatch } from 'react-redux'
import StartQuizBtn from './StartQuiz';
function Landingpage() {

    const [quizCategories, setQuizCategories]= useState(null);
    const loading =  useSelector(state=>state.ques.loading);
    const selectQuesCategory= useSelector(state=>state.ques_category);
    const difficultyLvl= useSelector(state=>state.ques_difficulty);
    const questionType= useSelector(state=>state.ques_type);
    const numberOfQues= useSelector(state=>state.ques_amount)

    const dispatch = useDispatch()

    const api="https://opentdb.com/api_category.php"
    useEffect(()=>{
        const handleLoading = (value) => {
            dispatch({
              type: 'CHANGE_LOADING',
              loading: value
            })
          }
          handleLoading(true);

        fetch(api)
        .then((result)=>result.json())
        .then((res)=>{setQuizCategories(res.trivia_categories)
        handleLoading(false)})
        console.log(loading)
    },[setQuizCategories,dispatch])

    const handleQuestionCategoryChange=(e)=>{
        dispatch({
            type:"CHANGE_CATEGORY",
            value:e.target.value
        })
    }

    const handQuestionLvlDifficulty=(e)=>{
        dispatch({
            type:"CHANGE_DIFFICULTY",
            value:e.target.value
        })
    }

    const handQuestionType=(e)=>{
        dispatch({
            type:"CHANGE_TYPE",
            value:e.target.value
        })
    }

    const handNumberOfQues=(e)=>{
        dispatch({
            type:"CHANGE_AMOUNT",
            value:e.target.value
        })
        
    }

   

  return <div>
     
      <div className='landing-page'>
      <p className='app-title'>Welcome to Quiz App</p>
      {!loading?( <div>
      <h3>Select Category</h3>
      <select value={selectQuesCategory} onChange={(e)=>handleQuestionCategoryChange(e)}>
          <option defaultValue>All</option>
      {quizCategories?.map((category,index)=>(
          <option key={category.id} value={category.id}>
              {category.name}
          </option>
      ))}
      </select>


      <h3>Select Question type</h3>
      <select value={questionType} onChange={(e)=>handQuestionType(e)}>
            <option value="" key="type-all">All</option>
            <option value="multiple" key="type-1">Multiple Choice</option>
            <option value="boolean" key="type-2">True/False</option>
            </select>
            
            <h3>Select Difficulty level</h3>
            <select value={difficultyLvl} onChange={(e)=>handQuestionLvlDifficulty(e)}>
            <option value="" key="type-all">All</option>
            <option value="multiple" key="d-1">Easy</option>
            <option value="boolean" key="d-2">Medium</option>
            <option value="boolean" key="d-3">Difficult</option>
            </select>
            <h3>Select Number of Questions</h3>
            <input onChange={(e)=>handNumberOfQues(e)} value={numberOfQues} type="number" />
          {console.log(quizCategories)}
          
          <div>
    <StartQuizBtn/>
    </div>
    </div>):"Loading..."}
      </div>
     
  </div>;
}

export default Landingpage