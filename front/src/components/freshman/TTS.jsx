import React, { useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { useRecoilState } from "recoil";
import { tts_recoil } from "../../utils/atoms";
export default function TTS({ message }) {
  const [tts, setTts] = useRecoilState(tts_recoil);

  useEffect(() => {
    // SSML 생성
    const ssmlTemplate = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ko-KR"> 
        <voice name="ko-KR-SeoHyeonNeural"> 
          <prosody rate="+90.00%" pitch="high"> ${message} </prosody> 
        </voice> 
      </speak>
    `;

    // 오디오 권한 요청
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
        const speechConfig = sdk.SpeechConfig.fromSubscription(
          "b823a8aa889a41cb9f9349b10b626e9e",
          "koreacentral"
        );
        speechConfig.speechSynthesisVoiceName = "ko-KR-InJoonNeural";
        const synthesizer = new sdk.SpeechSynthesizer(
          speechConfig,
          audioConfig
        );

        synthesizer.speakSsmlAsync(
          ssmlTemplate,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              setTts(Math.floor(result.audioDuration / 10000));
            } else {
              console.error(
                "Speech synthesis canceled, " + result.errorDetails
              );
            }
            synthesizer.close();
          },
          (err) => {
            console.trace("err - " + err);
            synthesizer.close();
          }
        );
      })
      .catch((err) => {
        console.error("Access denied:", err);
      });
  }, [message]);

  return null;
}
