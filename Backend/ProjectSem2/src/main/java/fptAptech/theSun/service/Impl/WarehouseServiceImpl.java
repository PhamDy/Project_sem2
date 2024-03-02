package fptAptech.theSun.service.Impl;

import fptAptech.theSun.respository.WarehouseRepository;
import fptAptech.theSun.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseServiceImpl implements WarehouseService {

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Override
    public Integer getQuantityProduct(Long productId, String color, String size) {
        var warehouse = warehouseRepository.findByProducts_IdAndColorAndSize(productId, color, size);
        return warehouse.getQuantity();
    }

    @Override
    public List<String> getByColor(Long id) {
        return warehouseRepository.getByColor(id);
    }

    @Override
    public List<String> getBySize(Long id) {
        return warehouseRepository.getBySize(id);
    }
}
