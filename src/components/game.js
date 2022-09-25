import React from "react";
import Score from "./score";
import Snake from './snake';
import Food from "./food";
import '../styles/game.css';
class Game extends React.Component{

    constructor(props){
        super(props);
        const defaultBody = [[0,0],[0,10],[0,20]];
        this.state = {fleft:140, ftop:140, life:5, score:0, direction:'Right', bodyChar:'*', body:{defaultBody}};
    }

    eatFood = () => {

        let {score} = this.state;
        let {body} =  this.state;
        let {fleft} = this.state;
        let {ftop} = this.state;

        let newBodyLeft = body.defaultBody[body.defaultBody.length-1][0];
        let newBodyTop = body.defaultBody[body.defaultBody.length-1][1];

        const {direction} = this.state;
        
        score+=1;
        this.setState({score});

        switch(direction){
            case 'Right':
                newBodyTop+=10;
                break;
            case 'Left':
                newBodyTop-=10;
                break;
            case 'Down':
                newBodyLeft += 10;
                break;
            case 'Up':
                newBodyLeft -= 10;
                break;
        }

        const top = Math.floor(Math.random() * 390);
        const left = Math.floor(Math.random() * 390);
        
        body.defaultBody.push([newBodyLeft,newBodyTop]);

        this.setState({fleft:left, ftop:top, body, score});
        this.RenderBody(newBodyLeft,newBodyTop);
    }

    componentDidMount = () =>{
        window.setInterval(()=>{
            const {direction} = this.state;
            const {body} = this.state;

            let sleft = body.defaultBody[body.defaultBody.length-1][0];
            let stop = body.defaultBody[body.defaultBody.length-1][1];
 
            let {ftop} = this.state;
            let {fleft} = this.state;
         
            switch(direction){
                case 'Right':
                    stop += 10;
                    if(stop >= 400) stop=0;
                    break;
                case 'Left':
                    stop -= 10;
                    if(stop <= 0) stop=400;
                    break;
                case 'Down':
                    sleft += 10;
                    if(sleft >= 390 ) sleft=1;
                    break;
                case 'Up':
                    sleft -= 10;
                    if(sleft <= 1 ) sleft=390;
                    break;
            }

            this.RenderBody(sleft,stop);
            this.CheckEndGame(sleft,stop);
            if(Math.abs(stop - fleft)<=5 && Math.abs(sleft-ftop)<=5){
                this.eatFood();
            }

        },195);
    }

    Control = (e) => {
        switch(e.key){
            case 'ArrowRight':
                if(this.state.direction==='Left') return;
                this.setState({direction:'Right'});
                break;
            case 'ArrowLeft':
                if(this.state.direction==='Right') return;
                this.setState({direction:'Left'});
                break;
            case 'ArrowDown':
                if(this.state.direction==='Up') return;
                this.setState({direction:'Down'});
                break;
            case 'ArrowUp':
                if(this.state.direction==='Down') return;
                this.setState({direction:'Up'});
                break;
        }
    }

    RenderBody = (left,top) => {
        let body =  this.state.body;
        if(body.defaultBody.length > 1){
            for(var i = 0; i < body.defaultBody.length-1; i++){
                body.defaultBody[i] = body.defaultBody[i+1];
            }
            body.defaultBody[body.defaultBody.length-1]=[left,top];
        }
        this.setState({points:body.defaultBody});
    }

    PlaceSnake=()=>{
        const body =  this.state.body;
        const snk = body.defaultBody.map((el)=>{
            return <Snake bodyChar={this.state.bodyChar} points={el}/>;
        });
        return snk;
    }

    CheckEndGame = (left, top) =>{
        const {body} = this.state;
        //body.defaultBody[body.defaultBody.length]
        for(var i = 0; i < body.defaultBody.length-1; i++){
            if(left === body.defaultBody[i][0] && top === body.defaultBody[i][1]){
                var {life} = this.state;
                life--;

                const defaultBody = [[0,0],[0,10],[0,20]];
                this.setState({life:life, fleft:140, ftop:140, direction:'Right', bodyChar:'*', body:{defaultBody}});

                window.alert('You have ' + life +' lifes left');
            }
        }
    }

    render(){
        return(
            <div id='game-zone' tabIndex={0} onKeyDown={e => this.Control(e)}>
                <div className="board">                    
                    {this.PlaceSnake()}
                    <Food fleft={this.state.fleft} ftop={this.state.ftop}/>
                </div>
                <Score  life={this.state.life} 
                        score={this.state.score}/>
            </div>
        );
    }
}

export default Game;