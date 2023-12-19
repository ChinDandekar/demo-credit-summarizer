import { Container } from "react-bootstrap";
import Footer from "main/components/Nav/Footer";
import AppNavbar from "main/components/Nav/AppNavbar";
import { useSystemInfo} from "main/utils/systemInfo";

export default function BasicLayout({ children }) {

  const { data: systemInfo } = useSystemInfo();


  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar systemInfo={systemInfo} />
      <Container expand="xl" className="pt-4 flex-grow-1">
        {children}
      </Container>
      <Footer />
    </div>
  );
}