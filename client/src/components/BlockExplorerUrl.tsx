type Props = {
  address: string;
};

const getBlockExplorerUrl = (address: string): string => {
  const baseUrl = "https://goerli.etherscan.io/tx/address";
  return `${baseUrl}/${address}`;
};
const BlockExplorerUrl = ({ address }: Props) => {
  return <a href={getBlockExplorerUrl(address)}>{address}</a>;
};

export default BlockExplorerUrl;
