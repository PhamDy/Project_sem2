package fptAptech.theSun.service;

import java.util.List;

public interface WarehouseService {

    Integer getQuantityProduct(Long productId, String color, String size);

    List<String> getByColor(Long id);

    List<String> getBySize(Long id);


}
