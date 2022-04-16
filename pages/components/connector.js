import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
  });
  
  const walletconnect = new WalletConnectConnector({
    rpcUrl: "https://rinkeby.infura.io/v3/fc14a52483224deebaafcbcc2b1059f1",
    bridge: "https://bridge.walletconnect.org",
    qrcode: true
  });

  export const connectors = {
    injected: injected,
    walletConnect: walletconnect,
  };