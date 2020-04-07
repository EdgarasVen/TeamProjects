package lt.project.manager.model;

import javax.persistence.Entity;


public class Project {

    private String name;
    private String description;
    private String companyName;

    public Project(String name, String description, String companyName) {
        this.name = name;
        this.description = description;
        this.companyName = companyName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
