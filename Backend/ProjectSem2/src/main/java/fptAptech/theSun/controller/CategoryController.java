package fptAptech.theSun.controller;

import fptAptech.theSun.entity.Enum.CategoryStatus;
import fptAptech.theSun.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "*",maxAge = 3600)
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/")
    @Operation(summary = "Lấy ra danh sách Category")
    ResponseEntity<?> getAll(){
        return new ResponseEntity<>(categoryService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy ra danh sách Category")
    ResponseEntity<?> getById(@PathVariable Long id){
        return new ResponseEntity<>(categoryService.findById(id), HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/create")
    @Operation(summary = "Admin tạo mới một Category")
    ResponseEntity<?> createCategory(@RequestParam(name = "name") String name,
                                     @RequestParam(name = "status")String status) {
         categoryService.createCategory(name, CategoryStatus.valueOf(status));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Secured({"ROLE_ADMIN"})
    @PatchMapping("/update")
    @Operation(summary = "Admin update một Category")
    ResponseEntity<?> createCategory(@RequestParam(name = "id") Long id,
                                     @RequestParam(name = "name") String name,
                                     @RequestParam(name = "status")CategoryStatus status) {
        categoryService.updateCategory(id ,name, status);
        return new ResponseEntity<>("Category has been update", HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN"})
    @PatchMapping("/delete")
    @Operation(summary = "Admin xóa một Category")
    ResponseEntity<?> createCategory(@RequestParam(name = "id") Long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>("Category has been delete", HttpStatus.OK);
    }


}
