package fptAptech.theSun.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_details")
public class Order_details extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_detail_id")
    private Long id;

    @Column(name = "size")
    private String size;

    @Column(name = "color")
    private String color;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")
    private Double price;

    @Column(name = "discount")
    private Double discount;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Products products;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Transient
    public double getSubtotal(){
        if(this.getDiscount() != 0){
            return Math.round((this.getPrice()*((100-this.getDiscount())/100)) * quantity);
        }else{
            return this.getPrice()*quantity;
        }
    }

}
