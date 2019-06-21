import React, {useState} from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const countries = {
  "AD": {
    "name": "Andorra",
    "native": "Andorra",
    "phone": "376",
    "continent": "EU",
    "capital": "Andorra la Vella",
    "currency": "EUR",
    "languages": [
      "ca"
    ],
    "emoji": "🇦🇩",
    "emojiU": "U+1F1E6 U+1F1E9"
  },
  "AE": {
    "name": "United Arab Emirates",
    "native": "دولة الإمارات العربية المتحدة",
    "phone": "971",
    "continent": "AS",
    "capital": "Abu Dhabi",
    "currency": "AED",
    "languages": [
      "ar"
    ],
    "emoji": "🇦🇪",
    "emojiU": "U+1F1E6 U+1F1EA"
  },
  "AF": {
    "name": "Afghanistan",
    "native": "افغانستان",
    "phone": "93",
    "continent": "AS",
    "capital": "Kabul",
    "currency": "AFN",
    "languages": [
      "ps",
      "uz",
      "tk"
    ],
    "emoji": "🇦🇫",
    "emojiU": "U+1F1E6 U+1F1EB"
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
  const [countryNumber, setCountryNumber] = useState(0);
  const [lastRightWrong, setLastRightWrong] = useState(false)
  let selectedCountryObject = Object.values(countries)[countryNumber]  
  let selectionCountryName = selectedCountryObject.name  
  let selectionCountryEmoji = selectedCountryObject.emoji
  if(countryNumber===numberOfCountries-1){
    return <div> <p> End of quiz</p></div>
  }
  if(transcript.includes(selectionCountryName)){
    setLastRightWrong(true)
    setCountryNumber(countryNumber +1)
    resetTranscript()
  }
  if (!browserSupportsSpeechRecognition) {
    return <div> <p> This site only works on Chrome </p></div>;
  }



  return (
    <div>
      {lastRightWrong===true && <p> Correct </p>}
      {lastRightWrong===false && <p> Wrong!</p>}

      <button onClick={resetTranscript}>Reset</button>
      <span>{transcript}</span>
      <p> Say the country</p>
      <p>{selectionCountryEmoji}</p>
    </div>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);