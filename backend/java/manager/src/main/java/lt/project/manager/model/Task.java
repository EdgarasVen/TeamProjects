package lt.project.manager.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.project.manager.enums.Priority;
import lt.project.manager.enums.Status;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@Getter
@Setter
@NoArgsConstructor
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
    private Priority priority;
    private Status status;
    private Date date;

    public Task(String name, Priority priority, Status status) {
        this.name = name;
        this.priority = priority;
        this.status = status;
    }

}
