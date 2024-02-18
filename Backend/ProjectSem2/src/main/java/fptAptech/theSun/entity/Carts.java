package fptAptech.theSun.entity;

import fptAptech.theSun.entity.Enum.CartsStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "carts")
public class Carts extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    @Null
    private User user;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "status")
    private CartsStatus status;

    @Column(name = "guest")
    private Long guestId;

}
