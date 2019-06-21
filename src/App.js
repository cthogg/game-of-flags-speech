import React, {useState} from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import MyStopwatch from "./Stopwatch";

const startState = 'start'
const playingState ='play'
const endState = 'end'

const countries = {
  "FR": {
    "name": "France",
    "native": "France",
    "phone": "33",
    "continent": "EU",
    "capital": "Paris",
    "currency": "EUR",
    "languages": [
      "fr"
    ],
    "emoji": "🇫🇷",
    "emojiU": "U+1F1EB U+1F1F7"
  },
  "ES": {
    "name": "Spain",
    "native": "España",
    "phone": "34",
    "continent": "EU",
    "capital": "Madrid",
    "currency": "EUR",
    "languages": [
      "es",
      "eu",
      "ca",
      "gl",
      "oc"
    ],
    "emoji": "🇪🇸",
    "emojiU": "U+1F1EA U+1F1F8"
  },
  "GR": {
    "name": "Greece",
    "native": "Ελλάδα",
    "phone": "30",
    "continent": "EU",
    "capital": "Athens",
    "currency": "EUR",
    "languages": [
      "el"
    ],
    "emoji": "🇬🇷",
    "emojiU": "U+1F1EC U+1F1F7"
  }}

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
  let selectedCountryObject = Object.values(countries)[countryNumber]  
  let selectionCountryName = selectedCountryObject.name  
  let selectionCountryEmoji = selectedCountryObject.emoji
  if(playState===startState){
    if(transcript.includes('start')){
      setPlayState(playingState)
    }
    return <div> <MyStopwatch></MyStopwatch> <p> Say Start to begin </p> <button onClick={()=>setPlayState(playingState)}> Start </button></div>
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
    if(transcript.includes(selectionCountryName)){
      setLastRightWrong(true)
      setCountryNumber(countryNumber +1)
      resetTranscript()
      setLastCorrectAnswer(selectionCountryName)
    }

    return (
        <div>
          {lastRightWrong===true && <p> Correct </p>}
          {lastRightWrong===false && <p> Wrong</p>}
    
          <button onClick={resetTranscript}>Reset</button>
          <span>{transcript}</span>
          <p> Say the country</p>
          <p>{selectionCountryEmoji}</p>
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