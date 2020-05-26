package lt.project.manager.service;

import lt.project.manager.model.Project;
import lt.project.manager.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface
 * @author  Edgaras Venzlauskas
 * @version 1.0
 *
 */

public interface ServiceRepository {

    //Get
    Page<Project> getProjects(Pageable pageable);
    Page<Task> getTasks(Pageable pageable);
    Project getProjectByName(String name);
    Task getTaskById(Long id);
    Task getTaskByName(String name);
    Project getProjectById(Long id);
    List<Project> searchProjectByString(String string);
    List<Task> searchTaskByString(String string);
    List<Task> getTasksWaitingStatus(Long id);
    List<Task> getTasksOngoingStatus(Long id);
    List<Task> getTasksFinishedStatus(Long id);

    //Post
    void createProject(Project project);
    void createTaskAndAssignToProject(Task task,Long id);

    //Delete
    void deleteProjectByName(String name);
    void deleteTaskById(Long id);
    void deleteProjectById(Long id);

    //Put
    void updateProject(Project newProject, Long id);
   	void updateTask(Task newTask, Long projectId);



}
