import { useEffect, useState } from "react";

const usePrice = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(1000);

  const getDollarValue = (): number => {
    return currentPrice;
  };

  useEffect(()=>{
      
  },[])

  return {
    getDollarValue,
  };
};

export default usePrice;
