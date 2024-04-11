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

            List<Predicate> pricePredicates = new ArrayList<>();

            if (criteria.getPrice1() != null && criteria.getPrice1() == 1) {
                pricePredicates.add(criteriaBuilder.lt(root.get("price"), 50.0));
//                Expression<Double> discountedPrice = criteriaBuilder.prod(root.get("discount"), root.get("price"));
//                pricePredicates.add(criteriaBuilder.lt(discountedPrice, 50.0));
            }

            if (criteria.getPrice2() != null && criteria.getPrice2() == 1) {

//                Expression<Double> discountedPrice = criteriaBuilder.prod(root.get("price"), criteriaBuilder.diff(1.0, root.get("discount")));

                pricePredicates.add(criteriaBuilder.or(
                        criteriaBuilder.equal(root.get("price"), 50.0),
                        criteriaBuilder.between(root.get("price"), 50.0, 100.0)
//                        criteriaBuilder.equal(discountedPrice, 50.0),
//                        criteriaBuilder.between(discountedPrice, 50.0, 100.0)
                ));
            }

            if (criteria.getPrice3() != null && criteria.getPrice3() == 1) {
                pricePredicates.add(criteriaBuilder.or(
                        criteriaBuilder.equal(root.get("price"), 100.0),
                        criteriaBuilder.between(root.get("price"), 100.0, 250.0)
                ));
            }

            if (criteria.getPrice4() != null && criteria.getPrice4() == 1) {
                pricePredicates.add(criteriaBuilder.or(
                        criteriaBuilder.equal(root.get("price"), 250.0),
                        criteriaBuilder.gt(root.get("price"), 250.0)
                ));
            }

            if (!pricePredicates.isEmpty()) {
                Predicate priceCombinedPredicate = criteriaBuilder.or(pricePredicates.toArray(new Predicate[0]));
                predicates.add(priceCombinedPredicate);
            }

            if (criteria.getSortDirection() != null && !criteria.getSortDirection().isEmpty()){
                if (criteria.getSortDirection().equalsIgnoreCase("asc")){
                    query.orderBy(criteriaBuilder.asc(root.get("price")));
                } else if (criteria.getSortDirection().equalsIgnoreCase("desc")){
                    query.orderBy(criteriaBuilder.desc(root.get("price")));
                }
            }

            if (criteria.getSortFeatured() != null && !criteria.getSortFeatured().isEmpty()){
                if (criteria.getSortFeatured().equalsIgnoreCase("desc")){
                    query.orderBy(criteriaBuilder.desc(root.get("discount")));
                }
            }

            if (criteria.getSortNewest() != null && !criteria.getSortNewest().isEmpty()){
                if (criteria.getSortNewest().equalsIgnoreCase("desc")){
                    query.orderBy(criteriaBuilder.desc(root.get("createdAt")));
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
