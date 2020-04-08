package lt.project.manager.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.project.manager.enums.Status;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Setter
@Getter
@NoArgsConstructor
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
    private Status status;

    public Project(String name, String description, Status status) {
        this.name = name;
        this.description = description;
        this.status = status;
    }
}
