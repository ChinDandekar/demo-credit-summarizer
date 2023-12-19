import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import HomePendingOrAuthorizedTable from './HomePendingOrAuthorizedTable';
import CreditProgressBar from './HomeCreditProgressBar';
import HomePostedOrSettledTable from './HomePostedOrSettledTable';
import {Row, Col } from 'react-bootstrap';



export default function HomePage() {


  
  const { data: pendingPaymentsAndAuthorizedTransactions, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/homecontroller/pendingOrAuthorized"],
      { method: "GET", url: "/api/homecontroller/pendingOrAuthorized" },
      []
    );
  
  const {data: availableCredit, error: _error1, status: _status1} =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/homecontroller/availableCredit"],
      { method: "GET", url: "/api/homecontroller/availableCredit" },
      []
    );

  const {data: initialCredit, error: _error3, status: _status3} =
  useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/homecontroller/totalCredit"],
    { method: "GET", url: "/api/homecontroller/totalCredit" },
    []
  );


  const {data: payableBalance, error: _error4, status: _status4} =
  useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/homecontroller/payableBalance"],
    { method: "GET", url: "/api/homecontroller/payableBalance" },
    []
  );

    const { data: postedPaymentsAndSettledTransactions, error: _error2, status: _status2 } =
    useBackend(
        // Stryker disable next-line all : don't test internal caching of React Query
        ["/api/homecontroller/postedOrSettled"],
        { method: "GET", url: "/api/homecontroller/postedOrSettled" },
        []
      );

    
  
  return (
    <BasicLayout>
      <div className="pt-1">
        <h1>Welcome to the Pomelo Credit Card App!</h1>
        <h2>Here is your credit card summary</h2>
      </div>
      <Row className="mt-5">
        <Col>
          <h3>Available Credit: </h3>
          <CreditProgressBar creditProgressBar = {{availableCredit, initialCredit}} />
        </Col>

        <Col>
          <h3>Payable Balance: ${payableBalance}</h3>
        </Col>
      </Row>
      
            <Row className="mt-5">
              <Col>
              <div className="pt-1">
                <h3>List of Pending Payments and Authorized Transactions</h3>
                <HomePendingOrAuthorizedTable pendingPaymentsAndAuthorizedTransactions={pendingPaymentsAndAuthorizedTransactions} />
              </div>
              </Col>
              <Col>
                <h3>List of Posted Payments and Settled Transactions</h3>
                <HomePostedOrSettledTable postedPaymentsAndSettledTransactions={postedPaymentsAndSettledTransactions} /> 
              </Col>
            </Row>
          </BasicLayout>
        )
      }
