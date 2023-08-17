package com.net.fisher.service;

import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostTag;
import com.net.fisher.post.entity.UserPreference;
import com.net.fisher.post.repository.PostRepository;
import com.net.fisher.post.repository.PreferenceRepository;
import jakarta.transaction.Transactional;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class SchedulerService {
    private final PostRepository postRepository;

    private final PreferenceRepository preferenceRepository;
    private final int TRANSACTION_CHUNK_LIMIT = 10000;

    @Value("${app.dataupload.uploadDir}")
    String uploadFolder;
    @Value("${app.dataupload.uploadPath}")
    String uploadPath;


    @Scheduled(fixedDelay = 300000)
    @Transactional
    public void updatePreference() {
        Stream<Post> postStream = postRepository.streamAll();
        Set<UserPreference> preferenceSet = new HashSet<>();
        preferenceRepository.truncatePreference();
        postStream.forEach(post -> {
            for (PostTag postTag : post.getPostTagList()) {
                preferenceSet.add(UserPreference.builder()
                        .memberId(post.getMember().getMemberId())
                        .tagId(postTag.getTag().getTagId())
                        .rating(0.5)
                        .build());
                if (preferenceSet.size() == TRANSACTION_CHUNK_LIMIT) {
                    preferenceRepository.saveAll(preferenceSet);
                    preferenceSet.clear();
                }
            }
        });
        preferenceRepository.saveAll(preferenceSet);
        preferenceSet.clear();
    }

    /*@Scheduled(fixedDelay = 300000)
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

    }*/
}
