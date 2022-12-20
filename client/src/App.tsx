import { Card, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import Contributions from "./components/Contributions";
import usePrice from "./hooks/usePrice";
import Header from "./components/header/Header";
import ContractDetails from "./components/ContractDetails";
import ContributeForm from "./components/ContributeForm";
import useWeb3 from "./hooks/useWeb3";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const { isConnected, connectWallet, activeAccount, walletBalance } =
    useWeb3();
  const { getDollarValue } = usePrice();

  const getContributeForm = () => {
    
    return (
      <Card className="mt-4 p-4">
        <Card.Subtitle>Balance : {walletBalance.toFixed(4)} ETH </Card.Subtitle>
        <ContributeForm />
      </Card>
    );
  };

  return (
    <>
      <Header isConnected={isConnected} walletAddress={activeAccount} />
      <Container>
        <Row className="mt-5">
          <Col lg={8}>
            <Contributions
              totalAmtInDollar={getDollarValue()}
              totalAmtInEth={5.2}
              connectWalletHandler={connectWallet}
              isConnected={isConnected}
            />
            {isConnected && getContributeForm()}
          </Col>
          <Col>
            <ContractDetails />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
