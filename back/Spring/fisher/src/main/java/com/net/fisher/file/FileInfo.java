package com.net.fisher.file;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class FileInfo {
    private String fileName;
    private long fileSize;
    private String contentType;
    private String fileUrl;
}
