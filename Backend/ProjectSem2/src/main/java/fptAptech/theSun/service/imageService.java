package fptAptech.theSun.service;

import fptAptech.theSun.entity.Product_image;

import java.util.List;

public interface imageService {

    List<Product_image> getListImage();

    Product_image save(Product_image image);

}
