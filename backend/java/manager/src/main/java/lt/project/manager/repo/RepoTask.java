package lt.project.manager.repo;

import lt.project.manager.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Jpa database interface
 * @author  Edgaras Venzlauskas
 * @version 1.0
 *
 */

public interface RepoTask extends JpaRepository<Task, Long> {

    @Override
    Page<Task> findAll(Pageable pageable);

    @Transactional
    Task findByName(String name);
}
