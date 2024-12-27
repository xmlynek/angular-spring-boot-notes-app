package com.filip.demo.notesappservice.service;

import com.filip.demo.notesappservice.exception.NoteNotFoundException;
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
  private final UserProvider userProvider;

  public List<Note> findAll() {
    return noteRepository.findAllByAuthorId(userProvider.getUserId());
  }

  public Note findById(String noteId) {
    return noteRepository.findByIdAndAuthorId(noteId, userProvider.getUserId())
        .orElseThrow(NoteNotFoundException::new);
  }

  @Transactional
  public Note createNote(Note note) {
    note.setAuthorId(userProvider.getUserId());
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
    noteRepository.deleteByIdAndAuthorId(noteId, userProvider.getUserId());
  }
}
