import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function TransactionsSettleForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex

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
                                data-testid="TransactionsSettleForm-id"
                                id="id"
                                type="text"
                                {...register("id")}
                                value={initialContents.id}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                )}
            </Row>
            
            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="amount">Amount (as an integer)</Form.Label>
                        <Form.Control
                            data-testid="TransactionsSettleForm-amount"
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
            </Row>
            <Row>
            {initialContents && (
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="initialTime">Initial Time (as an integer)</Form.Label>
                            <Form.Control
                                data-testid="TransactionsSettleForm-initialTime"
                                id="initialTime"
                                type="number"
                                {...register("initialTime")}
                                value={initialContents.initialTime}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                )}
                <Col>
                <Form.Group className="mb-3" >
                        <Form.Label htmlFor="finalizedTime">Finalized Time (as an integer)</Form.Label>
                        <Form.Control
                            data-testid="TransactionsSettleForm-finalizedTime"
                            id="finalizedTime"
                            type="number"
                            isInvalid={Boolean(errors.finalizedTime)}
                            {...register("finalizedTime", { required: true})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.amount && 'Finalized time is required. '}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>


            <Row>
                <Col>
                    <Button
                        type="submit"
                        data-testid="TransactionsSettleForm-submit"
                    >
                        {buttonLabel}
                    </Button>
                    <Button
                        variant="Secondary"
                        onClick={() => navigate(-1)}
                        data-testid="TransactionsSettleForm-cancel"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>

    )
}

export default TransactionsSettleForm;
