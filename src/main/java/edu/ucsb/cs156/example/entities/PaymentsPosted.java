package edu.ucsb.cs156.example.entities;


import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "paymentsposted")
public class PaymentsPosted {
  @Id
  private long id;
  private int amount;
  private int initialTime;  
  private int finalizedTime;
}