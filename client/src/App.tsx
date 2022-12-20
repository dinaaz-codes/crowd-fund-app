import { Card, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import Contributions from "./components/Contributions";
import usePrice from "./hooks/usePrice";
import Header from "./components/header/Header";
import ContractDetails from "./components/ContractDetails";
import ContributeForm from "./components/ContributeForm";

function App() {
  const { getDollarValue } = usePrice();
  return (
    <>
      <Header isConnected={false} />
      <Container>
        <Row className="mt-5">
          <Col lg={8}>
            <Contributions
              totalAmtInDollar={getDollarValue()}
              totalAmtInEth={5.2}
            />
            <Card className="mt-4 p-4">
              <Card.Subtitle>Balance : 0.8 ETH</Card.Subtitle>
              <ContributeForm />
            </Card>
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
