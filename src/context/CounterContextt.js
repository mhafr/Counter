import React, { useState, useEffect } from "react";
import { contractABI, contractAddress } from "../utils/constantss";
import { ethers } from "ethers";

export const CounterContext = React.createContext();

const { ethereum } = window;

// const getEthereumContract = () => {
//   let provider = ethers.providers.Web3Provider(ethereum);
//   const signer = provider.getSigner();
//   const counterContract = new ethers.Contract(
//     contractAddress,
//     contractABI,
//     signer
//   );

//   return counterContract;
// };

export const CounterProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [provider, setProvider] = useState(
    new ethers.providers.WebSocketProvider(
      "wss://rinkeby.infura.io/ws/v3/72c9518af24346be88fb264397e2859a",
      "rinkeby"
    )
  );
  const [counterContract, setCounterContract] = useState(
    new ethers.Contract(contractAddress, contractABI, provider)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const increase = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const counterCont = new ethers.Contract(contractAddress, contractABI, signer)

      let txn = await counterCont.increase();
      setIsLoading(true)
      await txn.wait();
      setIsLoading(false)
      getCounter();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const decrease = async () => {
    try {
      if (!ethereum) return alert("Please install metamask.");

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const counterCont = new ethers.Contract(contractAddress, contractABI, signer)

      let txn = await counterCont.decrease()
      setIsLoading(true)
      await txn.wait()
      setIsLoading(false)
      getCounter()
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.")
    }
  };

  const getCounter = async () => {
    try {
      if (ethereum) {
        const result = await counterContract.getCounter();
        setCounter(result);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };
  const start = () => {
    counterContract.on("Increased", (address, amount) => {
      getCounter();
    });
    counterContract.on("Decreased", (address, amount) => {
      getCounter();
    });
  };
  useEffect(()=>{
    start()
    getCounter()
  },[counterContract])

  const parseCounter = parseInt(counter["_hex"], 16);
  


  return (
    <CounterContext.Provider
      value={{ connectWallet, currentAccount, increase, parseCounter, decrease, isLoading }}
    >
      {children}
    </CounterContext.Provider>
  );
};
