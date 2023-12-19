import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/PaymentsPendingUtils"
import { useNavigate } from "react-router-dom";

export default function PaymentsPendingTable({ payments }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/paymentsposted/create/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/paymentspending/all"]
    );
    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }


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
            Header: 'Time of Payment',
            accessor: 'initialTime',
        }
    ];

    {
        columns.push(ButtonColumn("Post", "primary", editCallback, "PaymentsPendingTable"));
        columns.push(ButtonColumn("Cancel", "danger", deleteCallback, "PaymentsPendingTable"));
    } 

    return <OurTable
        data={payments}
        columns={columns}
        testid={"PaymentsPendingTable"}
    />;
};