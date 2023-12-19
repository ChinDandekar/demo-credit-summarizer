import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import PaymentsPostedForm from "main/components/PaymentsPosted/PaymentsPostedForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function PaymentsPostedCreatePage({storybook=false}) {
  let { id } = useParams();

  const { data: paymentsPosted, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/paymentspending?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/paymentspending`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (paymentsPosted) => ({
    url: "/api/paymentsposted/put",
    method: "PUT",
    params: {
      id: paymentsPosted.id,
      amount: paymentsPosted.amount,
      initialTime: paymentsPosted.initialTime,
      finalizedTime: paymentsPosted.finalizedTime
    }
  });




  const onSuccess = (paymentsPosted) => {
    toast(`PaymentsPosted Updated - id: ${paymentsPosted.id} amount: ${paymentsPosted.amount}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/paymentsposted?id=${id}`]
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
        <h1>Edit PaymentsPosted</h1>
        {
          paymentsPosted && <PaymentsPostedForm initialContents={paymentsPosted} submitAction={onSubmit} buttonLabel="Post" />
        }
      </div>
    </BasicLayout>
  )
}

