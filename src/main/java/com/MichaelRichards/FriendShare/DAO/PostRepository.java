package com.MichaelRichards.FriendShare.DAO;

import com.MichaelRichards.FriendShare.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
