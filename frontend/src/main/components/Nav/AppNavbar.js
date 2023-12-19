import { Container, Nav, Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost"

export default function AppNavbar({currentUrl = window.location.href }) {
  return (
    <>
      {
        (currentUrl.startsWith("http://localhost:3000") ||
          currentUrl.startsWith("http://127.0.0.1:3000")) && (
          <AppNavbarLocalhost url={currentUrl} />
        )
      }
      <Navbar expand="xl" variant="dark" bg="dark" sticky="top" data-testid="AppNavbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Pomelo Credit Card Demo
          </Navbar.Brand>

          <Navbar.Toggle />

          <>
            {/* be sure that each NavDropdown has a unique id and data-testid  */}
          </>

          <Navbar.Collapse className="justify-content-md-evenly">
            {
              (
                <>
                  <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
                  <Nav.Link as={Link} to="/payments">Payments</Nav.Link>
                </>
              )
            }
          </Navbar.Collapse>
        </Container >
      </Navbar >
    </>
  );
}