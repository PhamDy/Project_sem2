package fptAptech.theSun.service;

import fptAptech.theSun.entity.Warehouse;

import java.util.List;

public interface WarehouseService {

    Integer getQuantityProduct(Long productId, String color, String size);

    List<String> getByColor(Long id);

    List<String> getBySize(Long id);

    Warehouse save(Long productId, String color, String size, Integer quantity);


}
