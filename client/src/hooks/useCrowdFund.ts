import { useState } from "react";
import useWeb3, { web3 } from "./useWeb3";
import CrowdFundAbi from "../contracts/CrowdFund.json";
import usePrice from "./usePrice";

const CONTRACT_ADDRESS = "0x58d878618b62093b3387115925e0f9d2C019864B";

const useCrowdFund = () => {
  const { createContract } = useWeb3();
  const { getDollarValue } = usePrice();
  const [contractAddress, setContractAddress] =
    useState<string>(CONTRACT_ADDRESS);

  const getFundName = async () => {
    const contractInstance = getContractInstance();

    return await contractInstance.methods.fundName().call();
  };

  const getOwner = async () => {
    const contractInstance = getContractInstance();

    return await contractInstance.methods.owner().call();
  };

  const getTotalContribution = async () => {
    const contractInstance = getContractInstance();

    const balance = await contractInstance.methods
      .allTimeContributions()
      .call();

    const inEth = +web3.utils.fromWei(balance, "ether");
    return {
      valueInEth: inEth,
      valueInDollar: getDollarValue() * inEth,
    };
  };

  const getBalance = async () => {
    const contractInstance = getContractInstance();

    const balance = await contractInstance.methods.getBalance().call();

    const inEth = +web3.utils.fromWei(balance, "ether");
    return {
      valueInEth: inEth,
      valueInDollar: getDollarValue() * inEth,
    };
  };

  const withdraw = async (activeAddress: string) => {
    if (activeAddress !== (await getOwner()))
      throw new Error("Only owner can withdraw!");
    const contractInstance = getContractInstance();

    const txn = await contractInstance.methods
      .withdraw()
      .send({ from: activeAddress });

    return txn;
  };

  const contribute = async (
    activeAddress: string,
    value: number,
    currentUserBalance: number
  ) => {
    if (currentUserBalance < value)
      throw new Error("User has insufficient funds!");

    const contractInstance = getContractInstance();

    const txn = await contractInstance.methods.contribute().send({
      from: activeAddress,
      value: web3.utils.toWei(value.toString()),
    });

    return txn;
  };

  const getContributionByAddress = async (address: string) => {
    const contractInstance = getContractInstance();

    const contribution = await contractInstance.methods
      .contributions(address)
      .call();

    const inEth = +web3.utils.fromWei(contribution, "ether");
    return {
      valueInEth: inEth,
      valueInDollar: getDollarValue() * inEth,
    };
  };

  const getContractInstance = () => {
    return createContract(CrowdFundAbi as any, CONTRACT_ADDRESS);
  };

  return {
    getFundName,
    getOwner,
    getBalance,
    getContributionByAddress,
    getTotalContribution,
    withdraw,
    contribute,
    contractAddress,
  };
};

export default useCrowdFund;
