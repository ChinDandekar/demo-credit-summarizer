package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.HomePendingOrAuthorized;
import edu.ucsb.cs156.example.entities.PaymentsPosted;
import edu.ucsb.cs156.example.entities.PaymentsPending;
import edu.ucsb.cs156.example.entities.TransactionsAuthorize;
import edu.ucsb.cs156.example.entities.TransactionsSettle;
import edu.ucsb.cs156.example.entities.HomePendingOrAuthorized;
import edu.ucsb.cs156.example.entities.HomePostedOrSettled;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;

import edu.ucsb.cs156.example.controllers.PaymentsPendingController;
import edu.ucsb.cs156.example.controllers.PaymentsPostedController;
import edu.ucsb.cs156.example.controllers.TransactionsSettleController;
import edu.ucsb.cs156.example.controllers.TransactionsAuthorizeController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

import java.util.Iterator;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Tag(name = "Home")
@RequestMapping("/api/homecontroller")
@RestController
@Slf4j


public class HomeController extends ApiController {

    final int initialCredit = 1000;

    @Autowired
    PaymentsPostedController paymentsPostedController;

    @Autowired
    PaymentsPendingController paymentsPendingController;

    @Autowired
    TransactionsSettleController transactionsSettleController;

    @Autowired
    TransactionsAuthorizeController transactionsAuthorizeController;

    @Operation(summary= "Gets the payable balance")
    @GetMapping("/payableBalance")
    public int getPayableBalance() {
        int payableBalance = 0;
        Iterable<PaymentsPending> paymentsPending = paymentsPendingController.allPaymentsPending();
        for (PaymentsPending paymentPending : paymentsPending) {
            payableBalance += paymentPending.getAmount();
        }

        Iterable<PaymentsPosted> paymentsPosted = paymentsPostedController.allPayments();
        for (PaymentsPosted paymentPosted : paymentsPosted) {
            payableBalance += paymentPosted.getAmount();
        }

        Iterable<TransactionsSettle> transactionsSettle = transactionsSettleController.allTransactionsSettled();
        for (TransactionsSettle transactionSettle : transactionsSettle) {
            payableBalance += transactionSettle.getAmount();
        }
        return payableBalance;
    }

    @Operation(summary= "Gets the available amount of credit")
    @GetMapping("/availableCredit")
    public int getAvailableCredit() {
        int availableCredit = initialCredit;
        Iterable<PaymentsPosted> paymentsPosted = paymentsPostedController.allPayments();
        for (PaymentsPosted paymentPosted : paymentsPosted) {
            availableCredit -= paymentPosted.getAmount();
        }
        
        Iterable<TransactionsSettle> transactionsSettle = transactionsSettleController.allTransactionsSettled();
        for (TransactionsSettle transactionSettle : transactionsSettle) {
            availableCredit -= transactionSettle.getAmount();
        }
        Iterable<TransactionsAuthorize> transactionsAuthorize = transactionsAuthorizeController.allTransactionsAuthorize();
        for (TransactionsAuthorize transactionAuthorize : transactionsAuthorize) {
            availableCredit -= transactionAuthorize.getAmount();
        }
        return availableCredit;
    }

    @Operation(summary= "Gets the total amount of credit")
    @GetMapping("/totalCredit")
    public int getTotalCredit() {
        return initialCredit;
    }

    @Operation(summary = "Gets all pending payments and authorized transactions")
    @GetMapping("/pendingOrAuthorized")
    public Iterable<HomePendingOrAuthorized> getPendingOrAuthorized() {
        Iterable<PaymentsPending> paymentsPending = paymentsPendingController.allPaymentsPending();
        Iterable<TransactionsAuthorize> transactionsAuthorize = transactionsAuthorizeController.allTransactionsAuthorize();

        Iterable<HomePendingOrAuthorized> homePendingOrAuthorized = new Iterable<HomePendingOrAuthorized>() {

            @Override
            public Iterator<HomePendingOrAuthorized> iterator() {
                Iterator<PaymentsPending> paymentsPendingIterator = paymentsPending.iterator();
                Iterator<TransactionsAuthorize> transactionsAuthorizeIterator = transactionsAuthorize.iterator();

                return new Iterator<HomePendingOrAuthorized>() {
                    @Override
                    public boolean hasNext() {
                        return paymentsPendingIterator.hasNext() || transactionsAuthorizeIterator.hasNext();
                    }

                    @Override
                    public HomePendingOrAuthorized next() {
                        if (paymentsPendingIterator.hasNext()) {
                            PaymentsPending paymentPending = paymentsPendingIterator.next();
                            return HomePendingOrAuthorized.builder()
                                    .id("p-" + String.valueOf(paymentPending.getId()))
                                    .amount(paymentPending.getAmount())
                                    .initialTime(paymentPending.getInitialTime())
                                    .type("Payment")
                                    .build();
                        } 
                        else if (transactionsAuthorizeIterator.hasNext()) {
                            TransactionsAuthorize transactionAuthorize = transactionsAuthorizeIterator.next();
                            return HomePendingOrAuthorized.builder()
                                    .id("t-" + String.valueOf(transactionAuthorize.getId()))
                                    .amount(transactionAuthorize.getAmount())
                                    .initialTime(transactionAuthorize.getInitialTime())
                                    .type("Transaction")
                                    .build();
                        } else {
                            throw new NoSuchElementException();
                        }
                    }
                };
            }
        };



        return homePendingOrAuthorized;
    }

@Operation(summary = "Gets all posted payments and settled transactions")
@GetMapping("/postedOrSettled")
public Iterable<HomePostedOrSettled> getPostedOrSettled() {
    Iterable<PaymentsPosted> paymentsPosted = paymentsPostedController.allPayments();
    Iterable<TransactionsSettle> transactionsSettle = transactionsSettleController.allTransactionsSettled();

    Iterable<HomePostedOrSettled> homePostedOrSettled = new Iterable<HomePostedOrSettled>() {

        @Override
        public Iterator<HomePostedOrSettled> iterator() {
            Iterator<PaymentsPosted> paymentsPostedIterator = paymentsPosted.iterator();
            Iterator<TransactionsSettle> transactionsSettleIterator = transactionsSettle.iterator();

            return new Iterator<HomePostedOrSettled>() {
                @Override
                public boolean hasNext() {
                    return paymentsPostedIterator.hasNext() || transactionsSettleIterator.hasNext();
                }

                @Override
                public HomePostedOrSettled next() {
                    if (paymentsPostedIterator.hasNext()) {
                        PaymentsPosted paymentPosted = paymentsPostedIterator.next();
                        return HomePostedOrSettled.builder()
                                .id("p-" + String.valueOf(paymentPosted.getId()))
                                .amount(paymentPosted.getAmount())
                                .initialTime(paymentPosted.getInitialTime())
                                .finalizedTime(paymentPosted.getFinalizedTime())
                                .type("Payment")
                                .build();
                    } 
                    else if (transactionsSettleIterator.hasNext()) {
                        TransactionsSettle transactionSettle = transactionsSettleIterator.next();
                        return HomePostedOrSettled.builder()
                                .id("t-" + String.valueOf(transactionSettle.getId()))
                                .amount(transactionSettle.getAmount())
                                .initialTime(transactionSettle.getInitialTime())
                                .finalizedTime(transactionSettle.getFinalizedTime())
                                .type("Transaction")
                                .build();
                    } else {
                        throw new NoSuchElementException();
                    }
                }
            };
        }
    };

    return homePostedOrSettled;
}



}
