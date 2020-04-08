package lt.project.manager.transfer;

import lt.project.manager.enums.Status;
import lt.project.manager.model.Project;

public class TransferProject {

    private String name;
    private String description;
    private Status status;

    public Project build(){
        return new Project(name,
                description,
                status);
    }
}
