const initialState={
    ques_category:'',
    ques_difficulty:'',
    ques_type:'',
    ques_amount:5,
    questions:[],
    index:0,
    score:0,
    loading:false,
    ques_attempted:0,

}

const quesReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'CHANGE_LOADING':
            return{
                ...state,
                loading:action.value
            }
        case 'CHANGE_CATEGORY':
            return{
                ...state,
                ques_category:action.value
            }
        case 'CHANGE_DIFFICULTY':
            return {
                ...state,
                ques_difficulty:action.value
            }
        case 'CHANGE_TYPE':
            return{
                ...state,
                ques_type:action.value
            }
        case 'CHANGE_AMOUNT':
            return {
                ...state,
                ques_amount:action.value
            }
        
        case 'SET_QUESTIONS':
            return{
                ...state,
                questions:action.questions
            }
        case 'SET_SCORE':
            return{
                ...state,
                score:action.score

            }
        case 'SET_INDEX':
            return{
                ...state,
                index:action.index
            }
        case 'QUESTION_ATTEMPTED':
            return {
                ...state,
                ques_attempted:action.attempted
                }
        default:
            return state;
    }
}

export default quesReducer