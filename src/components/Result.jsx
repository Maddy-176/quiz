import React from 'react';
import { useSelector} from 'react-redux'

function TotalScore() {
    const score= useSelector(state=>state.ques.score)

  return <div>
      <div>Total Score: {score}</div>
  </div>;
}

export default TotalScore;
