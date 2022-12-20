import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  isConnected: boolean;
  walletAddress?: string;
};
const ConnectStatus = ({ isConnected, walletAddress }: Props) => {
  return (
    <>
      <span>
        <FontAwesomeIcon
          icon={faCircle}
          color={isConnected ? "green" : "red"}
        />
        {"  "}
        {isConnected && walletAddress ? walletAddress : "Not Connected"}
      </span>
    </>
  );
};

export default ConnectStatus;
