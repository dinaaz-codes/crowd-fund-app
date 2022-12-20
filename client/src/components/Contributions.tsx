import { Button, Card } from "react-bootstrap";
import CustomButton from "./CustomButton";

type Props = {
  totalAmtInEth: number;
  totalAmtInDollar:number
};

const Contributions = ({ totalAmtInEth ,totalAmtInDollar  }: Props) => {
  
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Total Contribution : ${totalAmtInDollar} ( {`${totalAmtInEth} Eth`})</Card.Title>
        <CustomButton onClickHandler={()=>{}} variant="primary" text="Connect with Metamask" />
      </Card.Body>
    </Card>
  );
};

export default Contributions;
