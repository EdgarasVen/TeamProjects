package lt.project.manager.repo;

import lt.project.manager.model.Project;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * JPA database interface
 * @author  IT Crew
 * @version 1.0
 *
 */

public interface RepoProject extends CrudRepository<Project,Long> {

    @Transactional
    void deleteByName(String name);
    @Transactional
    Project findByName(String name);
}
