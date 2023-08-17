package com.net.fisher.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationResponse {
    private double latitude;
    private double longitude;
}
