import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-light pt-3 pt-md-4 pb-4 pb-md-5">
      <Container>
        <p>
          This is a webapp that allows a user to upload a upload new transactions, payments, and generates a summary of them.
        </p>
      </Container>
    </footer>
  );
}