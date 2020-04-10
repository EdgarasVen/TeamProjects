package lt.project.manager.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

public class DeleteApi extends ApiController{

    @DeleteMapping(".api/project/{name}")
    public void deleteProjectByName(@PathVariable String name){
        repository.deleteProjectByName(name);
    }
    
    @DeleteMapping(".api/task/{id}")
    public void deleteTaskById(@PathVariable Long id){
        repository.deleteTaskById(id);
        
        
    }
}
