import React, { useState } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import { countries } from "./countries";
import "./App.sass";
const startState = "start";
const playingState = "play";
const passWord = 'pass'
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
  const numberOfCountries = Object.keys(countries).length;
  const [playState, setPlayState] = useState(startState);
  const [countryNumber, setCountryNumber] = useState(0);
  const [lastRightWrong, setLastRightWrong] = useState(false);
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState("");

  let selectedCountry = Object.values(countries)[countryNumber];
  let selectedCountryName = selectedCountry.name;
  let selectedCountryEmoji = selectedCountry.emoji;

  const correctAnswerActions = () => {
    setLastRightWrong(true);
    setCountryNumber(countryNumber + 1);
    resetTranscript();
    setLastCorrectAnswer(selectedCountryName);
  };

  const skippedAnswerActions = () => {
    setLastRightWrong(false);
    setCountryNumber(countryNumber + 1);
    resetTranscript();
  };
  const CentreColumn = () => {
  if (playState === startState) {
    if (transcript.includes("start")) {
      resetTranscript();
      setPlayState(playingState);
    }
    return (
      <div>
        {" "}
        <h1 className={"is-size-2"}> Game of Flags </h1>{" "}
        <h1 className={"is-size-1 has-text-weight-bold"}> Say Start to begin </h1>{" "}
        <button className={'is-size-4'} onClick={() => setPlayState(playingState)}> Start </button>
      </div>
    );
  }

  if (countryNumber === numberOfCountries - 1) {
    if (transcript.includes("home")) {
      setLastCorrectAnswer('')
      resetTranscript();
      setPlayState(startState);
      setCountryNumber(0);
    }
    return (
      <div>
                <p className={"is-size-2"}> End of quiz</p>{" "}

        <p className={"is-size-1 has-text-weight-bold"}> Say home to begin</p>{" "}
        <button
          onClick={() => {
            setPlayState(startState);
            setCountryNumber(0);
          }}
        >
          {" "}
          Back to Start
        </button>
      </div>
    );
  }
  if (!browserSupportsSpeechRecognition) {
    return (
      <div>
        {" "}
        <p> This site only works on Chrome </p>
      </div>
    );
  }

  if (playState === playState) {
    if (transcript.includes(selectedCountryName)) {
      correctAnswerActions();
    }

    if (transcript.includes(passWord)) {
      skippedAnswerActions();
    }

    return (
      <div className={"is-size-2"}>
              <p className={'has-text-weight-bold'}> Say the country</p>

              <span className={"is-size-6"}>{selectedCountryEmoji}</span>
        <p> Last correct answer: </p>
        <p> {lastCorrectAnswer} </p>
        <span className={'is-size-5'}>{transcript}</span>

      </div>
    );
  }
}

  return (
    <div className="columns">
      <div className={`column is-half has-text-centered`}>
      
      
      <CentreColumn> </CentreColumn>
      
      
       </div>
    </div>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);
