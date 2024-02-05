package fptAptech.theSun.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cart_item")
public class CartItem extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Products products;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Carts carts;

    @Transient
    public double getSubtotal() {
        if (this.products.getDiscount() !=0) {
            return Math.round((this.products.getPrice() * ((100 - this.products.getDiscount())/100)) * this.quantity);
        } else {
            return this.products.getPrice() * this.quantity;
        }
    }

}
