import { Card, Col, Form, Row } from "react-bootstrap";
import CustomButton from "./CustomButton";

const ContributeForm = () => {
  return (
    <Row className="mt-4 justify-content-lg-center">
      <Col >
        <Form.Control type="number" placeholder="Amount in Eth" />
      </Col>

      <Col>
        <CustomButton
          onClickHandler={() => {}}
          text="Contribute"
          variant="primary"
        />
      </Col>
    </Row>
  );
};

export default ContributeForm;
