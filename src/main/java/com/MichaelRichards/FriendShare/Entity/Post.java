package com.MichaelRichards.FriendShare.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
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
        this.localDateTime = ZonedDateTime.now(ZoneId.of("UTC"));
        this.numberOfComments = getNumberOfComments();
        this.containsLinkedImage = getContainsLinkedImage();
    }

    public Post(User user, String status, String imageLink) {
        this.user = user;
        this.status = status;
        this.imageLink = imageLink;
        this.localDateTime = ZonedDateTime.now(ZoneId.of("UTC"));
        this.numberOfComments = getNumberOfComments();
        this.containsLinkedImage = getContainsLinkedImage();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private ZonedDateTime localDateTime;

    private String imageLink;

    @Transient
    @Setter(value = AccessLevel.NONE)
    private boolean containsLinkedImage;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    private User user;

    @NotNull
    private String status;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @Transient
    @Setter(value = AccessLevel.NONE)
    private Integer numberOfComments;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    private List<User> likes;

    public void addLike(User user){
        if(likes.isEmpty()){
            likes = new ArrayList<>();
        }
        likes.add(user);
    }

    public Integer getNumberOfComments() {
        return comments.size();
    }

    public Boolean getContainsLinkedImage(){
        return imageLink != null && (!imageLink.isEmpty());
    }

    public void removeLike(User user){
        likes.remove(user);
    }

    public void addComment(Comment comment){
        comments.add(comment);
    }



    public void deleteComment(Comment comment){
        comments.remove(comment);
    }

    public void clearComments(){
        comments.clear();
    }

}
