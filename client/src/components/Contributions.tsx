import { Button, Card } from "react-bootstrap";
import CustomButton from "./CustomButton";

type Props = {
  totalAmtInEth: number;
  totalAmtInDollar:number;
  connectWalletHandler:()=>Promise<void>;
  isConnected:boolean
};

const Contributions = ({ totalAmtInEth ,totalAmtInDollar , connectWalletHandler , isConnected }: Props) => {
  
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Total Contribution : ${totalAmtInDollar} ( {`${totalAmtInEth} Eth`})</Card.Title>
         {!isConnected && <CustomButton onClickHandler={connectWalletHandler} variant="primary" text="Connect with Metamask" />}
      </Card.Body>
    </Card>
  );
};

export default Contributions;
