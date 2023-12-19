import React from "react";
import OurTable from "main/components/OurTable";

export default function HomePostedOrSettledTable({ postedPaymentsAndSettledTransactions }) {
    // Stryker restore all 
    // Stryker disable next-line all : TODO try to make a good test for this

    const data = postedPaymentsAndSettledTransactions.sort((a, b) => (a.initialTime > b.initialTime) ? 1 : -1);
    const latestThree = data.slice(Math.max(data.length - 3, 0));

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
            Header: 'Time Payment or Transaction was initiated',
            accessor: 'initialTime',
        },
        {
            Header: "Time Payment or Transaction was finalized",
            accessor: 'finalizedTime',
        },
        {
            Header: 'Type',
            accessor: 'type',
        }
    ];


    //const limitedData = postedPaymentsAndSettledTransactions.slice(0, 3);

    return (
        <OurTable
            data={latestThree}
            columns={columns}
            testid={"HomePostedOrSettledTable"}
        />
    );
};