import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import TransactionsAuthorizeTable from 'main/components/TransactionsAuthorize/TransactionsAuthorizeTable';
import TransactionsSettleTable from 'main/components/TransactionsSettle/TransactionsSettleTable';
import { Button } from 'react-bootstrap';

export default function TransactionsIndexPage() {


  const createButton = () => {
    {
        return (
            <Button
                variant="primary"
                href="/transactionsauthorize/create"
                style={{ float: "center" }}
            >
                Create new Transaction Authorization 
            </Button>
        )
    } 
  }
  
  const { data: transactionsAuthorized, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/transactionsauthorize/all"],
      { method: "GET", url: "/api/transactionsauthorize/all" },
      []
    );

    const { data: transactionsSettled, error: _error2, status: _status2 } =
    useBackend(
        // Stryker disable next-line all : don't test internal caching of React Query
        ["/api/transactionssettle/all"],
        { method: "GET", url: "/api/transactionssettle/all" },
        []
      );

  return (
    <BasicLayout>
      
        {createButton()}
      <div className="mt-5">
        <h1>List of Authorized Transactions</h1>
        <TransactionsAuthorizeTable transactions={transactionsAuthorized} />
        <h1>List of Settled Transactions</h1>
        <TransactionsSettleTable transactions={transactionsSettled} />
      </div>
    </BasicLayout>
  )
}