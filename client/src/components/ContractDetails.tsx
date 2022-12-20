import { Card, Row } from "react-bootstrap";
import BlockExplorerUrl from "./BlockExplorerUrl";
import ContributionCard from "./ContributionCard";
import CustomButton from "./CustomButton";

const ContractDetails = () => {
  const contractDetails = {
    fundName: "End Hunger Fund",
  };

  const getWithdrawBtn = () => {
    return (
      <div className="text-center mt-4 d-grid gap-2">
        <CustomButton
          variant="danger"
          text="Withdraw"
          onClickHandler={() => {}}
        />
      </div>
    );
  };
  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title>Contract Details</Card.Title>
        <Card.Subtitle className="p-2">
          <BlockExplorerUrl address={"0xa0486d2158b6"} />
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>Contract Name : {contractDetails.fundName}</Card.Text>
        <Card.Text>
          Owner : <BlockExplorerUrl address={"0xa0486d2158b6"} />
        </Card.Text>
        <div className="mb-2">
          <ContributionCard
            title={"Current Balance"}
            totalAmtInDollar={10000}
            totalAmtInEth={0.5}
          />
        </div>
        <div>
          <ContributionCard
            title={"Your Contribution"}
            totalAmtInDollar={10000}
            totalAmtInEth={0.5}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ContractDetails;
