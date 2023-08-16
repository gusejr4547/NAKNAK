package com.net.fisher.service;

import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostTag;
import com.net.fisher.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SchedulerService {
    private final PostRepository postRepository;

    @Value("${app.dataupload.uploadDir}")
    String uploadFolder;
    @Value("${app.dataupload.uploadPath}")
    String uploadPath;

    @Scheduled(fixedDelay = 300000)
    public void makeCSV() throws IOException {

        File uploadDir = new File(uploadPath + File.separator + uploadFolder);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        String filePath = uploadPath + File.separator + uploadFolder + File.separator + "data.csv";
        System.out.println("##############");
        System.out.println(filePath);
        File file = new File(filePath); // File객체 생성

        if(!file.exists()){ // 파일이 존재하지 않으면
            file.createNewFile(); // 신규생성
        }

        List<Post> post = postRepository.findAllPost();
        BufferedWriter bw = new BufferedWriter(new FileWriter(file));
        StringBuilder sb = new StringBuilder();
        for(Post p : post){
            for(PostTag pt : p.getPostTagList()){
                sb.append(p.getMember().getMemberId())
                        .append(",").append(pt.getTag().getTagId())
                        .append(",").append(1).append(System.lineSeparator());
            }
        }
        bw.write(sb.toString());
        bw.flush();
        bw.close();

    }
}
