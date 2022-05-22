import React from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const WalletConnect = () => {
  const connectWalletConnect = async () => {
    try {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: "INFURA_ID", // required
          },
        },
      };

      const web3Modal = new Web3Modal({
        network: "rinkeby", // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });

      await web3Modal.connect();

      //const provider = new ethers.providers.Web3Provider(instance);
      //const signer = provider.getSigner();
    } catch (error) {
      console.log(error.message);
      throw new Error("No ethereum object");
    }
  };

  return (
    <div className="main-app">
      <nav className="navbar-container">
        <div className="navbar-brand">
          <h1>WalletConnect App</h1>
        </div>
        <div className="navbar-end">
          <button onClick={connectWalletConnect}>Connect Wallet</button>
        </div>
      </nav>
    </div>
  );
};

export default WalletConnect;
