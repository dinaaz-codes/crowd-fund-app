import { useState } from "react";

const usePrice = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(1000);

  const getDollarValue = (): number => {
    return currentPrice;
  };

  return {
    getDollarValue,
  };
};

export default usePrice;
