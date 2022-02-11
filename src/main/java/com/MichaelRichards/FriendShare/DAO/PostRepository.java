package com.MichaelRichards.FriendShare.DAO;

import com.MichaelRichards.FriendShare.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findById(Long id);
}
