package com.net.fisher.file.service;

import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.file.FileInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
/*import org.slf4j.Logger;
import org.slf4j.LoggerFactory;*/
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
@Slf4j
public class FileService {
    @Value("${app.fileupload.uploadDir}")
    String uploadFolder;

    @Value("${app.fileupload.uploadPath}")
    String uploadPath;

    private final Set<String> permittedExtensions;

    //private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public FileService(Set<String> permittedExtensions) {
        this.permittedExtensions = permittedExtensions;
        permittedExtensions.add("jpeg");
        permittedExtensions.add("jpg");
        permittedExtensions.add("png");
        permittedExtensions.add("gif");
    }


    public List<FileInfo> uploadFiles(List<MultipartFile> fileList) throws IOException {
        File rollback = null;
        try {
            List<FileInfo> infoList = new ArrayList<>();
            File uploadDir = new File(uploadPath + File.separator + uploadFolder);
            log.error(uploadDir.getAbsolutePath());
            if (!uploadDir.exists()) {
                boolean e =  uploadDir.mkdirs();
                String er = e?"OK":"NO";
                log.error(er);
            }

            for (MultipartFile part : fileList) {
                String fileName = part.getOriginalFilename();
                UUID uuid = UUID.randomUUID();
                String extension = FilenameUtils.getExtension(fileName);
                if(!extensionCheck(extension)) throw new BusinessLogicException(ExceptionCode.UNACCEPTABLE_EXTENSION);
                String savingFileName = uuid + "." + extension;
                File destFile = new File(uploadPath + File.separator + uploadFolder + File.separator + savingFileName);
                part.transferTo(destFile);
                rollback = destFile;
                infoList.add(new FileInfo(fileName, part.getSize(), part.getContentType(), uploadFolder + "/" + savingFileName));
            }
            return infoList;
        }catch (BusinessLogicException e){
            e.printStackTrace();
            if (rollback != null && rollback.exists()) {
                rollback.delete();
            }
            log.error(e.getMessage());
            throw new BusinessLogicException(e.getExceptionCode());
        }
        catch (IOException e) {
            e.printStackTrace();
            if (rollback != null && rollback.exists()) {
                rollback.delete();
            }
            log.error(e.getMessage());
            throw new BusinessLogicException(ExceptionCode.FAILED_TO_UPDATE_FILE);
        }
    }

    private boolean extensionCheck(String extension){
        return permittedExtensions.contains(extension);
    }
}
