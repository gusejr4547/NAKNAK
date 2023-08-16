package com.net.fisher.config;

import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

<<<<<<< HEAD
public class LocalDateTimeSerializer implements JsonSerializer<LocalDateTime> {
=======
public class LocalDateTimeSerializer implements JsonSerializer<LocalDateTime> { // Mapper 를 통하지 않은 json builder 에서 LocalDateTime 에 대한 포맷을 지정할 수 있게하는 Serializer
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    public JsonElement serialize(LocalDateTime localDateTime, Type srcType, JsonSerializationContext context) {
        return new JsonPrimitive(formatter.format(localDateTime));
    }
}