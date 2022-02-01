import { combineReducers } from 'redux';
import quesReducer from "./questionsReducer"

export const rootReducer = combineReducers({
    ques: quesReducer,
  })

