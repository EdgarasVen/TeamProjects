package lt.project.manager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lt.project.manager.enums.Status;

import javax.persistence.*;
import java.util.*;

/**
 * Class represents Project entity and PROJECT table.
 *
 * @author  IT Crew
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
}
