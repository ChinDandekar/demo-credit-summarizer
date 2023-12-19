import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/components/Home/HomePage";


import "bootstrap/dist/css/bootstrap.css";
import TransactionsAuthorizeCreatePage from "main/pages/TransactionAuthorize/TransactionAuthorizeCreatePage";

import TransactionsSettleCreatePage from "main/pages/TransactionsSettle/TransactionsSettleCreatePage";

import TransactionsIndexPage from "main/pages/Transactions/TransactionsIndexPage";

import PaymentsPendingCreatePage from "main/pages/PaymentsPending/PaymentsPendingCreatePage";

import PaymentsIndexPage from "main/pages/Payments/PaymentsIndexPage";

import PaymentsPostedCreatePage from "main/pages/PaymentsPosted/PaymentsPostedCreatePage";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {
          (
            <>
              <Route exact path="/transactionsauthorize/create" element={<TransactionsAuthorizeCreatePage />} />
            </>
          )
        }
        {
          (
            <>
              <Route exact path="/transactionssettle/create/:id" element={<TransactionsSettleCreatePage />} />
            </>
          )
        }
        {
          (
            <>
              <Route exact path="/transactions" element={<TransactionsIndexPage />} />
            </>
          )
        }
        {
          (
            <>
              <Route exact path="/paymentspending/create" element={<PaymentsPendingCreatePage />} />
            </>
          )
        }
        {
          (
            <>
              <Route exact path="/paymentsposted/create/:id" element={<PaymentsPostedCreatePage />} />
            </>
          )
        }
        {
          (
            <>
              <Route exact path="/payments" element={<PaymentsIndexPage />} />
            </>
          )
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
