package lt.project.manager.rest;

import lombok.extern.slf4j.Slf4j;
import lt.project.manager.dto.TransferPagination;
import lt.project.manager.model.Project;
import lt.project.manager.model.Task;
import lt.project.manager.service.ServiceRepository;
import lt.project.manager.dto.TransferProject;
import lt.project.manager.dto.TransferTask;

import lt.project.manager.service.imp.ServiceRepositoryImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 *  Class represent api controller for restful application.
 *  Includes GET POST DELETE PUT methods
 *
 * @author  Edgaras Venzlauskas
 * @version 1.0
 *
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
public class RestApiControllerV1 {

    /**
     *  repository interface for service implementation
     *  @see ServiceRepositoryImp
     */
    @Autowired
    public ServiceRepository repository;

    /**
     * POST api method
     * @param pagination
     * @see TransferPagination
     * @return all projects
     */
    @PostMapping("/api/project")
    public ResponseEntity getAllProjects (
            @RequestBody final TransferPagination pagination) {
        Page<Project> projects = repository.getProjects(pagination.build());
        Map<Object, Object> response = new HashMap<>();
        response.put("projects",projects);
        response.put("listSize",projects.getTotalPages());
        return ResponseEntity.ok(response);
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
     * POST api method
     * @param pagination
     * @see TransferPagination
     * @return all tasks
     */
    @PostMapping("/api/task")
    public ResponseEntity getAllTasks(
            @RequestBody final TransferPagination pagination){
        Page<Task> tasks = repository.getTasks(pagination.build());
        Map<Object, Object> response = new HashMap<>();
        response.put("tasks",tasks);
        response.put("listSize",tasks.getTotalPages());
        return ResponseEntity.ok(response);
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
     * PUT api method
     * Accepts transfer task object and task id , updates Task Object
     * @param task transfer object
     * @param id task id
     */
    @PutMapping("/api/task/{id}")
    public void updateTask(@RequestBody final @Valid TransferTask task,@PathVariable Long id) {
        repository.updateTask(task.build(), id);
    }


}
