package lt.project.manager.transfer;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lt.project.manager.enums.Priority;
import lt.project.manager.enums.Status;
import lt.project.manager.model.Task;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

@Data
@Setter
@Getter
public class TransferTask {

    @NotNull
    @Length(min=1,max=120)
    private String name;
    private Priority priority;
    private Status status;
	
	public Task build() {
		return new Task(name, priority, status);
	}

}