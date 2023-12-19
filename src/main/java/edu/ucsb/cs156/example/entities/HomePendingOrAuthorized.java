package edu.ucsb.cs156.example.entities;


import javax.persistence.Column;
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
@Entity(name = "homependingorauthorized")
public class HomePendingOrAuthorized {
  @Id
  private String id;

  private int amount;
  @Column(name="initialTime")
  private int initialTime;  
  private String type;
}