import { useState } from "react";
import Chip from "./assets/chip.png";
import Visa from "./assets/visa.png";

export default function Form() {
  const [cardHolder, setCardHolder] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardMonth, setCardMonth] = useState("month");
  const [cardYear, setCardYear] = useState("year");
  const [cardCvv, setCardCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  // const [formattedCardNum, setFormattedCardNum] = useState(cardNum);

  const [isCardHolderError, setIsCardHolderError] = useState(null);
  const [isCardNumError, setIsCardNumError] = useState(null);
  const [isMonthError, setIsMonthError] = useState(null);
  const [isYearError, setIsYearError] = useState(null);
  const [isCvvError, setIsCvvError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    // console.log("Name error? " + isCardHolderError);
    // console.log("Num error? " + isCardNumError);
    // console.log("Month error? " + isMonthError);
    // console.log("Year error? " + isYearError);
    // console.log("CVV error? " + isCvvError);

    if (
      isCardHolderError &&
      isCardNumError &&
      !isMonthError &&
      !isYearError &&
      isCvvError
    ) {
      alert("Credit card information is valid.");
    } else {
      alert("Credit card information is invalid.");
    }
  }

  function validateCardHolder(e) {
    const includesEnoughChracters = e.target.value.length > 3;
    const includesSpaces = e.target.value.includes(" ");
    const includesNoNumbers = !/\d/.test(e.target.value);

    setIsCardHolderError(
      includesEnoughChracters && includesSpaces && includesNoNumbers
    );
  }

  const validateCardNum = (e) => {
    // Check for length
    const isNumLongEnough = e.target.value.length == 16;

    setIsCardNumError(isNumLongEnough);
  };

  const validateMonth = (e) => {
    const monthSelected = e.target.value !== "month";

    setIsMonthError(!monthSelected);
  };

  const validateYear = (e) => {
    const yearSelected = e.target.value !== "year";

    setIsYearError(!yearSelected);
  };

  function handleCvvBlur() {
    setIsFlipped(false);
  }

  function handleCvvFocus() {
    setIsFlipped(true);
  }

  const validateCvv = () => {
    handleCvvBlur();
    const isCvvLongEnough = cardCvv.length == 3;

    setIsCvvError(isCvvLongEnough);
  };

  return (
    <>
      <div className={`card-container ${isFlipped ? "flip" : ""}`}>
        <div className="card-inner">
          <div className="front">
            <div className="img">
              <img src={Chip} />
              <img src={Visa} />
            </div>
            <div className="card-number">
              {cardNum.length > 0 ? cardNum : "XXXXXXXXXXXXX"}
            </div>
            <div className="flexbox">
              <div className="section">
                <span>Card Holder</span>
                <div className="card-holder-name">
                  {cardHolder.length > 0 ? cardHolder : "John Smith"}
                </div>
              </div>
              <div className="section text-right">
                <span>Valid Thru</span>
                <div className="expiration">
                  <span className="exp-month">
                    {cardMonth == "month" ? "MM" : cardMonth}
                  </span>
                  /
                  <span className="exp-year">
                    {cardYear == "year" ? "YY" : cardYear}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="back">
            <div className="black-stripe"></div>
            <div className="section">
              <span>{cardCvv.length > 0 ? cardCvv : "XXX"}</span>
              <div className="white-stripe"></div>
              <img src="./img/visa.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <span>Card Holder</span>
          <input
            type="text"
            value={cardHolder}
            placeholder="John Smith"
            onChange={(e) => setCardHolder(e.target.value)}
            onBlur={validateCardHolder}
          />
          {!isCardHolderError ? (
            <p className="error-msg">
              Must include first and last name. <br /> Must not contain numbers.{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <span>Card Number</span>
          <input
            type="number"
            value={cardNum}
            placeholder="00000000000000000"
            onChange={(e) => setCardNum(e.target.value)}
            onBlur={validateCardNum}
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
            maxLength={16}
          />
          {isCardNumError === false ? (
            <p className="error-msg">Card number must be 16 characters long.</p>
          ) : (
            ""
          )}
        </div>
        <div id="card-expires-cvv" className="flex">
          <div className="input-container">
            <span>Expiration Month</span>
            <div>
              <select
                id="month"
                onChange={(e) => setCardMonth(e.target.value)}
                onChangeCapture={validateMonth}
              >
                <option value="month">month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            {isMonthError ? (
              <p className="error-msg">Must select a month.</p>
            ) : (
              ""
            )}
          </div>
          <div className="input-container">
            <span>Expiration Year</span>
            <div>
              <select
                value={cardYear}
                onChange={(e) => setCardYear(e.target.value)}
                onChangeCapture={validateYear}
              >
                <option value="year">Year</option>
                <option value="25">2025</option>
                <option value="26">2026</option>
                <option value="27">2027</option>
                <option value="28">2028</option>
                <option value="29">2029</option>
                <option value="30">2030</option>
              </select>
              {isYearError ? (
                <p className="error-msg">Must select a year.</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="input-container">
            <span>CVV</span>
            <div>
              <input
                type="number"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                onBlur={validateCvv}
                onFocus={handleCvvFocus}
                onInput={(e) => {
                  if (e.target.value.length > e.target.maxLength)
                    e.target.value = e.target.value.slice(
                      0,
                      e.target.maxLength
                    );
                }}
                maxLength={3}
              />
              {!isCvvError ? (
                <p className="error-msg">Must be 3 digit length.</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <button className="submit-btn">Submit</button>
      </form>
    </>
  );
}
