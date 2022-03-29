package com.MichaelRichards.FriendShare.DAO;

import com.MichaelRichards.FriendShare.Entity.Comment;
import com.MichaelRichards.FriendShare.Entity.Post;
import com.MichaelRichards.FriendShare.Entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findById(Long id);

    @Query(value = "SELECT p.comments From Post p Where p.id =(?1)")
    List<Comment> getCommentsPageable(Long id, Pageable pageable);
}
