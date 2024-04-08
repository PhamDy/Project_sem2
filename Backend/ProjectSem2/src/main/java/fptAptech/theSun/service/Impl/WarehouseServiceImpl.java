package fptAptech.theSun.service.Impl;

import fptAptech.theSun.entity.Enum.ProductStatus;
import fptAptech.theSun.entity.Warehouse;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.ProductRepository;
import fptAptech.theSun.respository.WarehouseRepository;
import fptAptech.theSun.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseServiceImpl implements WarehouseService {

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Integer getQuantityProduct(Long productId, String color, String size) {
        var warehouse = warehouseRepository.findByProducts_IdAndColorAndSize(productId, color, size);
        return warehouse.getQuantity();
    }

    @Override
    public List<String> getAllColor() {
        return warehouseRepository.getAllColor();
    }

    @Override
    public List<String> getByColor(Long id) {
        return warehouseRepository.getByColor(id);
    }

    @Override
    public List<String> getBySize(Long id) {
        return warehouseRepository.getBySize(id);
    }

    @Override
    public Warehouse save(Long productId, String color, String size, Integer quantity) {
        var product = productRepository.findById(productId).orElseThrow(() -> new CustomException("Not found product by Id"));

        var warehouse1 = warehouseRepository.findByProducts_IdAndColorAndSize(productId, color, size);
        if (warehouse1!=null){
            warehouse1.setQuantity(quantity);
            warehouse1.setStatus(quantity==0 ? ProductStatus.OutOfStock : ProductStatus.InStock);
            return warehouseRepository.save(warehouse1);
        }
        var warehouse = new Warehouse();
        warehouse.setProducts(product);
        warehouse.setColor(color);
        warehouse.setSize(size);
        warehouse.setQuantity(quantity);
        warehouse.setCreatedBy("Admin");
        warehouse.setStatus(quantity==0 ? ProductStatus.OutOfStock : ProductStatus.InStock);

        return warehouseRepository.save(warehouse);
    }
}
