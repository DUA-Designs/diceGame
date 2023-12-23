import { useState  } from "react";
 
const dataValues={"Three of a kind":20,"Four of a kind":25,
"Full house":30,
"Small straight":35,
"Large straight":40,"None of the above: Score 0":0};
function App() {
  const [instructions,setInstructions]=useState(true);
  const [rolls,setRolls]=useState(3);
  const [rounds,setRounds]=useState(0);
  const [score,setScore]=useState(0);
  const [check,setCheck]=useState([true,true,true,true,true]);

   
  function roundComplete(e){
    e.preventDefault();
  const data=new FormData(document.getElementById("form"));
  let val=null;


  for(let [name,value] of data){
    if(value){
      val=value;

    }
  }
   
  

  setScore(score+dataValues[val]);
  

   if(rounds===6){
    
    setRolls(0);
   }
   else{
    setRounds(rounds+1);
    setRolls(3);
   }
   for(let i=1;i<=5;i++){
    document.getElementById(`dice${i}`).innerHTML=0;
   }
  

 

 setCheck([true,true,true,true,true]);
  }
  function rollDice(){
  if(rolls>0){
    let arr=[];
    for(let i=1;i<=5;i++){
      let random=  Math.round(Math.random()*6);
      random=random===0?1+random:random;
      arr.push(random);
   
      document.getElementById(`dice${i}`).innerHTML= random;

    }
    setRolls(rolls-1);
    let equal={};
 
    for(let i=0;i<arr.length;i++){
       
      if(equal.hasOwnProperty(`${arr[i]}`)){
        equal[`${arr[i]}`]+=1;
      }
      else{
        equal[`${arr[i]}`]=1;
      }
     

      

    }
   
   
  
    let values=Object.values(equal);
      if(values.indexOf(3)>=0 ){
       
      
        let duplicateCheck=check;
     duplicateCheck[0]=false;
   
   setCheck([...duplicateCheck]);
 }
   else{
     let duplicateCheck=check;
     duplicateCheck[0]=true;
   setCheck([...duplicateCheck]);

   }

   if(values.indexOf(4)>=0 || values.indexOf(5)>=0){
 
     let duplicateCheck=check;
     duplicateCheck[1]=false;
   
   setCheck([...duplicateCheck]);

   }
   else{
     let duplicateCheck=check;
     duplicateCheck[1]=true;
   setCheck([...duplicateCheck]);

   }
   if(values.indexOf(2)>=0 && values.indexOf(3)>=0){
    let duplicateCheck=check;
    duplicateCheck[2]=false;
  setCheck([...duplicateCheck]);

   }else{
    let duplicateCheck=check;
    duplicateCheck[2]=true;
  setCheck([...duplicateCheck]);

   }
   arr.sort();
  
   
    let fullStraight=[];
   let count=1;
     for(let i=0;i<arr.length;i++){
      if(i!==0){
    
        if(arr[i]===arr[i-1]+1){
          count++;
        
        }
        else{
          fullStraight.push(count);

          count=1;
        }
      }
     }
     if(fullStraight.length===0){
      fullStraight.push(count);
     }
     fullStraight.sort();
  
     if(fullStraight[fullStraight.length-1]>=4){
      let duplicateCheck=check;
      duplicateCheck[3]=false;
    setCheck([...duplicateCheck]);

     }
     else{
      let duplicateCheck=check;
      duplicateCheck[3]=true;
    setCheck([...duplicateCheck]);
     }
     if(fullStraight[fullStraight.length-1]===5){
      let duplicateCheck=check;
      duplicateCheck[4]=false;
    setCheck([...duplicateCheck]);

     }
     else{
      let duplicateCheck=check;
      duplicateCheck[4]=true;
    setCheck([...duplicateCheck]);
     }
   

  }
  }
  function reset(){
           setScore(0);
           setRounds(0);
           setRolls(3);
           setCheck([true,true,true,true,true]);
           for(let i=1;i<=5;i++){
            document.getElementById(`dice${i}`).innerHTML=0;
           }
  }
  return (
    <div  id="app">

    {instructions?<div id="inst" className="container p-5">
      <h1 className="text-center shadow border rounded w-50 mx-auto p-4 position-relative"><span className="position-absolute translate-middle top-0 start-50 shadow-lg border rounded p-2 fs-4  " id="dice"><i class="fa-solid fa-dice"></i></span>Advanced Dice Game</h1>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 p-1">
          <div className="col-12 shadow border rounded p-4 "><h2 className="text-center "><span  > <i class="fa-solid fa-check"> </i></span> Rules</h2>
          <p  className=" ">There are total of six rounds. You can only roll the dice three times per round. To start the game, roll the dice.</p>
         <ul className="col-12 ">
          <li>Then, choose from one of the selected scores or roll the dice again</li>
          <li>If you choose a selected score, then you will move to the next round</li>
          <li>If you decline to choose a selected score, then you can roll the dice again two more times</li></ul></div>
          </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 p-1">
          <div className="col-12  shadow border rounded p-1">
          <h2 className="text-center"><span><i class="fa-solid fa-square-plus"></i> </span> Points</h2>
          <ul className="col-12 "><li>Three of a kind: Three dices has to have similar values- 20 points</li>
           <li>Four of a kind: Four dices has to have similar values- 25 points</li>
           <li>Full house: Three of a kind and a pair of other similar value - 30 points</li>
           <li>Small straight: Four of the dice have consecutive values - 35 points</li>
           <li>Large straight: All five dice have consecutive values - 40 points</li></ul>
          </div>
        </div>
      </div>
      <button className="btn btn-dark  col-3 mx-auto d-block m-3" onClick={()=>setInstructions(false)}>Play Now</button>

      
    </div>:<div id="game" className="container p-2"> <button className="btn btn-info " onClick={()=>setInstructions(true)}> Back to Instructions</button>
   <div className="row p-2">  
      <div className="p-2 col-2 mx-auto"><div className=" text-center border shadow py-3" id="dice1">0</div></div>
      <div className="p-2 col-2 mx-auto"><div className=" text-center border shadow py-3" id="dice2">0</div></div>
      <div className="p-2 col-2 mx-auto"><div className=" text-center border shadow py-3" id="dice3">0</div></div>
      <div className="p-2 col-2 mx-auto"><div className=" text-center border shadow py-3" id="dice4">0</div></div>
      <div className="p-2 col-2 mx-auto"><div className=" text-center border shadow py-3" id="dice5">0</div></div>

      <p className="text-center p-2">Rolls: {rolls} | Rounds: {rounds} </p>
      <form className="row p-2" onSubmit={(event)=>roundComplete(event)} id="form">
        <label className="p-2 shadow border m-1 col-lg-5 col-md-5 col-sm-11 col-xs-11"><input type="radio" name="jackpots" disabled={check[0]} value={"Three of a kind"} id="jack1" required/> {check[0]?"Three of a kind":"Three of a kind: Score-20 points"}</label><br/>
        <label className="p-2 shadow border m-1 col-lg-5 col-md-5 col-sm-11 col-xs-11"><input type="radio" name="jackpots" disabled={check[1]} value={"Four of a kind"} id="jack2" required/> {check[1]?"Four of a kind":"Four of a kind: Score-25 points"}</label><br/>
        <label className="p-2 shadow border m-1 col-lg-5 col-md-5 col-sm-11 col-xs-11"><input type="radio" name="jackpots" disabled={check[2]} value={"Full house"} id="jack3" required/> {check[2]?"Full house":"Full house: Score-30 points"}</label><br/>
        <label className="p-2 shadow border m-1 col-lg-5 col-md-5 col-sm-11 col-xs-11"><input type="radio" name="jackpots" disabled={check[3]} value={"Small straight"} id="jack4" required/> {check[3]?"Small straight":"Small straight: Score-35 points"}</label><br/>
        <label className="p-2 shadow border m-1 col-lg-5 col-md-5 col-sm-11 col-xs-11"><input type="radio" name="jackpots" disabled={check[4]} value={"Large straight"} id="jack5" required/> {check[4]?"Large straight":"Large straight: Score-40 points"}</label><br/>
        <label className="p-2 shadow border m-1 col-lg-5 col-md-5 col-sm-11 col-xs-11"> <input type="radio" name="jackpots" value={"None of the above: Score 0"} id="jack6"/>  None of the above: Score 0</label><br/>
         <br/>
        <div className="col-4 my-3 p-2"><button className="btn btn-warning col-12 " type="submit" >Select the score</button></div>
        <div className="col-4 my-3 p-2"><div className="btn btn-warning  col-12 " onClick={rollDice}>Roll the dice</div></div>
        <div className="col-4 my-3 p-2"><div className="btn btn-danger  col-12 " onClick={reset}>Reset All</div></div>
      
      </form>
      <p className="text-center shadow border rounded p-2 w-50 mx-auto">Score: {score}</p>
      </div>
     
      
       </div>}





       
    </div>
  );
}

export default App;
