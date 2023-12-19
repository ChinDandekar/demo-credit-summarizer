package edu.ucsb.cs156.example.repositories;

import edu.ucsb.cs156.example.entities.TransactionsAuthorize;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionsAuthorizeRepository extends CrudRepository<TransactionsAuthorize, Long> {
}