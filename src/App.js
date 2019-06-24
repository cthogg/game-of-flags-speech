import React, { useState } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import { countries } from "./countries";
import "./App.sass";
const startState = "start";
const playingState = "play";
const passWord = "skip";

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
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [skippedAnswers, setSkippedAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  let selectedCountry = Object.values(countries)[countryNumber];
  let selectedCountryName = selectedCountry.name;
  let selectedCountryEmoji = selectedCountry.emoji;

  const correctAnswerActions = () => {
    setLastRightWrong(true);
    setCorrectAnswers(correctAnswers + 1);
    setCountryNumber(countryNumber + 1);
    resetTranscript();
    setLastCorrectAnswer(selectedCountryName);
  };

  const skippedAnswerActions = () => {
    setSkippedAnswers(skippedAnswers + 1);
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
          <h1 className={"is-size-3"}>
            {" "}
            {`Rules:`}
            <ol>
              <li>1. Say the name of the country</li>
              <li>2. If you do not know the name say {passWord}</li>
            </ol>
          </h1>{" "}
          <h1 className={"is-size-1 has-text-weight-bold"}>
            {" "}
            Say Start to begin{" "}
          </h1>{" "}
        </div>
      );
    }

    if (countryNumber === numberOfCountries - 1) {
      if (transcript.includes("home")) {
        setCorrectAnswers(0);
        setSkippedAnswers(0);
        setLastCorrectAnswer("");
        resetTranscript();
        setPlayState(startState);
        setCountryNumber(0);
      }
      return (
        <div>
          <p className={"is-size-2"}> End of quiz</p>{" "}
          <p> {correctAnswers} correct</p>
          <p> {skippedAnswers} skipped</p>
          <p className={"is-size-1 has-text-weight-bold"}>
            {" "}
            Say home to begin
          </p>{" "}
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
          <p className={"has-text-weight-bold"}> Say pass to skip</p>

          <span className={"is-size-6"}>{selectedCountryEmoji}</span>
          <p> {correctAnswers} correct</p>
          <p> {skippedAnswers} skipped</p>
          <p> Last correct answer: </p>
          <p> {lastCorrectAnswer} </p>
          <span className={"is-size-5"}>{transcript}</span>
        </div>
      );
    }
  };

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
