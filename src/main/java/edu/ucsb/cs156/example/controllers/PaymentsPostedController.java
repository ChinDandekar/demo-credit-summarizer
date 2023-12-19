package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.PaymentsPosted;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.repositories.PaymentsPostedRepository;

import edu.ucsb.cs156.example.controllers.PaymentsPendingController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Tag(name = "PaymentsPosted")
@RequestMapping("/api/paymentsposted")
@RestController
@Slf4j
public class PaymentsPostedController extends ApiController {

    @Autowired
    PaymentsPostedRepository paymentsPostedRepository;

    @Autowired
    PaymentsPendingController paymentsPendingController;

    @Operation(summary= "List all posted payments")
    @GetMapping("/all")
    public Iterable<PaymentsPosted> allPayments() {
        Iterable<PaymentsPosted> commons = paymentsPostedRepository.findAll();
        return commons;
    }

    @Operation(summary= "Get a single posted payment")
    @GetMapping("")
    public PaymentsPosted getById(
            @Parameter(name="id") @RequestParam Long id) {
        PaymentsPosted commons = paymentsPostedRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(PaymentsPosted.class, id));

        return commons;
    }

    @Operation(summary= "Create a new posted payment")
    @PostMapping("/post")
    public PaymentsPosted postPayment(
        @Parameter(name="id") @RequestParam Long id,
        @Parameter(name="amount") @RequestParam int amount,
        @Parameter(name="initialTime") @RequestParam int initialTime,
        @Parameter(name="finalizedTime") @RequestParam int finalizedTime
        )
        {
        log.info("In post setle payment");
        PaymentsPosted commons = new PaymentsPosted();
        commons.setId(id);
        commons.setAmount(amount);
        commons.setInitialTime(initialTime);
        commons.setFinalizedTime(finalizedTime);

        PaymentsPosted savedCommons = paymentsPostedRepository.save(commons);

        return savedCommons;
    }


    @Operation(summary= "Create a new posted payment and delete the pending payment")
    @PutMapping("/put")
    public PaymentsPosted postPostedPaymentAndDeletePendingPayment(
        @Parameter(name="id") @RequestParam Long id,
        @Parameter(name="amount") @RequestParam int amount,
        @Parameter(name="initialTime") @RequestParam int initialTime,
        @Parameter(name="finalizedTime") @RequestParam int finalizedTime
        )
        {
        PaymentsPosted savedPayments = this.postPayment(id, amount, initialTime, finalizedTime);
        paymentsPendingController.deletePayment(id);

        return savedPayments;
    }
}
