package lt.project.manager.transfer;

import lt.project.manager.enums.Priority;
import lt.project.manager.enums.Status;
import lt.project.manager.model.Task;

public class TransferTask {

    private String name;
    private Priority priority;
    private Status status;
	
	public Task build() {
		return new Task(name, priority, status);
	}

}