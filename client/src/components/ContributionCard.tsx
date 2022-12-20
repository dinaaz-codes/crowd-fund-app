import { Card } from "react-bootstrap";

type Props = {
  title: string;
  totalAmtInEth: number;
  totalAmtInDollar: number;
};

const ContributionCard = ({
  title,
  totalAmtInEth,
  totalAmtInDollar,
}: Props) => {
  return (
    <Card className="text-center">
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>${totalAmtInDollar}</Card.Text>
        <Card.Text>{totalAmtInEth} ETH</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ContributionCard;
