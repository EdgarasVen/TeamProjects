package lt.project.manager.exceptions;

public class ProjectNotFindException extends RuntimeException  {

    public ProjectNotFindException() {
    }

    @Override
    public String toString() {
        return "Project Not Find ";
    }
}
