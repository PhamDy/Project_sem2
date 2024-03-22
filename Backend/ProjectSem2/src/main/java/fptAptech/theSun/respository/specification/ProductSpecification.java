package fptAptech.theSun.respository.specification;

import fptAptech.theSun.dto.FilterDto;
import fptAptech.theSun.entity.Products;
import fptAptech.theSun.entity.Warehouse;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductSpecification {
    public static Specification<Products> filterProducts(FilterDto criteria){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (criteria.getCategory() != null && !criteria.getCategory().isEmpty()){
                List<Predicate> categoryNamePredicates = new ArrayList<>();
                for (String categoryName: criteria.getCategory()
                     ) {
                    Predicate categoryNamePredicate = criteriaBuilder.equal(criteriaBuilder.lower(root.get("category").get("name")), categoryName.toLowerCase());
                    categoryNamePredicates.add(categoryNamePredicate);
                }
                Predicate categoryNameCombinedPredicate = criteriaBuilder.or(categoryNamePredicates.toArray(new Predicate[0]));
                predicates.add(categoryNameCombinedPredicate);
            }

            if (criteria.getBrand() != null && !criteria.getBrand().isEmpty()){
                List<Predicate> brandNamePredicates = new ArrayList<>();
                for (String brandName: criteria.getBrand()
                ) {
                    Predicate brandNamePredicate = criteriaBuilder.equal(criteriaBuilder.lower(root.get("brand")), brandName.toLowerCase());
                    brandNamePredicates.add(brandNamePredicate);
                }
                Predicate brandNameCombinedPredicate = criteriaBuilder.or(brandNamePredicates.toArray(new Predicate[0]));
                predicates.add(brandNameCombinedPredicate);
            }

            if (criteria.getGender() != null && !criteria.getGender().isEmpty()){
                List<Predicate> genderNamePredicates = new ArrayList<>();
                for (String genderName: criteria.getGender()
                ) {
                    Predicate genderNamePredicate = criteriaBuilder.equal(criteriaBuilder.lower(root.get("gender")), genderName.toLowerCase());
                    genderNamePredicates.add(genderNamePredicate);
                }
                Predicate genderNameCombinedPredicate = criteriaBuilder.or(genderNamePredicates.toArray(new Predicate[0]));
                predicates.add(genderNameCombinedPredicate);
            }

            Join<Products, Warehouse> productsWarehouseJoin = root.join("warehouses", JoinType.INNER);
            if (criteria.getColor() != null && !criteria.getColor().isEmpty()){
                List<Predicate> colorPredicates = new ArrayList<>();
                for (String colorName : criteria.getColor()) {
                    Predicate colorPredicate = criteriaBuilder.equal(criteriaBuilder.lower(productsWarehouseJoin.get("color")), colorName.toLowerCase());
                    colorPredicates.add(colorPredicate);
                }
                Predicate colorCombinedPredicate = criteriaBuilder.or(colorPredicates.toArray(new Predicate[0]));
                predicates.add(colorCombinedPredicate);
            }

            if (criteria.getDiscount() != null && criteria.getDiscount() == 1) {
                predicates.add(criteriaBuilder.gt(root.get("discount"), 0.0));
            } else if (criteria.getDiscount() != null && criteria.getDiscount() == 0) {
                // Không thêm điều kiện discount
            }



            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }


}
