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
    List<Project> getProjectByName(String name);
    List<Task> getTaskById(Long id);
    List<Task> getTaskByName(String name);
    List<Project> getProjectById(Long id);

    //Post
    void createProject(Project project);
    void createTaskAndAssignToProject(Task task,Long id);

    //Delete
    void deleteProjectByName(String name);
    void deleteTaskById(Long id);

    //Put
    void updateProject(Project project, Long id);
   	void updateTask(Task task, Long projectId);


}
