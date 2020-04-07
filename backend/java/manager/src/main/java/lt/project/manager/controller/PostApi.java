package lt.project.manager.controller;

import lt.project.manager.transfer.TransferProject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class PostApi extends ApiController{

    @PostMapping("/api/project")
    public void createNewProject(@RequestBody TransferProject project){
        repository.createProject(project.build());
    }
}
