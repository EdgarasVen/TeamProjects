package lt.project.manager.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lt.project.manager.enums.Priority;
import lt.project.manager.enums.Status;
import lt.project.manager.model.Task;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

/**
 * Transfer object for Task entity creation
 * @see Task
 * @author  Edgaras Venzlauskas
 * @version 1.0
 *
 */

@Data
@Setter
@Getter
public class TransferTask {

    @NotNull
    @Length(min=1,max=120)
    private String name;
    private Priority priority;
    @NotNull
    @Length(min=1,max=320)
    private String description;
    private Status status;

    /**
     * Builds from parameters Task
     * @return Task
     */
	public Task build() {
		return new Task(name, priority,description, status);
	}

}