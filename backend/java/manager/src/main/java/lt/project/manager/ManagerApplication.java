package lt.project.manager;

import lt.project.manager.enums.Priority;
import lt.project.manager.enums.Status;
import lt.project.manager.model.Project;
import lt.project.manager.model.Task;
import lt.project.manager.repo.RepoProject;
import lt.project.manager.repo.RepoTask;
import lt.project.manager.service.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
public class ManagerApplication implements CommandLineRunner {

	@Autowired
	ServiceRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(ManagerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		/*Project p1 = new Project("Web","Create Web for UAB ", Status.WAITING);
		Project p2 = new Project("Backend","Create back for UAB ", Status.WAITING);
		Project p3 = new Project("asdasdaad","asdadsad for UAB ", Status.WAITING);

		p1.addTask(new Task("Test", Priority.LOW,Status.WAITING));
		p1.addTask(new Task("Start", Priority.MEDIUM,Status.WAITING));
		p1.addTask(new Task("Stop", Priority.HIGH,Status.WAITING));



		repository.createProject(p1);
		repository.createProject(p2);
		repository.createProject(p3);*/

		for (int i = 1; i < 20; i++) {
			Project p = new Project("Project  "+i,
					"Axios is promise-based and thus we can take " +
							"advantage of async and await for more readable " +
							"asynchronous code. We can also intercept and " +
							"cancel requests, and there’s built-in client " +
							"side protection against cross site request forgery. "
					, Status.WAITING);
			for (int j = 1; j < 10; j++) {
				p.addTask(new Task("Task  "+j, Priority.LOW,
						"Axios is promise-based and thus we can take " +
						"advantage of async and await for more readable " ,
						Status.WAITING));
			}
			repository.createProject(p);
		}

	}
}
