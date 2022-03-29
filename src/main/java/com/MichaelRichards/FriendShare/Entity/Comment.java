package com.MichaelRichards.FriendShare.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@EqualsAndHashCode
public class Comment {

    public Comment( Post post, User user, String comment) {
        this.post = post;
        this.user = user;
        this.comment = comment;
        this.localDateTime = LocalDateTime.now();
    }

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    private Post post;


    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    private User user;

    @Column
    private String comment;

    private LocalDateTime localDateTime;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
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

}
