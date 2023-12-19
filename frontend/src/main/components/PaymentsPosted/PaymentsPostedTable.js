import React from "react";
import OurTable from "main/components/OurTable";

export default function PaymentsPostedTable({ payments }) {



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
            Header: 'Initial Time',
            accessor: 'initialTime',
        },
        {
            Header: 'Finalized Time',
            accessor: 'finalizedTime',
        }
    ];

    

    return <OurTable
        data={payments}
        columns={columns}
        testid={"PaymentsPostedTable"}
    />;
};