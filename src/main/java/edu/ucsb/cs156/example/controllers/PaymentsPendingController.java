package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.PaymentsPending;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.repositories.PaymentsPendingRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@Tag(name = "PaymentsPending")
@RequestMapping("/api/paymentspending")
@RestController
public class PaymentsPendingController extends ApiController {

    @Autowired
    PaymentsPendingRepository paymentsPendingRepository;

    @Operation(summary= "List all payments pending")
    @GetMapping("/all")
    public Iterable<PaymentsPending> allPaymentsPending() {
        Iterable<PaymentsPending> payments = paymentsPendingRepository.findAll();
        return payments;
    }

    @Operation(summary= "Get a single payment by id")
    @GetMapping("")
    public PaymentsPending getById(
            @Parameter(name="id") @RequestParam Long id) {
        PaymentsPending paymentsPending = paymentsPendingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(PaymentsPending.class, id));

        return paymentsPending;
    }

    @Operation(summary= "Create a new pending payment")
    @PostMapping("/post")
    public PaymentsPending postPaymentsPending(
            @Parameter(name="amount") @RequestParam int amount,
            @Parameter(name="initialTime") @RequestParam int initialTime)
            throws JsonProcessingException {


        PaymentsPending paymentPending = new PaymentsPending();
        paymentPending.setAmount(amount);
        paymentPending.setInitialTime(initialTime);
        PaymentsPending savedPayment = paymentsPendingRepository.save(paymentPending);
        

        return savedPayment;
    }

    @Operation(summary= "Delete a Payment by id")
    @DeleteMapping("")
    public Object deletePayment(
            @Parameter(name="id") @RequestParam Long id) {
        PaymentsPending payment = paymentsPendingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(PaymentsPending.class, id));

        paymentsPendingRepository.delete(payment);
        return genericMessage("Payment Pending with id %s deleted".formatted(id));
    }

}
