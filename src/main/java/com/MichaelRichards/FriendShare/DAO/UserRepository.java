package com.MichaelRichards.FriendShare.DAO;

import com.MichaelRichards.FriendShare.Entity.Post;
import com.MichaelRichards.FriendShare.Entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query("SELECT p FROM User p WHERE CONCAT(p.username) LIKE %?1%")
    List<User> search(String keyword);


    @Query(value = "SELECT p From Post p Where p.user IN (?1)")
    List<Post> userFriendsPost(List<User> friends, Pageable pageable);

    @Query("SELECT count(p) From Post p Where p.user IN (?1)")
    Long userFriendsPostCount(List<User> friends);



}
