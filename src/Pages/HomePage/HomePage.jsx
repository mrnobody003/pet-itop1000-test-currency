import { Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AiOutlineArrowRight } from 'react-icons/ai';

const HomePage = () => {
  return (
    <Container>
      <h1 className="pt-5 text-center fs-1 text-primary fw-bold">
        Welcome to the My APP
      </h1>
      <LinkContainer to="/rate">
        <Nav.Link className="mx-auto mt-5 text-center text-secondary">
          Find Currency <AiOutlineArrowRight />
        </Nav.Link>
      </LinkContainer>
    </Container>
  );
};
export default HomePage;
