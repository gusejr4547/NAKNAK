package com.net.fisher.file.service;

import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.file.FileInfo;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FileService {
    @Value("${app.fileupload.uploadDir}")
    String uploadFolder;

    @Value("${app.fileupload.uploadPath}")
    String uploadPath;

    public List<FileInfo> uploadFiles(List<MultipartFile> fileList) throws IOException {
        File rollback = null;
        try {
            List<FileInfo> infoList = new ArrayList<>();
            File uploadDir = new File(uploadPath + File.separator + uploadFolder);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
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
            throw new BusinessLogicException(ExceptionCode.FAILED_TO_UPDATE_FILE);
        }
    }
}
