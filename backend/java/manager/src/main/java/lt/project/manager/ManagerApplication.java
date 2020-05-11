package lt.project.manager;

import lt.project.manager.dto.UserDto;
import lt.project.manager.enums.Priority;
import lt.project.manager.enums.Status;
import lt.project.manager.model.Project;
import lt.project.manager.model.Role;
import lt.project.manager.model.Task;
import lt.project.manager.model.User;
import lt.project.manager.service.ServiceRepository;
import lt.project.manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Lazy;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Date;

@EnableSwagger2
@SpringBootApplication
public class ManagerApplication implements CommandLineRunner {

	@Autowired
	ServiceRepository repository;

	UserService service;

	@Autowired
	public void setService( @Lazy UserService service){
		this.service = service;
	}

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

		Role role1= new Role();
		role1.setName("ROLE_ADMIN");
		role1.setStatus(Status.ACTIVE);
		role1.setCreated(new Date());

		Role role2= new Role();
		role2.setName("ROLE_USER");
		role2.setStatus(Status.ACTIVE);
		role2.setCreated(new Date());

		service.createRole(role1);
		service.createRole(role2);

		User user1=new User();
		user1.setCreated(new Date());
		user1.setUsername("admin");
		user1.setFirstName("Aleksej");
		user1.setLastName("Volodovich");
		user1.setEmail("some@email.com");
		user1.setPassword("admin");
		service.register(user1,"ROLE_ADMIN");

		User user2=new User();
		user2.setCreated(new Date());
		user2.setUsername("user");
		user2.setFirstName("Vladimir");
		user2.setLastName("Micha");
		user2.setEmail("some@email.com");
		user2.setPassword("user");
		service.register(user2,"ROLE_USER");

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
