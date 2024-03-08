package fptAptech.theSun.service;

import fptAptech.theSun.dto.CategoryDto;
import fptAptech.theSun.entity.Enum.CategoryStatus;

import java.util.List;

public interface CategoryService {

    List<CategoryDto> getAll();

    CategoryDto findById(Long id);

    void createCategory(String name, CategoryStatus status);

    void updateCategory(Long id, String name, CategoryStatus status);

    void deleteCategory(Long id);

}
