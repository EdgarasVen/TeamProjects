package lt.project.manager.rest;

import lt.project.manager.dto.AdminUserDto;
import lt.project.manager.dto.TransferProject;
import lt.project.manager.dto.TransferTask;
import lt.project.manager.dto.UserDto;
import lt.project.manager.model.Project;
import lt.project.manager.model.User;
import lt.project.manager.service.ServiceRepository;
import lt.project.manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * REST controller for ROLE_ADMIN requests.
 *
 * @author Edgaras Venzlauskas
 * @version 1.0
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/v1/admin/")
public class AdminRestControllerV1 {

    private final ServiceRepository repository;
    private final UserService userService;

    @Autowired
    public AdminRestControllerV1(ServiceRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    @PostMapping(value = "user/create")
    public void createUser(@RequestBody final UserDto user){
        userService.register(user.toUser(),"ROLE_USER");
    }

    @DeleteMapping(value = "user/delete/{id}")
    public void deleteUser(@PathVariable Long id){
        if(id==0) throw new IllegalArgumentException();
        userService.delete(id);
    }

    @GetMapping(value = "users")
    public List<User> getAllUsers(){
        return userService.getAll();
    }

    @GetMapping(value = "user/{id}")
    public ResponseEntity<AdminUserDto> getUserById(@PathVariable(name = "id") Long id) {
        User user = userService.findById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        AdminUserDto result = AdminUserDto.fromUser(user);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * DELETE api method
     * Delete project by id
     * @param id project id
     */
    @DeleteMapping(value = "project/{id}")
    public void deleteProjectById(@PathVariable Long id){
        repository.deleteProjectById(id);
    }

    /**
     * DELETE api method
     * Delete task by id
     * @param id task id
     */
    @DeleteMapping(value = "task/{id}")
    public void deleteTaskById(@PathVariable Long id){
        repository.deleteTaskById(id);
    }

    /**
     * POST api method
     * Accepts transfer object, creates Project and put into database
     * @see TransferProject
     * @param project transfer object
     */
    @PostMapping(value = "project")
    public void createNewProject(@RequestBody final @Valid TransferProject project){
        repository.createProject(project.build());
    }

    /**
     * PUT api method
     * Accepts transfer project object and project id , updates Project Object
     * @param project transfer object
     * @param id project id
     */
    @PutMapping(value = "project/{id}")
    public void updateProject(@RequestBody final @Valid TransferProject project,@PathVariable Long id) {
        repository.updateProject(project.build(), id);
    }

    /**
     * PUT api method
     * Accepts transfer task object and project id , creates task and assign it to some project
     * @param projectId project id
     * @param task transfer object
     */
    @PutMapping("assign/{projectId}")
    public void addTaskToProject(@PathVariable Long projectId ,@RequestBody final @Valid TransferTask task){
        repository.createTaskAndAssignToProject(task.build(), projectId);
    }
}
