package lt.project.manager.dto;

import lombok.Data;

/**
 * DTO class for authentication (login) request.
 *
 * @author Edgaras Venzlauskas
 * @version 1.0
 */

@Data
public class AuthenticationRequestDto {
    private String username;
    private String password;
}
