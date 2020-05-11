package lt.project.manager.rest;

import lt.project.manager.model.Project;
import lt.project.manager.model.Task;
import lt.project.manager.service.ServiceRepository;
import lt.project.manager.dto.TransferProject;
import lt.project.manager.dto.TransferTask;

import lt.project.manager.service.imp.ServiceRepositoryImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


/**
 *  Class represent api controller for restful application.
 *  Includes GET POST DELETE PUT methods
 *
 * @author  IT Crew
 * @version 1.0
 *
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ApiController {
    /**
     *
     * repository interface for service implementation
     * @see ServiceRepositoryImp
     */
    @Autowired
    public ServiceRepository repository;

    /**
     * GET api method
     * @return list of all projects
     */
    @GetMapping("/api/project")
    public List<Project> getAllProjects (){
        return repository.getProjects();
    }

    /**
     * GET api method
     * @param id project id
     * @return Project object
     */
    @GetMapping("/api/project/id/{id}")
    public Project getProjectById(@PathVariable Long id){
        return repository.getProjectById(id);
    }
    /**
     * GET api method
     * @param name project name
     * @return Project object
     */
    @GetMapping("/api/project/name/{name}")
    public Project getProjectByName(@PathVariable String name){
        return repository.getProjectByName(name);
    }

    /**
     * GET api method
     * @param name project name
     * @return List Project object
     */
    @GetMapping("/api/project/search/{name}")
    public List<Project> searchProjectByName(@PathVariable String name){
        return repository.searchProjectByString(name);
    }

    /**
     * GET api method
     * @return list of all tasks
     */
    @GetMapping("/api/task")
    public List<Task> getAllTasks(){
        return repository.getTasks();
    }

    /**
     * GET api method
     * @param id task id
     * @return Task object
     */
    @GetMapping("/api/task/id/{id}")
    public Task getTaskById(@PathVariable Long id){
        return repository.getTaskById(id);
    }

    /**
     * GET api method
     * @param name task name
     * @return Task object
     */
    @GetMapping("/api/task/name/{name}")
    public Task getTaskByName(@PathVariable String name){
        return repository.getTaskByName(name);
    }

    /**
     * GET api method
     * @param name task name
     * @return Task object
     */
    @GetMapping("/api/task/search/{name}")
    public List<Task> searchTaskByName(@PathVariable String name){
        return repository.searchTaskByString(name);
    }


    /**
     * DELETE api method
     * Delete project by id
     * @param id project id
     */
    @DeleteMapping("api/project/{id}")
    public void deleteProjectById(@PathVariable Long id){
        repository.deleteProjectById(id);
    }

    /**
     * DELETE api method
     * Delete task by id
     * @param id task id
     */
    @DeleteMapping("api/task/{id}")
    public void deleteTaskById(@PathVariable Long id){
        repository.deleteTaskById(id);
    }

    /**
     * POST api method
     * Accepts transfer object, creates Project and put into database
     * @see TransferProject
     * @param project transfer object
     */
    @PostMapping("/api/project")
    public void createNewProject(@RequestBody final @Valid TransferProject project){
        repository.createProject(project.build());
    }

    /**
     * PUT api method
     * Accepts transfer project object and project id , updates Project Object
     * @param project transfer object
     * @param id project id
     */
    @PutMapping("/api/project/{id}")
    public void updateProject(@RequestBody final @Valid TransferProject project,@PathVariable Long id) {
        repository.updateProject(project.build(), id);
    }

    /**
     * PUT api method
     * Accepts transfer task object and task id , updates Task Object
     * @param task transfer object
     * @param id task id
     */
    @PutMapping("/api/task/{id}")
    public void updateTask(@RequestBody final @Valid TransferTask task,@PathVariable Long id) {
        repository.updateTask(task.build(), id);
    }

    /**
     * PUT api method
     * Accepts transfer task object and project id , creates task and assign it to some project
     * @param projectId project id
     * @param task transfer object
     */
    @PutMapping("/api/assign/{projectId}")
    public void addTaskToProject(@PathVariable Long projectId ,@RequestBody final @Valid TransferTask task){
        repository.createTaskAndAssignToProject(task.build(), projectId);
    }

}
