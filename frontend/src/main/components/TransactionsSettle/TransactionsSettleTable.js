import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/TransactionsSettleUtils"
import { useNavigate } from "react-router-dom";

export default function TransactionsSettleTable({ transactions }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/transactionssettle/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/transactionssettle/all"]
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
            Header: 'Initial Time',
            accessor: 'initialTime',
        },
        {
            Header: 'Finalized Time',
            accessor: 'finalizedTime',
        }
    ];

    

    return <OurTable
        data={transactions}
        columns={columns}
        testid={"TransactionsSettleTable"}
    />;
};