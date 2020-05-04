package lt.project.manager.service;

import lt.project.manager.model.Project;
import lt.project.manager.model.Task;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface
 * @author  IT Crew
 * @version 1.0
 *
 */

public interface ServiceRepository {

    //Get
    List<Project> getProjects();
    List<Task> getTasks();
    Project getProjectByName(String name);
    Task getTaskById(Long id);
    Task getTaskByName(String name);
    Project getProjectById(Long id);
    List<Project> searchProjectByString(String string);
    List<Task> searchTaskByString(String name);


    //Post
    void createProject(Project project);
    void createTaskAndAssignToProject(Task task,Long id);

    //Delete
    void deleteProjectByName(String name);
    void deleteTaskById(Long id);
    void deleteProjectByid(Long id);

    //Put
    void updateProject(Project project, Long id);
   	void updateTask(Task task, Long projectId);


}
