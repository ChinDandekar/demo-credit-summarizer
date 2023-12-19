import React from "react";
import OurTable from "main/components/OurTable";


export default function HomePendingOrAuthorizedTable({ pendingPaymentsAndAuthorizedTransactions }) {


    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this

    pendingPaymentsAndAuthorizedTransactions.sort((a, b) => (a.initialTime > b.initialTime) ? 1 : -1);

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Amount ($)',
            accessor: 'amount',
        },
        {
            Header: 'Time of Payment or Transaction',
            accessor: 'initialTime',
        },
        {
            Header: 'Type',
            accessor: 'type',
        }
    ];

    return <OurTable
        data={pendingPaymentsAndAuthorizedTransactions}
        columns={columns}
        testid={"HomePendingOrAuthorizedTable"}
    />;
};