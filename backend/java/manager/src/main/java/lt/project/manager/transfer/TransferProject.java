package lt.project.manager.transfer;

import javafx.scene.input.DataFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lt.project.manager.enums.Status;
import lt.project.manager.model.Project;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

@Data
@Setter
@Getter
public class TransferProject {

    @NotNull
    @Length(min=1,max=120)
    private String name;
    @NotNull
    @Length(min=1,max=120)
    private String description;
    private Status status;

    public Project build(){
        return new Project(
                name,
                description,
                status);
    }
}
