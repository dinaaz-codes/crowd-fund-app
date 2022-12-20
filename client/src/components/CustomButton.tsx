import { Button } from "react-bootstrap";

type BtnVariant =  "primary"|"danger"|"warning";

type Props = {
  onClickHandler: () => void;
  variant: BtnVariant;
  text: string;
  disabled?:boolean;
};

const CustomButton = ({ onClickHandler, variant, text , disabled=false}: Props) => {
  return (
    <Button variant={variant} onClick={onClickHandler} disabled={disabled} >
      <span>{text}</span>
    </Button>
  );
};

export default CustomButton;
