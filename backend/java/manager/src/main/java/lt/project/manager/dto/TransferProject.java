package lt.project.manager.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lt.project.manager.enums.Status;
import lt.project.manager.model.Project;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

/**
 * Transfer object for project entity creation
 * @see Project
 * @author  Edgaras Venzlauskas
 * @version 1.0
 *
 */

@Data
@Setter
@Getter
public class TransferProject {

    @NotNull
    @Length(min=1,max=120)
    private String name;
    @NotNull
    @Length(min=1,max=320)
    private String description;
    private Status status;

    /**
     * Builds from parameters Project
     * @return project
     */
    public Project build(){
        return new Project(
                name,
                description,
                status);
    }
}
