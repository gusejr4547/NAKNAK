package com.net.fisher.conv;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class RequestMessage {
    private String username;
    private String channel;
    private List<Attachment> attachments;
}
