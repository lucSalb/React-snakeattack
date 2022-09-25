import React from "react";
import '../styles/score.css';

const Score = (props) =>{

    
    return(
        <div id="score-zone">
            <h5 style={{marginRight:150}}>Lifes: {props.life}</h5>
            <h5>Score: {props.score}</h5>
        </div>
    );
}

export default Score;