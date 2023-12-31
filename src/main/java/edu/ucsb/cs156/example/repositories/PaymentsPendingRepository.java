package edu.ucsb.cs156.example.repositories;

import edu.ucsb.cs156.example.entities.PaymentsPending;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PaymentsPendingRepository extends CrudRepository<PaymentsPending, Long> {
}