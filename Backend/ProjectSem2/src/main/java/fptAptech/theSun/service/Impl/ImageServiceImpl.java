package fptAptech.theSun.service.Impl;

import fptAptech.theSun.entity.Product_image;
import fptAptech.theSun.respository.ImageRepository;
import fptAptech.theSun.service.imageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements imageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public List<Product_image> getListImage() {
        return imageRepository.findAll();
    }

    @Override
    public Product_image save(Product_image image) {
        return imageRepository.save(image);
    }
}
