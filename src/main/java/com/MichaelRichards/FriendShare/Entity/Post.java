package com.MichaelRichards.FriendShare.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@EqualsAndHashCode
public class Post {

    public Post(User user, String status) {
        this.user = user;
        this.status = status;
        this.localDateTime = LocalDateTime.now();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime localDateTime;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    private User user;

    @NotNull
    private String status;

    @ManyToMany
    private List<Post> comments;

    @ManyToMany
    private List<User> likes;

    public void addLike(User user){
        if(likes.isEmpty()){
            likes = new ArrayList<>();
        }
        likes.add(user);
    }

    public void removeLike(User user){
        likes.remove(user);
    }

    public void addComment(Post post){
        if(comments.isEmpty()){
            comments = new ArrayList<>();
        }
        comments.add(post);
    }

    public void deleteComment(Post post){
        comments.remove(post);
    }


}
