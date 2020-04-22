package lt.project.manager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.project.manager.enums.Priority;
import lt.project.manager.enums.Status;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Data
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Task {

    /*Užduoties ID
    Užduoties pavadinimas
    Užduoties aprašymas (User story formatas)
    Užduoties prioritetas: žemas, vidutinis, aukštas
    Užduoties būsena: padaryti, daroma, padaryta
    Automatiškai užpildomos užduoties sukūrimo ir atnaujinimo datos.
    */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column(name = "CREATE_DATE")
    private LocalDate date;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    public Task(String name, Priority priority, Status status) {
        this.name = name;
        this.priority = priority;
        this.status = status;
        date=LocalDate.now();
    }

}
