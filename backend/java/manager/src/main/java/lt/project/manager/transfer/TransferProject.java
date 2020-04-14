package lt.project.manager.transfer;

import javafx.scene.input.DataFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lt.project.manager.enums.Status;
import lt.project.manager.model.Project;

@Data
@Setter
@Getter
public class TransferProject {

    private String name;
    private String description;
    private Status status;

    public Project build(){
        return new Project(
                name,
                description,
                status);
    }
}
