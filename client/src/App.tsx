import { Card, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import Contributions from "./components/Contributions";
import usePrice from "./hooks/usePrice";
import Header from "./components/header/Header";
import ContractDetails from "./components/ContractDetails";
import ContributeForm from "./components/ContributeForm";
import useWeb3 from "./hooks/useWeb3";
import useCrowdFund from "./hooks/useCrowdFund";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const { isConnected, connectWallet, activeAccount, walletBalance } =
    useWeb3();
  const { getTotalContribution } = useCrowdFund();
  const { getDollarValue } = usePrice();
  const [balance, setBalance] = useState<{
    valueInEth: number;
    valueInDollar: number;
  }>();

  useEffect(() => {
    getTotalContribution().then((amount) => {
      setBalance(amount);
    });
  }, []);

  const getContributeForm = () => {
    return (
      <Card className="mt-4 p-4">
        <Card.Subtitle>Balance : {walletBalance.toFixed(4)} ETH </Card.Subtitle>
        <ContributeForm activeAccount={activeAccount??""} userBalance={walletBalance}/>
      </Card>
    );
  };

  return (
    <>
      <Header isConnected={isConnected} walletAddress={activeAccount} />
      <Container>
        <Row className="mt-5">
          <Col lg={7}>
            <Contributions
              totalAmtInDollar={balance?.valueInDollar ?? 0}
              totalAmtInEth={balance?.valueInEth ?? 0}
              connectWalletHandler={connectWallet}
              isConnected={isConnected}
            />
            {isConnected && getContributeForm()}
          </Col>
          <Col>
            <ContractDetails activeAccount={activeAccount} isConnected={isConnected} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
