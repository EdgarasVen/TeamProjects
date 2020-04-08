package lt.project.manager.service;

import lt.project.manager.model.Project;
import lt.project.manager.model.Task;

import java.util.List;

public interface ServiceRepository {

    //Get
    List<Project> getProjects();
    List<Task> getTasks();
    Project getProjectByName(String name);
    Task getTaskById(Long id);
    Task getTaskByName(String name);

    //Post
    void createProject(Project project);

    //Delete
    void deleteProjectByName(String name);
    void deleteTaskById(Long id);
    //Put
    void updateProject(Project project, Long id);
   	void updateTask(Task task, Long id);
}
