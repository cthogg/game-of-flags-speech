import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

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
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  const transcriptArray =transcript.split(' ')
  const lastWordSpoken = transcriptArray[transcriptArray.length -1]
  let correct = false
  if(lastWordSpoken.includes('Brazil')){
    correct = true
  }


  return (
    <div>
      {correct===true && <p> Correct </p>}
      {correct===false && <p> Wrong!</p>}

      <button onClick={resetTranscript}>Reset</button>
      <span>{transcript}</span>
      <p> Say the country</p>
      <p>🇧🇷</p>
    </div>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);