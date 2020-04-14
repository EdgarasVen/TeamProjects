package lt.project.manager.repo;

import lt.project.manager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * JPA database interface
 * @author  IT Crew
 * @version 1.0
 *
 */

public interface RepoTask extends CrudRepository<Task, Long> {

    @Transactional
    Task findByName(String name);
}
