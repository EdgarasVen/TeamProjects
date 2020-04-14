package lt.project.manager.exceptions;

/**
 * Exception class for search if object not find
 * @author  IT Crew
 * @version 1.0
 *
 */

public class TaskNotFindException extends RuntimeException {
    public TaskNotFindException() {

    }

    @Override
    public String toString() {
        return "Task Not Find ";
    }
}
