import { Card, Col, Form, Row } from "react-bootstrap";
import CustomButton from "./CustomButton";
import useCrowdFund from "../hooks/useCrowdFund";
import { useState } from "react";

type Props = {
  activeAccount: string;
  userBalance: number;
};

const ContributeForm = ({ activeAccount, userBalance }: Props) => {
  const { contribute } = useCrowdFund();
  const [value, setValue] = useState(0);
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async () => {
    try{
      setIsSubmitting(true);
      const response = await contribute(activeAccount, value, userBalance);
      console.log(response);
      window.location.reload();
    }catch(err){
      setIsSubmitting(false);
      console.log(err)
    }finally{
      setIsSubmitting(false);
    }

  };

  return (
    <Row className="mt-4 justify-content-lg-center">
      <Col>
        <Form.Control
          type="number"
          placeholder="Amount in Eth"
          value={value}
          onChange={(e) => setValue(+e.target.value)}
        />
      </Col>
      <Col>
        <CustomButton
          onClickHandler={onSubmit}
          text="Contribute"
          variant="primary"
          disabled={isSubmitting}
        />
      </Col>
    </Row>
  );
};

export default ContributeForm;
