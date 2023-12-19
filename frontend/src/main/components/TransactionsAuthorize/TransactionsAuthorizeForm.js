import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'


function TransactionsAuthorizeForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all


    
    
    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks


    // Stryker disable next-line all
    //const amount_regex = /(1-9\d)/i; // Accepts from 1900-2099 followed by 1-4.  Close enough.

    return (

        <Form onSubmit={handleSubmit(submitAction)}>


            <Row>

                {initialContents && (
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="id">Id</Form.Label>
                            <Form.Control
                                data-testid="TransactionsAuthorizeForm-id"
                                id="id"
                                type="text"
                                {...register("id")}
                                value={initialContents.id}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                )}

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="amount">Amount (as an integer)</Form.Label>
                        <Form.Control
                            data-testid="TransactionsAuthorizeForm-amount"
                            id="amount"
                            type="number"
                            isInvalid={Boolean(errors.amount)}
                            {...register("amount", { required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.amount && 'Amount is required. '}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" >
                        <Form.Label htmlFor="Time">Time (as an integer)</Form.Label>
                        <Form.Control
                            data-testid="TransactionsAuthorizeForm-initalTime"
                            id="initialTime"
                            type="number"
                            isInvalid={Boolean(errors.initialTime)}
                            {...register("initialTime", { required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.amount && 'Time is required. '}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button
                        type="submit"
                        data-testid="TransactionsAuthorizeForm-submit"
                    >
                        {buttonLabel}
                    </Button>
                    <Button
                        variant="Secondary"
                        onClick={() => navigate(-1)}
                        data-testid="TransactionsAuthorizeForm-cancel"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>

    )
}

export default TransactionsAuthorizeForm;
