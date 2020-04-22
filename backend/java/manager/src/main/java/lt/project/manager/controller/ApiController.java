package lt.project.manager.controller;

import lt.project.manager.model.Project;
import lt.project.manager.model.Task;
import lt.project.manager.service.ServiceRepository;
import lt.project.manager.transfer.TransferProject;
import lt.project.manager.transfer.TransferTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ApiController {

    @Autowired
    public ServiceRepository repository;


    //Get
    @GetMapping("/api/project")
    public List<Project> getAllProjects (){
        return repository.getProjects();
    }

    @GetMapping("/api/project/{name}")
    public List<Project> getProjectByName(@PathVariable String name){
        return repository.getProjectByName(name);
    }

    @GetMapping("/api/task")
    public List<Task> getAllTasks(){
        return repository.getTasks();
    }

    @GetMapping("/api/task/{id}")
    public Task getTaskById(@PathVariable Long id){
        return repository.getTaskById(id);
    }

    @GetMapping("/api/task/{name}")
    public Task getTaskByName(@PathVariable String name){
        return repository.getTaskByName(name);
    }

    //Delete
    @DeleteMapping("api/project/{name}")
    public void deleteProjectByName(@PathVariable String name){
        repository.deleteProjectByName(name);
    }

    @DeleteMapping("api/task/{id}")
    public void deleteTaskById(@PathVariable Long id){
        repository.deleteTaskById(id);
    }


    //Post
    @PostMapping("/api/project")
    public void createNewProject(@RequestBody TransferProject project){
        repository.createProject(project.build());
    }


    //Put
    @PutMapping("/api/project/{id}")
    public void updateProject(@RequestBody TransferProject project,@PathVariable Long id) {
        repository.updateProject(project.build(), id);
    }

    @PutMapping("/api/task/{id}")
    public void updateTask(@RequestBody TransferTask task,@PathVariable Long id) {
        repository.updateTask(task.build(), id);
    }

    @PutMapping("/api/assign/{projectId}")
    public void addTaskToProject(@PathVariable Long projectId ,@RequestBody TransferTask task){
        repository.createTaskAndAssignToProject(task.build(), projectId);
    }

}
