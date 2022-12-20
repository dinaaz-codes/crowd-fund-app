import { Container, Navbar } from "react-bootstrap";
import ConnectStatus from "./ConnectStatus";

type Props = {
  isConnected: boolean;
  walletAddress?: string;
};

const Header = ({ isConnected, walletAddress }: Props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">End Hunger Fund</Navbar.Brand>
        <ConnectStatus isConnected={isConnected} walletAddress={walletAddress} />
      </Container>
    </Navbar>
  );
};

export default Header;
