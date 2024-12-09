package com.filip.demo.notesappservice.mapper;

import com.filip.demo.notes_app_service.model.NoteRequestRestDTO;
import com.filip.demo.notes_app_service.model.NoteRestDTO;
import com.filip.demo.notesappservice.model.Note;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NoteMapper {

  NoteRestDTO noteToRestDTO(Note note);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "authorId", ignore = true)
  Note noteRequestDtoToEntity(NoteRequestRestDTO requestRestDTO);

}
