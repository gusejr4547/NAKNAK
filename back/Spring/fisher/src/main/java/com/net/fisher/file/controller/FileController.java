package com.net.fisher.file.controller;


import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;

@Controller
public class FileController {
    @Value("${app.fileupload.uploadDir}")
    String uploadFolder;

    @Value("${app.fileupload.uploadPath}")
    String uploadPath;

    @GetMapping("/upload/{name}")
    public void download(@PathVariable String name, HttpServletResponse response)throws Exception{
        File uploadDir = new File(uploadPath + File.separator + uploadFolder + File.separator + name);

        /*System.out.println(uploadDir.getPath());
        System.out.println(uploadDir.getName());*/

        response.setHeader("Content-Disposition","attachment;filename=" + uploadDir.getName());
        try(FileInputStream fileInputStream = new FileInputStream(uploadDir)){
            OutputStream out = response.getOutputStream();

            int read = 0;
            byte[] buffer = new byte[1024];
            while ((read = fileInputStream.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }

        }catch(Exception e){
            e.printStackTrace();
            throw new Exception("Download Error");
        }
    }
}
