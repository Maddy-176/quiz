import React, { useEffect, useState } from 'react';
import "../styles/landingpage.css"
import { useSelector, useDispatch } from 'react-redux'
import StartQuizBtn from './StartQuiz';

function Landingpage() {

    const [quizCategories, setQuizCategories]= useState(null); // sets categories for the quiz
    const [isError, setIsError] = useState(true);  
    const [errorMsg, setErrorMsg] = useState("");
    const loading =  useSelector(state=>state.ques.loading); //if the ques is still loading or not
    const selectQuesCategory= useSelector(state=>state.ques_category); // gets the ques category from store
    const difficultyLvl= useSelector(state=>state.ques_difficulty);  //gets state of difficulty level from store
    const questionType= useSelector(state=>state.ques_type);   // gets sttae of questiontype from store
    const numberOfQues= useSelector(state=>state.ques_amount)  //gets number of ques from store

    const dispatch = useDispatch()  //to dispatch the action

    const api="https://opentdb.com/api_category.php"  //api from where question data is being fetched

    useEffect(()=>{
        const handleLoading = (value) => {
            dispatch({
              type: 'CHANGE_LOADING',
              loading: value
            })
          }
          handleLoading(true);
         
        fetch(api)  // fetching the api here
        .then((result)=>result.json())
        .then((res)=>{setQuizCategories(res.trivia_categories)
        handleLoading(false)})
        //console.log(loading)
    },[setQuizCategories,dispatch])

    const handleQuestionCategoryChange=(e)=>{
        dispatch({
            type:"CHANGE_CATEGORY",
            value:e.target.value
        })
    }

    const handleQuestionLvlDifficulty=(e)=>{
        dispatch({
            type:"CHANGE_DIFFICULTY",
            value:e.target.value
        })
    }

    const handleQuestionType=(e)=>{
        dispatch({
            type:"CHANGE_TYPE",
            value:e.target.value
        })
    }

    const handleNumberOfQues=(e)=>{
        dispatch({
            type:"CHANGE_AMOUNT",
            value:e.target.value
        })
        //validateInput(e.target.value)

        
    }

    // const validateInput=(value)=>{
    //     if(value===undefined){
    //         setErrorMsg("Number of Questions canot be empty")
    //         setIsError(true)
    //     }else if(value>50){
    //         setIsError(true)
    //         setErrorMsg("Not more than 50 questions allowed")

    //     }else if(isNaN(value)){
    //         setIsError(true)
    //         setErrorMsg("Please provide Input in Number")
    //     }else if(value<=0){
    //         setIsError(true)
    //         setErrorMsg("Number of questions must be above 0")
    //     }else{
    //         setErrorMsg("")
    //         setIsError(false)
    //     }
    // }
    
   

  return <div>
     
      <div className='landing-page'>
      <p className='app-title'>Welcome to Quiz App</p>
      {!loading?( <div>
          <div className='user-input'> 
      <h3>Select Category</h3>
      <select value={selectQuesCategory} onChange={(e)=>handleQuestionCategoryChange(e)}>
          <option defaultValue>All</option>
      {quizCategories?.map((category,index)=>(
          <option key={category.id} value={category.id}>
              {category.name}
          </option>
      ))}
      </select>
      </div>
    <div  className='user-Input'>
      <h3>Select Question type</h3>
      <select value={questionType} onChange={(e)=>handleQuestionType(e)}>
            <option value="" key="type-all">All</option>
            <option value="multiple" key="type-1">Multiple Choice</option>
            <option value="boolean" key="type-2">True/False</option>
            </select>
            </div>
            <div className='user-input'> 
            <h3>Select Difficulty level</h3>
            <select value={difficultyLvl} onChange={(e)=>handleQuestionLvlDifficulty(e)}>
            <option value="" key="type-all">All</option>
            <option value="easy" key="d-1">Easy</option>
            <option value="medium" key="d-2">Medium</option>
            <option value="difficult" key="d-3">Difficult</option>
            </select>
            </div>
            <div  className='user-input'> 
            <h3>Select Number of Questions</h3>
            <input onChange={(e)=>handleNumberOfQues(e)} value={numberOfQues} type="number" style={{marginBottom:"3%"}} placeholder="Default 5"/>
            </div>
          {/* {console.log(quizCategories)} */}
          
          <div>

    <StartQuizBtn isError={setIsError} errorMsg={setErrorMsg}/> {/* Fetches teh quiz button here*/}
    <div>{(isError)?errorMsg:""} </div> {/* in development stage. it will show error if a user submits an empty data*/}
    {/* {console.log("error", errorMsg, isError)} */}

    </div>
    </div>):"Loading..."}
      </div>
  </div>;
}

export default Landingpage