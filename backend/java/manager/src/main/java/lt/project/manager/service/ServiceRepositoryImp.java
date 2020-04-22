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

@Service
public class ServiceRepositoryImp implements ServiceRepository {

    @Autowired
    RepoProject projectDatabase;

    @Autowired
    RepoTask taskDatabase;

    @Override
    public List<Project> getProjects() {
        return (List<Project>) projectDatabase.findAll();
    }

    @Override
    public List<Task> getTasks() {
        return (List<Task>) taskDatabase.findAll();
    }

    @Override
    public List<Project> getProjectByName(String name) {
        return projectDatabase.findByName(name);
    }

    @Override
    public Task getTaskById(Long id) {
        return taskDatabase.findById(id).orElseThrow(TaskNotFindException::new);
    }

    @Override
    public Task getTaskByName(String name) {
        return taskDatabase.findByName(name);
    }

    @Override
    public void createProject(Project project) {
        projectDatabase.save(project);
    }

    @Override
    public void deleteProjectByName(String name) {
        projectDatabase.deleteByName(name);
    }

    @Override
    public void deleteTaskById(Long id) {
        taskDatabase.deleteById(id);
    }

    @Override
    public void updateProject(Project project, Long id) {
        Project p =projectDatabase.findById(id).orElseThrow(ProjectNotFindException::new);
        p.setName(project.getName());
        p.setDescription(project.getDescription());
        p.setStatus(project.getStatus());
        projectDatabase.save(p);
    }

    @Override
    public void updateTask(Task task, Long id) {
        Task t=taskDatabase.findById(id).orElseThrow(TaskNotFindException::new);
        t.setName(task.getName());
        t.setPriority(task.getPriority());
        t.setStatus(task.getStatus());
        taskDatabase.save(t);

    }

    @Override
    public void createTaskAndAssignToProject(Task task, Long id)  {
        Project p =projectDatabase.findById(id).orElseThrow(ProjectNotFindException::new);
        p.addTask(task);
        projectDatabase.save(p);
    }
}
