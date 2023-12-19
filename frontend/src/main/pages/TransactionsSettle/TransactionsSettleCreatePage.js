import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import TransactionsSettleForm from "main/components/TransactionsSettle/TransactionsSettleForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function TransactionsSettleCreatePage({storybook=false}) {
  let { id } = useParams();

  const { data: transactionsSettle, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/transactionsauthorize?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/transactionsauthorize`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (transactionsSettle) => ({
    url: "/api/transactionssettle/put",
    method: "PUT",
    params: {
      id: transactionsSettle.id,
      amount: transactionsSettle.amount,
      initialTime: transactionsSettle.initialTime,
      finalizedTime: transactionsSettle.finalizedTime
    }
  });



  const onSuccess = (transactionsSettle) => {
    toast(`TransactionsSettle Updated - id: ${transactionsSettle.id} amount: ${transactionsSettle.amount}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/transactionssettle?id=${id}`]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess && !storybook) {
    return <Navigate to="/transactions" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Settle this Transaction</h1>
        {
          transactionsSettle && <TransactionsSettleForm initialContents={transactionsSettle} submitAction={onSubmit} buttonLabel="Settle" />
        }
      </div>
    </BasicLayout>
  )
}

