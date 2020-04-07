package lt.project.manager.controller;

import lt.project.manager.model.Project;
import lt.project.manager.model.Task;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class GetApi extends ApiController{

    @GetMapping("/api/project")
    public List<Project> getAllProjects (){
        return repository.getProjects();
    }

    @GetMapping("/api/task")
    public List<Task> getAllTasks(){
        return repository.getTasks();
    }
}
