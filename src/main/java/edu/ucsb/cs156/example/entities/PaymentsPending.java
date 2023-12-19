package edu.ucsb.cs156.example.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "paymentspending")
public class PaymentsPending {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private int amount;
  @Column(name="initialTime")
  private int initialTime;  
}