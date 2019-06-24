import React, {useState} from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import MyStopwatch from "./Stopwatch";
import { countries } from "./countries";
import './App.sass';
const startState = 'start'
const playingState ='play'

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition
}) => {
  const numberOfCountries = Object.keys(countries).length
  const [playState, setPlayState] = useState(startState)
  const [countryNumber, setCountryNumber] = useState(0);
  const [lastRightWrong, setLastRightWrong] = useState(false)
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState('')


  let selectedCountry = Object.values(countries)[countryNumber]  
  let selectedCountryName = selectedCountry.name  
  let selectedCountryEmoji = selectedCountry.emoji

  const correctAnswerActions = () => {
    setLastRightWrong(true)
    setCountryNumber(countryNumber +1)
    resetTranscript()
    setLastCorrectAnswer(selectedCountryName)

  }

  if(playState===startState){
    if(transcript.includes('start')){
      setPlayState(playingState)
    }
    return <div> <h1 className={'is-size-1'}> Say Start to begin </h1> <button onClick={()=>setPlayState(playingState)}> Start </button></div>
  }

  if(countryNumber===numberOfCountries-1){

    if(transcript.includes('home')){
      setPlayState(startState)
      setCountryNumber(0)
    }
    return <div> <p> End of quiz say home to begin</p> <button onClick={()=> {setPlayState(startState); setCountryNumber(0)}}> Back to Start</button></div>
  }
  if (!browserSupportsSpeechRecognition) {
    return <div> <p> This site only works on Chrome </p></div>;
  }

  if(playState===playState){
    if(transcript.includes(selectedCountryName)){
      correctAnswerActions()
    }

    return (
        <div>
          <MyStopwatch></MyStopwatch> 
          {lastRightWrong===true && <p> Correct </p>}
          {lastRightWrong===false && <p> Wrong</p>}
    
          <button onClick={resetTranscript}>Reset</button>
          <span>{transcript}</span>
          <p> Say the country</p>
          <p className={'is-size-1'}>{selectedCountryEmoji}</p>
          <p> Last correct answer </p>
          <p> {lastCorrectAnswer} </p>
        </div>
    )
  }


  return (
    <div>
      <p> Hi</p>
    </div>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);