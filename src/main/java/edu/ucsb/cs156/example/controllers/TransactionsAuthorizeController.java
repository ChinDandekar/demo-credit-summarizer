package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.TransactionsAuthorize;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.repositories.TransactionsAuthorizeRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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


@Tag(name = "TransactionsAuthorize")
@RequestMapping("/api/transactionsauthorize")
@RestController
@Slf4j
public class TransactionsAuthorizeController extends ApiController {

    @Autowired
    TransactionsAuthorizeRepository transactionsAuthorizeRepository;

    @Operation(summary= "List all transacation authorizations")
    @GetMapping("/all")
    public Iterable<TransactionsAuthorize> allTransactionsAuthorize() {
        Iterable<TransactionsAuthorize> transactions = transactionsAuthorizeRepository.findAll();
        return transactions;
    }

    @Operation(summary= "Get a single transaction by id")
    @GetMapping("")
    public TransactionsAuthorize getById(
            @Parameter(name="id") @RequestParam Long id) {
        TransactionsAuthorize transactionsAuthorize = transactionsAuthorizeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(TransactionsAuthorize.class, id));

        return transactionsAuthorize;
    }

    @Operation(summary= "Create a new transaction authorization")
    @PostMapping("/post")
    public TransactionsAuthorize postTransactionsAuthorize(
            @Parameter(name="amount") @RequestParam int amount,
            @Parameter(name="initialTime") @RequestParam int initialTime)
            throws JsonProcessingException {


        TransactionsAuthorize transactionAuthorization = new TransactionsAuthorize();
        transactionAuthorization.setAmount(amount);
        transactionAuthorization.setInitialTime(initialTime);
        TransactionsAuthorize savedTransaction = transactionsAuthorizeRepository.save(transactionAuthorization);
        

        return savedTransaction;
    }

    @Operation(summary= "Delete a Transaction by id")
    @DeleteMapping("")
    public Object deleteTransaction(
            @Parameter(name="id") @RequestParam Long id) {
        TransactionsAuthorize transaction = transactionsAuthorizeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(TransactionsAuthorize.class, id));

        transactionsAuthorizeRepository.delete(transaction);
        return genericMessage("Transaction Authorization with id %s deleted".formatted(id));
    }

}
