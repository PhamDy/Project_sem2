package fptAptech.theSun.service.Impl;

import fptAptech.theSun.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public List<Image> getListImage() {
        return imageRepository.findAll();
    }

    @Override
    public Image save(Image image) {
        return imageRepository.save(image);
    }
}
