import { Card } from "react-bootstrap";
import BlockExplorerUrl from "./BlockExplorerUrl";
import ContributionCard from "./ContributionCard";
import CustomButton from "./CustomButton";
import useCrowdFund from "../hooks/useCrowdFund";
import { useEffect, useState } from "react";

type Props = {
  activeAccount?: string;
  isConnected: boolean;
};

const ContractDetails = ({ activeAccount, isConnected }: Props) => {
  const crowdFundContract = useCrowdFund();

  const [fundName, setFundName] = useState<string>();
  const [owner, setOwner] = useState<string>();
  const [balance, setBalance] = useState<{
    valueInEth: number;
    valueInDollar: number;
  }>();
  const [userContribution, setUserContribution] = useState<{
    valueInEth: number;
    valueInDollar: number;
  }>();

  useEffect(() => {
    crowdFundContract.getFundName().then((name) => {
      setFundName(name);
    });

    crowdFundContract.getOwner().then((owner) => {
      setOwner(owner);
    });

    crowdFundContract.getBalance().then((balance) => {
      setBalance({
        valueInEth: balance.valueInEth,
        valueInDollar: balance.valueInDollar,
      });
    });

    if (activeAccount)
      crowdFundContract
        .getContributionByAddress(activeAccount)
        .then((contribution) => {
          setUserContribution(contribution);
        });
  }, [activeAccount]);

  const onWithdraw = async () =>{
    const response = await crowdFundContract.withdraw(activeAccount?? "");
  }

  const getWithdrawBtn = () => {
   
    return (
      <div className="text-center mt-4 d-grid gap-2">
        <CustomButton
          variant="danger"
          text="Withdraw"
          onClickHandler={onWithdraw}
        />
      </div>
    );
  };

  const getUserContributionCard = () => {
    return (
      <div>
        <ContributionCard
          title={"Your Contribution"}
          totalAmtInDollar={userContribution?.valueInDollar ?? 0}
          totalAmtInEth={userContribution?.valueInEth ?? 0}
        />
      </div>
    );
  };
  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title>Contract Details</Card.Title>
        <Card.Subtitle className="p-2">
          <BlockExplorerUrl address={crowdFundContract.contractAddress} />
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>Contract Name : {fundName}</Card.Text>
        <Card.Text>
          Owner : <BlockExplorerUrl address={owner ?? ""} />
        </Card.Text>
        <div className="mb-2">
          <ContributionCard
            title={"Current Balance"}
            totalAmtInDollar={balance?.valueInDollar ?? 0}
            totalAmtInEth={balance?.valueInEth ?? 0}
          />
        </div>
        {isConnected && activeAccount && getUserContributionCard()}
        {activeAccount == owner && getWithdrawBtn() }
      </Card.Body>
    </Card>
  );
};

export default ContractDetails;
