package lt.project.manager.transfer;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lt.project.manager.enums.Priority;
import lt.project.manager.enums.Status;
import lt.project.manager.model.Task;

@Data
@Setter
@Getter
public class TransferTask {

    private String name;
    private Priority priority;
    private Status status;
	
	public Task build() {
		return new Task(name, priority, status);
	}

}