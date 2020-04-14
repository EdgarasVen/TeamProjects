package lt.project.manager.model;

import lombok.*;
import lt.project.manager.enums.Status;

import javax.persistence.*;
import java.util.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@Entity
public class Project {

    /*Sistemos pagrindiniame lange pateikiamas projektų sąrašas. Projekto sąrašas turi teikti tokią informaciją:
    Projekto pavadinimas
    Projekto aprašymas
    Projekto informacija:
        Projekto būsena: vykdomas, užbaigtas
        Projekto bendras užduočių kiekis
        Projekto neatliktų užduočių kiekis*/

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private Status status;
    @OneToMany(mappedBy = "project",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<Task> taskSet = new ArrayList<>();

    public Project(String name, String description, Status status) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    public void addTask(Task task){
        taskSet.add(task);
        task.setProject(this);
    }
}
