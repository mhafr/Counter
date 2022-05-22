import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constants";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const { ethereum } = window;

export const CounterContext = React.createContext();

export const CounterProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [counter, setCounter] = useState("");
  const [provider, setProvider] = useState(
    new ethers.providers.WebSocketProvider(
      "wss://rinkeby.infura.io/ws/v3/72c9518af24346be88fb264397e2859a",
      "rinkeby"
    )
  );
  const [contract, setContract] = useState(
    new ethers.Contract(contractAddress, contractABI, provider)
  );
  const [isLoading, setIsLoading] = useState(false);

  const doesWalletExist=async()=>{
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
  }

  const connectWC = async () => {
    try {      
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, 
          options: {
            infuraId: "INFURA_ID",
          },
        },
      };
  
      const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
      });
      web3Modal.clearCachedProvider();
  
      const account = await web3Modal.connect();
      new ethers.providers.Web3Provider(account)
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object")
    }
  };

  const increase = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const counterContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const txn = await counterContract.increase();

      setIsLoading(true);
      await txn.wait();
      setIsLoading(false);
      getCounter();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  const decrease = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const counterContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const txn = await counterContract.decrease();
      setIsLoading(true);
      await txn.wait();
      setIsLoading(false);
      getCounter();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const getCounter = useCallback(async () => {
    try {
      if (ethereum) {
        const txn = parseInt((await contract.getCounter())["_hex"],16);
        setCounter(txn);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  }, [contract]);

  useEffect(() => {
    const start = () => {
      contract.on("Increased", (address, amount) => {
        getCounter();
      });
      contract.on("Decreased", (address, amount) => {
        getCounter();
      });
    };
    start();
    doesWalletExist()
    getCounter();
  }, [contract, getCounter]);

  return (
    <CounterContext.Provider
      value={{
        increase,
        currentAccount,
        decrease,
        counter,
        isLoading,
        connectWC,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};
