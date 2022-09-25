import React from "react";
import '../styles/snake.css';

const Snake = (props) => {
    const y = props.points[0];
    const x = props.points[1];
    return <p className="snake" style={{marginLeft:x, marginTop:y}}>{props.bodyChar}</p>;
};

export default Snake;