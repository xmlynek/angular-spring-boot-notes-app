package com.filip.demo.notesappservice.service;

import com.filip.demo.notesappservice.model.Note;
import com.filip.demo.notesappservice.repository.NoteRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoteService {

  private final NoteRepository noteRepository;

  public List<Note> findAll() {
    return noteRepository.findAll();
  }

  public Note findById(String noteId) {
    return noteRepository.findById(noteId).orElseThrow();
  }

  @Transactional
  public Note createNote(Note note) {
    // TODO: add author
    return noteRepository.save(note);
  }

  @Transactional
  public Note updateNote(String noteId, Note note) {
    Note existingNote = findById(noteId);
    existingNote.setName(note.getName());
    existingNote.setContent(note.getContent());
    existingNote.setTags(note.getTags());
    existingNote.setIsPinned(note.getIsPinned());

    return noteRepository.save(existingNote);
  }

  @Transactional
  public void deleteById(String noteId) {
    noteRepository.deleteById(noteId);
  }
}
