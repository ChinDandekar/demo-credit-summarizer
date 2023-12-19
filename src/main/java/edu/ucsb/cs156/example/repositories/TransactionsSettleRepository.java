package edu.ucsb.cs156.example.repositories;

import edu.ucsb.cs156.example.entities.TransactionsSettle;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionsSettleRepository extends CrudRepository<TransactionsSettle, Long> {
}