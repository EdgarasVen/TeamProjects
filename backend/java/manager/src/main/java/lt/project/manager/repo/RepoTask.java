package lt.project.manager.repo;

import lt.project.manager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Jpa database interface
 * @author  IT Crew
 * @version 1.0
 *
 */

public interface RepoTask extends JpaRepository<Task, Long> {

    @Transactional
    List<Task> findByName(String name);
}
