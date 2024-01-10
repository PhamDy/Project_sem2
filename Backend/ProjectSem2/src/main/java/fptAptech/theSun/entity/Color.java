package fptAptech.theSun.entity;

import fptAptech.theSun.entity.Enum.ProductColor;
import fptAptech.theSun.entity.Enum.ProductSize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "color")
public class Color extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "color_id")
    private Long id;

    @Column(name = "color")
    private ProductColor color;

}
