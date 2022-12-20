import { useEffect, useState } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

export let web3: Web3;

const getWeb3 = (): Web3 => {
  if (!web3) web3 = new Web3(getProvider());

  return web3;
};

export const getProvider = () => {
  if (!window.ethereum) throw new Error("Please connect metamask!");

  return window.ethereum;
};

web3 = getWeb3();

const useWeb3 = () => {
  const [activeAccount, setActiveAccount] = useState<string>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>(1);
  const [walletBalance, setWalletBalance] = useState<number>(0);

  const connectWallet = async () => {
    const accounts: string[] = await web3.eth.requestAccounts();
    if (accounts.length <= 0) throw new Error("No accounts found!");

    setActiveAccount(accounts[0]);
    setIsConnected(true);
    setChainId(await getChainId());
    fetchWalletBalance(accounts[0]);
  };

  const fetchWalletBalance = async (account?:string) => {
    const acc = activeAccount ? activeAccount : ( account ?? "")
    const balance = await web3.eth.getBalance(acc);
    setWalletBalance(+web3.utils.fromWei(balance, "ether"));
  };

  const getChainId = async (): Promise<number> => {
    const chainId = await web3.eth.getChainId();

    return web3.utils.toDecimal(chainId);
  };

  const createContract = async (abi: AbiItem[], contractAddress: string) => {
    return new web3.eth.Contract(abi, contractAddress);
  };

  const registerEvents = async () => {
    const provider = getProvider();

    provider.on("accountsChanged", (accounts: Array<string>) => {
      setActiveAccount(accounts[0]);
      fetchWalletBalance(accounts[0]);
    });

    provider.on("chainChanged", (chainId: number) => {
      setChainId(web3.utils.toDecimal(chainId));
      fetchWalletBalance();
    });
  };

  const initializeWeb3 = () => {
    web3.eth.getAccounts().then(async (accounts: string[]) => {
      if (accounts.length > 0) {
        setActiveAccount(accounts[0]);
        setIsConnected(true);
        setChainId(await getChainId());
        fetchWalletBalance(accounts[0]);
      }
    });

    registerEvents();
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  useEffect(() => {
    if (chainId) {
    }
  }, [chainId]);

  return {
    activeAccount,
    chainId,
    isConnected,
    connectWallet,
    createContract,
    fetchWalletBalance,
    walletBalance,
  };
};

export default useWeb3;
