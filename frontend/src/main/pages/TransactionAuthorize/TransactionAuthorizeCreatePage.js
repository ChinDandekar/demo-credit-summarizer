import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import TransactionForm from "main/components/TransactionsAuthorize/TransactionsAuthorizeForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function TransactionsAuthorizeCreatePage({storybook=false}) {

  const objectToAxiosParams = (transactionAuthorize) => ({
    url: "/api/transactionsauthorize/post",
    method: "POST",
    params: {
      amount: transactionAuthorize.amount,
      initialTime: transactionAuthorize.initialTime
    }
  });

  const onSuccess = (transactionAuthorize) => {
    toast(`New transactionAuthorize Created - id: ${transactionAuthorize.id} amount: ${transactionAuthorize.amount}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/transactionsauthorize/all"]
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
        <h1>Create New Transaction Authorization</h1>
        <TransactionForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}