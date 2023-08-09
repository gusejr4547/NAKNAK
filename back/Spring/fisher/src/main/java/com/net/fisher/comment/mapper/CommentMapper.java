package com.net.fisher.comment.mapper;

import com.net.fisher.comment.dto.CommentDto;
import com.net.fisher.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment postToComment(CommentDto.Post commentPostDto);
}
