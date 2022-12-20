import { Button } from "react-bootstrap";

type BtnVariant =  "primary"|"danger"|"warning";

type Props = {
  onClickHandler: () => void;
  variant: BtnVariant;
  text: string;
};

const CustomButton = ({ onClickHandler, variant, text}: Props) => {
  return (
    <Button variant={variant} onClick={onClickHandler} >
      <span>{text}</span>
    </Button>
  );
};

export default CustomButton;
