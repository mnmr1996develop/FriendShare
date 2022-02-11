package com.MichaelRichards.FriendShare.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;


@Entity
@Getter
@Setter
@Table
@ToString
@NoArgsConstructor
public class UserInformation {

    public UserInformation(String nickname, String hobby) {
        this.nickname = nickname;
        this.hobby = hobby;
    }

    @JsonIgnore
    @OneToOne(mappedBy = "userInformation", cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.PERSIST})
    private User user;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @Column
    private String nickname;

    @Column
    private String hobby;
}
