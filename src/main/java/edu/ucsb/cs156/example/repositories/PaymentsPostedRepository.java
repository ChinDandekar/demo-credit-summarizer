package edu.ucsb.cs156.example.repositories;

import edu.ucsb.cs156.example.entities.PaymentsPosted;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PaymentsPostedRepository extends CrudRepository<PaymentsPosted, Long> {
}