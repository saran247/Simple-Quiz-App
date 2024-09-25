import React, { useRef, useState } from 'react'
import './Quiz.css'
import {data} from '../assets/data';
const quiz = () => {
  let[index,setIndex]=useState(0);
  let[question,setQuestion]=useState(data[index]);
  let [lock,setLock]=useState(false);
  let [score,setScore]=useState(0);
  let [result,setResult]=useState(false)

  let Option1=useRef(null);
  let Option2=useRef(null);
  let Option3=useRef(null);
  let Option4=useRef(null);

  let Option_array=[Option1,Option2,Option3,Option4];

  const checkans =(e,ans)=>{
    if(lock===false){
      if(question.ans===ans){
        e.target.classList.add("correct");
        setLock(true)
        setScore(prev=>prev+1)
      }
      else{
        e.target.classList.add("wrong");
        setLock(true)
        Option_array[question.ans-1].current.classList.add('correct');
      }
    }

  }

  const next=()=>{
    if(lock===true){
      if(index===data.length-1){
        setResult(true);
        return 0;
      }
      
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      Option_array.map((Option)=>{
      Option.current.classList.remove('wrong')
      Option.current.classList.remove('correct')
      return null;

      })
    }
  }
  const reset =()=>{
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  const greetmsg=()=>{
    let q=data.length;
    let percent=(score/q)*10;
    if(percent>=7){
      return 'Awesome!'
    }
    else if(percent>=4 && percent<7){
      return 'Nice Try!'
    }
    else if (percent<4){
      return 'Better Luck Next Time !'
    }
  }
  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        {result?<></>:<>
          <h2 className='ques_dis'>{index+1}. {question.question}</h2>
        <ul>
            <li ref={Option1} onClick={(e)=>{checkans(e,1)}}>{question.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkans(e,2)}}>{question.option2}</li>
            <li ref={Option3}onClick={(e)=>{checkans(e,3)}}>{question.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkans(e,4)}}>{question.option4}</li>
            <button onClick={next}> {index === data.length - 1 ? 'Submit' : 'Next'}
</button>            <div className='index'> {index+1} of {data.length} questions</div>
        </ul>
        </>
        }
        {result?<>
        <h2></h2>
        <h2 className='score'> {greetmsg()} You Scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button></>:<></>}

    </div>
  )
}

export default quiz