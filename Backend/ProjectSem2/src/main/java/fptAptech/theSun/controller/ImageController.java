package fptAptech.theSun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "*",maxAge = 3600)
public class ImageController {

    @Autowired
    private fptAptech.theSun.service.imageService imageService;




}
