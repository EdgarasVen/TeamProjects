package lt.project.manager.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lt.project.manager.transfer.TransferProject;
import lt.project.manager.transfer.TransferTask;

public class PutApi extends ApiController{

	@PutMapping("/api/project/{projectId}")
	public void updateProject(@RequestBody TransferProject project,@PathVariable Long id) {
		
		  repository.updateProject(project.build(), id);
	}
	
	@PutMapping("/api/task/{taskId}")
	public void updateTask(@RequestBody TransferTask task,@PathVariable Long id) {
		 
		  repository.updateTask(task.build(), id);
	}
}
