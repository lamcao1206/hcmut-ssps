package com.lamcao1206.hcmut_ssps.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrintOrderDTO {
    private Long id;
    private String status;
    private String orientation;
    private int numCopies;
    private String documentName;
    private String documentType;
    private Integer page;
    private String url;
    private Long printerId;
}
