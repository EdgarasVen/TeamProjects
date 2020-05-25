package lt.project.manager.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

/**
 * Creates pagination object with number and size.
 * @author  Edgaras Venzlauskas
 * @version 1.0
 */

@Data
@Setter
@Getter
public class TransferPagination {

    private int pageNumber;
    private int pageSize;

    public Pageable build(){
        Pageable element = PageRequest.of(pageNumber,pageSize);
        return element;
    }
}
