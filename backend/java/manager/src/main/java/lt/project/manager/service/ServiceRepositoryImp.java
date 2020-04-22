package lt.project.manager.service;

import lt.project.manager.exceptions.ProjectNotFindException;
import lt.project.manager.exceptions.TaskNotFindException;
import lt.project.manager.model.Project;
import lt.project.manager.model.Task;
import lt.project.manager.repo.RepoProject;
import lt.project.manager.repo.RepoTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service repository interface implementation with autowired project and task databases.
 *
 * @author  IT Crew
 * @version 1.0
 *
 */

@Service
public class ServiceRepositoryImp implements ServiceRepository {

    @Autowired
    RepoProject projectDatabase;

    @Autowired
    RepoTask taskDatabase;

    /**
     *
     * @return list of projects
     */
    @Override
    public List<Project> getProjects() {
        return (List<Project>) projectDatabase.findAll();
    }

    /**
     *
     * @return list of tasks
     */
    @Override
    public List<Task> getTasks() {
        return (List<Task>) taskDatabase.findAll();
    }

    /**
     *
     * @param name project name
     * @return project with same name
     */
    @Override
    public List<Project> getProjectByName(String name) {
        return projectDatabase.findByName(name);
    }

    /**
     *
     * @param id task id
     * @return task with same id or throws task not find exception
     * @see TaskNotFindException
     */
    @Override
    public List<Task> getTaskById(Long id) {
        List<Task> list = taskDatabase.findAll();
        return list.stream()
                .filter(task -> task.getId()==id)
                .collect(Collectors.toList());

    }

    /**
     *
     * @param name task name
     * @return task with same name
     */
    @Override
    public List<Task> getTaskByName(String name) {
        /*List<Task> list = (List<Task>) taskDatabase.findAll();
        return  list.stream()
                .filter(task -> task.getName().equals(name))
                .collect(Collectors.toList());*/
        return taskDatabase.findByName(name);
    }

    /**
     *
     * @param id project id
     * @return project with this id
     */
    @Override
    public List<Project> getProjectById(Long id) {
        List<Project> list = projectDatabase.findAll();
        return list.stream()
                .filter(project -> project.getId()==id)
                .collect(Collectors.toList());
    }

    /**
     * Saves to database project
     * @param project object
     */
    @Override
    public void createProject(Project project) {
        projectDatabase.save(project);
    }

    /**
     * Delete project with same name from database
     * @param name String
     */
    @Override
    public void deleteProjectByName(String name) {
        projectDatabase.deleteByName(name);
    }

    /**
     * Delete task with same id from database
     * @param id Long
     */
    @Override
    public void deleteTaskById(Long id) {
        taskDatabase.deleteById(id);
    }

    /**
     * Clone old project object form database and update all parameters from new project
     * @param project new object
     * @param id project id
     */
    @Override
    public void updateProject(Project project, Long id) {
        Project p =projectDatabase.findById(id).orElseThrow(ProjectNotFindException::new);
        p.setName(project.getName());
        p.setDescription(project.getDescription());
        p.setStatus(project.getStatus());
        projectDatabase.save(p);
    }

    /**
     * Clone old task object form database and update all parameters from new task
     * @param task object
     * @param id task id
     */
    @Override
    public void updateTask(Task task, Long id) {
        Task t=taskDatabase.findById(id).orElseThrow(TaskNotFindException::new);
        t.setName(task.getName());
        t.setPriority(task.getPriority());
        t.setStatus(task.getStatus());
        taskDatabase.save(t);

    }

    /**
     * Clone and update project by id and add created task object to list
     * @param task object
     * @param id project id
     */
    @Override
    public void createTaskAndAssignToProject(Task task, Long id)  {
        Project p =projectDatabase.findById(id).orElseThrow(ProjectNotFindException::new);
        p.addTask(task);
        projectDatabase.save(p);
    }
}