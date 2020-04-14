package lt.project.manager.exceptions;

public class TaskNotFindException extends RuntimeException {
    public TaskNotFindException() {

    }

    @Override
    public String toString() {
        return "Task Not Find ";
    }
}
