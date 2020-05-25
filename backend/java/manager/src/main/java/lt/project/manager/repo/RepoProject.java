package lt.project.manager.repo;

import lt.project.manager.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Jpa database interface
 * @author  Edgaras Venzlauskas
 * @version 1.0
 *
 */

public interface RepoProject extends JpaRepository<Project,Long> {

    @Override
    Page<Project> findAll(Pageable pageable);

    @Transactional
    void deleteByName(String name);
    @Transactional
    Project findByName(String name);
}
