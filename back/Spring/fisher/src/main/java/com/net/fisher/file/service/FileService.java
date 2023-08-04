package com.net.fisher.file.service;

import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.file.FileInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class FileService {
    @Value("${app.fileupload.uploadDir}")
    String uploadFolder;

    @Value("${app.fileupload.uploadPath}")
    String uploadPath;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public List<FileInfo> uploadFiles(List<MultipartFile> fileList) throws IOException {
        File rollback = null;
        try {
            List<FileInfo> infoList = new ArrayList<>();
            File uploadDir = new File(uploadPath + File.separator + uploadFolder);
            logger.error(uploadDir.getAbsolutePath());
            if (!uploadDir.exists()) {
                boolean e =  uploadDir.mkdirs();
                String er = e?"OK":"NO";
                logger.error(er);
            }

            for (MultipartFile part : fileList) {
                String fileName = part.getOriginalFilename();
                UUID uuid = UUID.randomUUID();
                String extension = FilenameUtils.getExtension(fileName);
                String savingFileName = uuid + "." + extension;
                File destFile = new File(uploadPath + File.separator + uploadFolder + File.separator + savingFileName);
                part.transferTo(destFile);
                rollback = destFile;
                infoList.add(new FileInfo(fileName, part.getSize(), part.getContentType(), uploadFolder + "/" + savingFileName));
            }

            return infoList;
        }catch (Exception e) {
            e.printStackTrace();
            if (rollback != null && rollback.exists()) {
                rollback.delete();
            }
            logger.error(e.getMessage());
            throw new BusinessLogicException(ExceptionCode.FAILED_TO_UPDATE_FILE);
        }
    }
}
