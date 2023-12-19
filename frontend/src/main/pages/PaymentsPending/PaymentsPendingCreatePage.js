import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import PaymentForm from "main/components/PaymentsPending/PaymentsPendingForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function PaymentsPendingCreatePage({storybook=false}) {

  const objectToAxiosParams = (paymentPending) => ({
    url: "/api/paymentspending/post",
    method: "POST",
    params: {
      amount: paymentPending.amount,
      initialTime: paymentPending.initialTime
    }
  });

  const onSuccess = (paymentPending) => {
    toast(`New paymentPending Created - id: ${paymentPending.id} amount: ${paymentPending.amount}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/paymentspending/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess && !storybook) {
    return <Navigate to="/payments" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Pending Payment</h1>
        <PaymentForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}