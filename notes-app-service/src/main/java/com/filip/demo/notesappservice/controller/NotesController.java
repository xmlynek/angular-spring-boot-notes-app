package com.filip.demo.notesappservice.controller;

import com.filip.demo.notes_app_service.api.NotesApi;
import com.filip.demo.notes_app_service.model.NoteRequestRestDTO;
import com.filip.demo.notes_app_service.model.NoteRestDTO;
import com.filip.demo.notesappservice.mapper.NoteMapper;
import com.filip.demo.notesappservice.service.NoteService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class NotesController implements NotesApi {

  private final NoteService noteService;
  private final NoteMapper noteMapper;


  @Override
  public ResponseEntity<List<NoteRestDTO>> getNotes() {
    return ResponseEntity.ok(
        noteService.findAll().stream().map(noteMapper::noteToRestDTO).toList());
  }

  @Override
  public ResponseEntity<NoteRestDTO> getNoteById(String noteId) {
    return ResponseEntity.ok(noteMapper.noteToRestDTO(noteService.findById(noteId)));
  }

  @Override
  public ResponseEntity<NoteRestDTO> createNote(NoteRequestRestDTO noteRestDTO) {
    return ResponseEntity.status(HttpStatus.CREATED).body(noteMapper.noteToRestDTO(
        noteService.createNote(noteMapper.noteRequestDtoToEntity(noteRestDTO))));
  }

  @Override
  public ResponseEntity<NoteRestDTO> updateNote(String noteId,
      NoteRequestRestDTO noteRequestRestDTO) {
    return ResponseEntity.ok(noteMapper.noteToRestDTO(
        noteService.updateNote(noteId, noteMapper.noteRequestDtoToEntity(noteRequestRestDTO))));
  }

  @Override
  public ResponseEntity<Void> deleteNote(String noteId) {
    noteService.deleteById(noteId);
    return ResponseEntity.ok().build();
  }
}
