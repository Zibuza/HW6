import React, { useState, useEffect } from 'react';

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
          <img className='divider' src={"/images/divider.png"} alt="Divider" />
          <img className='mobile-divider' src={"/images/mobileDivaider.png"} alt="Mobile Divider" />
        </>
      )}
      <div className="dice" onClick={getAdvice}>
        <img src={"/images/Shape.png"} alt="Dice" />
      </div>
    </div>
  );
}
