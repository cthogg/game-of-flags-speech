import React, { useState } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import { countries } from "./countriesEasy";
import "./App.sass";
const startState = "start";
const playingState = "play";
const passWord = "skip";

const Footer = () =>
  (    <footer className="footer">
  <div class="content ">
    <p>
      Created by <a href="https://chrishogg.net/">Chris Hogg </a>. Source code on 
      <a href="https://github.com/cthogg/game-of-flags-speech"> Github</a>
    </p>
  </div>
</footer>)


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
          <h1 className={"is-size-2"}> Game of Flags </h1>

          <h1 className={"is-size-3"}>
            {" "}
            {`Rules:`}
              <p>1. Say the name of the country</p>
              <p>2. If you do not know the name say {passWord}</p>
          </h1>{" "}
          <h1 className={"is-size-1 has-text-weight-bold"}>
            {" "}
            Say Start to begin{" "}
          </h1>{" "}
          <p> Uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API"> Web Speech api  </a>so only works on modern versions of Chrome</p>
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
        <div className={'is-size-2'} >
          <p > Finish! </p>{" "}
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
    <div> 
          <div className="columns">
</div>
          <Footer></Footer>

    <div className="columns">
          <div className={`column is-one-fifth`}> <p></p></div>
      <div className={`column `}>
        <CentreColumn> </CentreColumn>
      </div>
    </div>
    </div>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);
