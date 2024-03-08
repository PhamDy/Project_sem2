package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.CategoryDto;
import fptAptech.theSun.entity.Category;
import fptAptech.theSun.entity.Enum.CategoryStatus;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.CategoryRepository;
import fptAptech.theSun.respository.UserRepository;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<CategoryDto> getAll() {
        var category = categoryRepository.findAll();
        List<CategoryDto> list = new ArrayList<>();
        for (Category item: category
             ) {
            var dto = new CategoryDto();
            dto.setId(item.getId());
            dto.setName(item.getName());
            dto.setStatus(item.getStatus());
            list.add(dto);
        }
        return list;
    }

    @Override
    public CategoryDto findById(Long id) {
        var category = categoryRepository.findById(id);
        var dto = new CategoryDto();
        dto.setId(category.get().getId());
        dto.setName(category.get().getName());
        dto.setStatus(category.get().getStatus());
        return dto;
    }

    @Override
    @Transactional
    public void createCategory(String name, CategoryStatus status) {
        String email = JwtFilter.CURRENT_USER;
        var user = Optional.ofNullable(userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("You must log in before!")));
        var category = new Category();
        category.setName(name);
        category.setStatus(status);
        category.setCreatedBy(user.get().getRoles().toString());
        categoryRepository.save(category);
    }

    @Override
    @Transactional
    public void updateCategory(Long id, String name, CategoryStatus status) {
        var category = categoryRepository.findById(id);
        category.get().setName(name);
        category.get().setStatus(status);
        categoryRepository.save(category.get());
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
