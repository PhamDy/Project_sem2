package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.CatagoryDto;
import fptAptech.theSun.respository.CategoryRepository;
import fptAptech.theSun.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CatagoryDto> getList() {
        return null;
    }
}
