package fptAptech.theSun.service;

import fptAptech.theSun.entity.Image;

import java.util.List;

public interface ImageService {

    List<Image> getListImage();

    Image save(Image image);

}
