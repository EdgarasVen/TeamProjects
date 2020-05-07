package lt.project.manager.service;

import lombok.extern.slf4j.Slf4j;
import lt.project.manager.exceptions.ProjectNotFindException;
import lt.project.manager.exceptions.TaskNotFindException;
import lt.project.manager.model.Project;
import lt.project.manager.model.Task;
import lt.project.manager.repo.RepoProject;
import lt.project.manager.repo.RepoTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
@Slf4j
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
        log.info("IN getProjects - projects find");
        return (List<Project>) projectDatabase.findAll();
    }

    /**
     *
     * @return list of tasks
     */
    @Override
    public List<Task> getTasks() {
        log.info("IN getTasks - tasks find");
        return (List<Task>) taskDatabase.findAll();
    }

    /**
     *
     * @param name project name
     * @return project with same name
     */
    @Override
    public Project getProjectByName(String name) {
        log.info("IN getProjectByName - project find by name: {}",name);
        return projectDatabase.findByName(name);
    }

    /**
     *
     * @param id task id
     * @return task with same id or throws task not find exception
     * @see TaskNotFindException
     */
    @Override
    public Task getTaskById(Long id) {
        log.info("IN getTaskById - task find by id: {}",id);
        return  taskDatabase.findById(id).orElseThrow(TaskNotFindException::new);

    }

    /**
     *
     * @param name task name
     * @return task with same name
     */
    @Override
    public Task getTaskByName(String name) {
        log.info("IN getTaskByName - task find by name: {}",name);
        return taskDatabase.findByName(name);
    }

    /**
     *
     * @param id project id
     * @return project with this id
     */
    @Override
    public Project getProjectById(Long id) {
        log.info("IN getProjectById - project find by id: {}",id);
        return projectDatabase.findById(id).orElseThrow(ProjectNotFindException::new);
    }

    /**
     *
     * @param string to find in project list
     * @return projects with similarities
     */
    @Override
    public List<Project> searchProjectByString(String string) {
        List<Project> list = projectDatabase.findAll();
        log.info("IN searchProjectByString - projects find by string: {} , projects find size: {}",string, list.size());
        return list.stream()
                .filter(project -> project.getName().contains(string))
                .collect(Collectors.toList());
    }

    /**
     *
     * @param string name of task
     * @return list of task
     */
    @Override
    public List<Task> searchTaskByString(String string) {
        List<Task> list = taskDatabase.findAll();
        log.info("IN searchTaskByString - tasks find by string: {} , tasks find size: {}",string, list.size());
        return list.stream()
                .filter(task -> task.getName().contains(string))
                .collect(Collectors.toList());
    }

    /**
     * Saves to database project
     * @param project object
     */
    @Override
    public void createProject(Project project) {
        projectDatabase.save(project);
        log.info("IN createProject - successfully saved project");
    }

    /**
     * Delete project with same name from database
     * @param name String
     */
    @Override
    public void deleteProjectByName(String name) {
        projectDatabase.deleteByName(name);
        log.info("IN deleteProjectByName - successfully deleted project by name: {}",name);
    }

    /**
     * Delete task with same id from database
     * @param id Long
     */
    @Override
    public void deleteTaskById(Long id) {
        taskDatabase.deleteById(id);
        log.info("IN deleteTaskById - successfully deleted task by id: {}",id);
    }

    /**
     * Delete project with same id from database
     * @param id Long
     */
    @Override
    public void deleteProjectById(Long id) {
        projectDatabase.deleteById(id);
        log.info("IN deleteProjectById - successfully deleted project by id: {}",id);
    }

    /**
     * Clone old project object form database and update all parameters from new project
     * @param newProject new object
     * @param id project id
     */
    @Override
    public void updateProject(Project newProject, Long id) {
        Project oldProject =projectDatabase.findById(id).orElseThrow(ProjectNotFindException::new);
        oldProject.setName(newProject.getName());
        oldProject.setDescription(newProject.getDescription());
        oldProject.setStatus(newProject.getStatus());
        projectDatabase.save(oldProject);
        log.info("IN updateProject - successfully updated old project");
    }

    /**
     * Clone old task object form database and update all parameters from new task
     * @param newTask object
     * @param id task id
     */
    @Override
    public void updateTask(Task newTask, Long id) {
        Task oldTask=taskDatabase.findById(id).orElseThrow(TaskNotFindException::new);
        oldTask.setName(newTask.getName());
        oldTask.setPriority(newTask.getPriority());
        oldTask.setDescription(newTask.getDescription());
        oldTask.setStatus(newTask.getStatus());
        taskDatabase.save(oldTask);
        log.info("IN updateTask - successfully updated old task");
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
        log.info("IN createTaskAndAssignToProject - successfully assigned to projectId: {}, new task",id);
    }
}
