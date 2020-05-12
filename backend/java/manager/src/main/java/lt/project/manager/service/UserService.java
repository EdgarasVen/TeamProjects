package lt.project.manager.service;

import lt.project.manager.model.Role;
import lt.project.manager.model.User;

import java.util.List;

/**
 * Service interface for class {@link User}.
 *
 * @author Edgaras Venzlauskas
 * @version 1.0
 */

public interface UserService {

    User register(User user, String role);
    Role createRole(Role role);

    List<User> getAll();

    User findByUsername(String username);

    User findById(Long id);

    void delete(Long id);
}
