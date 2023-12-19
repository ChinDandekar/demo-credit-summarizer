import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/TransactionsAuthorizeUtils"
import { useNavigate } from "react-router-dom";

export default function TransactionsAuthorizeTable({ transactions }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/transactionssettle/create/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/transactionsauthorize/all"]
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
            Header: 'Time of Transaction',
            accessor: 'initialTime',
        }
    ];

    {
        columns.push(ButtonColumn("Settle", "primary", editCallback, "TransactionsAuthorizeTable"));
        columns.push(ButtonColumn("Clear", "danger", deleteCallback, "TransactionsAuthorizeTable"));
    } 

    return <OurTable
        data={transactions}
        columns={columns}
        testid={"TransactionsAuthorizeTable"}
    />;
};