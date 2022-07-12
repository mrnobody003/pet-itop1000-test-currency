import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaDollarSign } from 'react-icons/fa';
import BaseRate from './BaseRate';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <FaDollarSign />
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/rate">
            <Nav.Link>Exchange rate</Nav.Link>
          </LinkContainer>
        </Nav>
        <BaseRate />
      </Container>
    </Navbar>
  );
};

export default Header;
