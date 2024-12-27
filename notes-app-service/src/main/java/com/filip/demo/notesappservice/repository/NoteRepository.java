package com.filip.demo.notesappservice.repository;

import com.filip.demo.notesappservice.model.Note;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoteRepository extends MongoRepository<Note, String> {

  List<Note> findAllByAuthorId(UUID authorId);

  Optional<Note> findByIdAndAuthorId(String id, UUID authorId);

  void deleteByIdAndAuthorId(String id, UUID authorId);
}
