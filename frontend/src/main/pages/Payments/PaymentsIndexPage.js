import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import PaymentsPendingTable from 'main/components/PaymentsPending/PaymentsPendingTable';
import PaymentsPostedTable from 'main/components/PaymentsPosted/PaymentsPostedTable';
import { Button } from 'react-bootstrap';

export default function PaymentsIndexPage() {


  const createButton = () => {
    {
        return (
            <Button
                variant="primary"
                href="/paymentspending/create"
                style={{ float: "right" }}
            >
                Create new Pending Payment 
            </Button>
        )
    } 
  }
  
  const { data: paymentsPending, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/paymentspending/all"],
      { method: "GET", url: "/api/paymentspending/all" },
      []
    );

    const { data: paymentsPosted, error: _error2, status: _status2 } =
    useBackend(
        // Stryker disable next-line all : don't test internal caching of React Query
        ["/api/paymentsposted/all"],
        { method: "GET", url: "/api/paymentsposted/all" },
        []
      );

  return (
    <BasicLayout>
      <div className="pt-2">
        {createButton()}
        <h1>List of Pending Payments</h1>
        <PaymentsPendingTable payments={paymentsPending} />
        <h1>List of Posted Payments</h1>
        <PaymentsPostedTable payments={paymentsPosted} />
      </div>
    </BasicLayout>
  )
}