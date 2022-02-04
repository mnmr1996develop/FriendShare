package com.MichaelRichards.FriendShare.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

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
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime localDateTime;

    @ManyToOne
    @JsonIgnore
    private User user;

    @NotNull
    private String status;


}
