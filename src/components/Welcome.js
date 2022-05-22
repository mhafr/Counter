import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { CounterContext } from "../context/CounterContext";
const Welcome = () => {
  const {
    currentAccount,
    increase,
    counter,
    decrease,
    isLoading,
    connectWC
  } = useContext(CounterContext);


  return (
    <section className="welcome-container">
      <div className="welcome-grid">
        <article className="welcome-center">
          <div className="info">
            <h3>Bored of calling annoying functions? I got you bro!</h3>
            <p className="info-p">
              You can increase or decrease safely with the reliability of the
              künkef buttons.
            </p>
          </div>
          {!currentAccount && (
            <button
              className="wallet-btn"
              type="button"
              onClick={connectWC}
            >
              Connect Wallet
            </button>
          )}
        </article>
        <header>
          <div className="eth-card">
            <div className="icons-container">
              <div className="eth-icon">
                <SiEthereum className="icon" />
              </div>
              <BsInfoCircle className="info-icon" />
            </div>
            <div className="p-container">
              {currentAccount ? (
                <p className="p">{`${currentAccount.slice(
                  0,
                  5
                )}  ...${currentAccount.slice(currentAccount.length - 4)}`}</p>
              ) : (
                <p className="p">Address</p>
              )}
              <p className="p">Ethereum</p>
            </div>
          </div>
          <div className="inc-dec">
            {currentAccount ? <button
          disabled={false}
          className="inc-btn"
          type="button"
          onClick={increase}
          
        >
          Increase
        </button> : <button
          disabled={true}
          className="inc-btn"
          type="button"
          onClick={increase}
          style={{
            backgroundColor: "rgb(135, 141, 139)",
            color: "#fff",
            cursor: "default",
          }}
        >
          Increase
        </button>}

            {isLoading ? (
              <p
                style={{
                  marginBottom: "0",
                  fontSize: "1.25rem",
                  backgroundColor: "#fff",
                  width: "3rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                  display: "grid",
                  placeItems: "center",
                  color: "black",
                }}
              >
                <svg className="spinner" viewBox="0 0 50 50">
                  <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                  ></circle>
                </svg>
              </p>
            ) : (
              <p
                style={{
                  marginBottom: "0",
                  fontSize: "1.25rem",
                  backgroundColor: "#fff",
                  width: "3rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                  display: "grid",
                  placeItems: "center",
                  color: "black",
                }}
              >
                {counter}
              </p>
            )}
            {currentAccount ? <button
          disabled={false}
          className="dec-btn"
          type="button"
          onClick={decrease}
          
        >
          Decrease
        </button> : <button
          disabled={true}
          className="dec-btn"
          type="button"
          onClick={decrease}
          style={{
            backgroundColor: "rgb(135, 141, 139)",
            color: "#fff",
            cursor: "default",
          }}
        >
          Decrease
        </button>}
          </div>
        </header>
      </div>
      <h2 className="künkef">Künkef buttons</h2>
    </section>
  );
};

export default Welcome;
