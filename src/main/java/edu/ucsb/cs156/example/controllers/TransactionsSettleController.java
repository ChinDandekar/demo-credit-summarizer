package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.TransactionsSettle;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.repositories.TransactionsSettleRepository;

import edu.ucsb.cs156.example.controllers.TransactionsAuthorizeController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Tag(name = "TransactionsSettle")
@RequestMapping("/api/transactionssettle")
@RestController
@Slf4j
public class TransactionsSettleController extends ApiController {

    @Autowired
    TransactionsSettleRepository transactionsSettleRepository;

    @Autowired
    TransactionsAuthorizeController transactionsAuthorizeController;

    @Operation(summary= "List all settled transactions")
    @GetMapping("/all")
    public Iterable<TransactionsSettle> allTransactionsSettled() {
        Iterable<TransactionsSettle> commons = transactionsSettleRepository.findAll();
        return commons;
    }

    @Operation(summary= "Get a single settled transaction")
    @GetMapping("")
    public TransactionsSettle getById(
            @Parameter(name="id") @RequestParam Long id) {
        TransactionsSettle commons = transactionsSettleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(TransactionsSettle.class, id));

        return commons;
    }

    @Operation(summary= "Create a new settled transaction")
    @PostMapping("/post")
    public TransactionsSettle postTransaction(
        @Parameter(name="id") @RequestParam Long id,
        @Parameter(name="amount") @RequestParam int amount,
        @Parameter(name="initialTime") @RequestParam int initialTime,
        @Parameter(name="finalizedTime") @RequestParam int finalizedTime
        )
        {
        log.info("In post setle transaction");
        TransactionsSettle commons = new TransactionsSettle();
        commons.setId(id);
        commons.setAmount(amount);
        commons.setInitialTime(initialTime);
        commons.setFinalizedTime(finalizedTime);

        TransactionsSettle savedCommons = transactionsSettleRepository.save(commons);

        return savedCommons;
    }


    @Operation(summary= "Create a new settled transaction and delete the authorized transaction")
    @PutMapping("/put")
    public TransactionsSettle postSettledTransactionAndDeleteAuthorizedTransaction(
        @Parameter(name="id") @RequestParam Long id,
        @Parameter(name="amount") @RequestParam int amount,
        @Parameter(name="initialTime") @RequestParam int initialTime,
        @Parameter(name="finalizedTime") @RequestParam int finalizedTime
        )
        {
        TransactionsSettle savedTransactions = this.postTransaction(id, amount, initialTime, finalizedTime);
        transactionsAuthorizeController.deleteTransaction(id);

        return savedTransactions;
    }

    // @Operation(summary= "Create a new settled transaction")
    // @PutMapping("/put")
    // public void putTransaction(
    //     @Parameter(name="id") @RequestParam Long id,
    //     @Parameter(name="amount") @RequestParam int amount,
    //     @Parameter(name="initialTime") @RequestParam int initialTime,
    //     @Parameter(name="finalizedTime") @RequestParam int finalizedTime
    //     )
    //     {
    //     log.info("In put setle transaction");
    // }
}
