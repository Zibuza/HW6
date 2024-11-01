import React, { useState, useEffect } from 'react';
import image from "../images/divider.png";
import dice from "../images/shape.png";
import mobileDivider from "../images/mobileDivaider.png";
import axios from "axios";
import "../adviceCard/adviceCard.css";

export default function AdviceCard() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);

  const getAdvice = async () => {
    setLoading(true);
    try {
      const resp = await axios.get("https://api.adviceslip.com/advice");
      const advice = resp.data.slip;
      setAdvice(advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className='card'>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <>
          <p>ADVICE #{advice.id}</p>
          <h2>{advice.advice}</h2>
          <img className='divider' src={image} alt="Divider" />
          <img className='mobile-divider' src={mobileDivider} alt="Mobile Divider" />
        </>
      )}
      <div className="dice" onClick={getAdvice}>
        <img src={dice} alt="Dice" />
      </div>
    </div>
  );
}
