package lt.project.manager.model;

import lombok.*;
import lt.project.manager.enums.Status;

import javax.persistence.*;
import java.util.*;

/**
 * Class represents Project entity and PROJECT table.
 *
 * @author  Edgaras Venzlauskas
 * @version 1.0
 *
 */

@Data
@Setter
@Getter
@NoArgsConstructor
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Long taskCompleted;
    private int taskSize;
    private Long percentage;

    @Enumerated(EnumType.STRING)
    private Status status;
    //@JsonIgnore
    @OneToMany(mappedBy = "project",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<Task> tasks = new ArrayList<>();

    public Project(String name, String description, Status status) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    /**
     * Method add task object to list of tasks and set this project to task
     * @param task Object
     */
    public void addTask(Task task){
        task.setProjectN(this.getName());
        tasks.add(task);
        task.setProject(this);
    }

    public int getTaskSize() {
        return tasks.size();
    }

    public Long getTaskCompleted() {
        return tasks.stream()
                .filter(task -> task.getStatus()==Status.FINISHED)
                .count();
    }

    public Long getPercentage() {
        if (getTaskSize()==0)
            return 100L;
        else
        return getTaskCompleted()*100/getTaskSize();
    }
}
