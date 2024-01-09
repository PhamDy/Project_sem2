package fptAptech.theSun.service;

import java.util.List;

public interface ImageService {

    List<Image> getListImage();

    Image save(Image image);

}
