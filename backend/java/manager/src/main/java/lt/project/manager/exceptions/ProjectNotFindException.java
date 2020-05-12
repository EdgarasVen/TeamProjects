package lt.project.manager.exceptions;

/**
 * Exception class for search if object not find
 * @author  Edgaras Venzlauskas
 * @version 1.0
 *
 */

public class ProjectNotFindException extends RuntimeException  {

    public ProjectNotFindException() {
    }

    @Override
    public String toString() {
        return "Project Not Find ";
    }
}
