package lt.project.manager.repo;

import lt.project.manager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface RepoTask extends CrudRepository<Task, Long> {

    @Transactional
    Task findByName(String name);
}
