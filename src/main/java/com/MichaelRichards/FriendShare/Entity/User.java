package com.MichaelRichards.FriendShare.Entity;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;


@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Table(name = "Users")
public class User implements UserDetails {


    public User() {
        this.accountCreated = LocalDateTime.now();
    }

    public User(String firstName, String lastName, String email, String username, String password, Boolean accountNonLocked, Boolean accountNonExpired, Boolean credentialsNonExpired, Boolean enabled, LocalDate birthday) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.AccountNonLocked = accountNonLocked;
        this.AccountNonExpired = accountNonExpired;
        this.CredentialsNonExpired = credentialsNonExpired;
        this.enabled = enabled;
        this.birthday = birthday;
        this.age = getAge();
    }

    @Id
    @Column(name = "user_id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter(value = AccessLevel.NONE)
    private LocalDateTime accountCreated;

    @NotNull
    @Column(name = "first_name")
    private String firstName;

    @NotNull
    @Column(name = "last_name")
    private String lastName;

    @Email
    @NotNull
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "username")
    private String username;

    @NotNull
    @Column(name = "password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NotNull
    @Column(name = "non_locked")
    private Boolean AccountNonLocked;

    @NotNull
    @Column(name = "is_account_non_expired")
    private Boolean AccountNonExpired;

    @NotNull
    @Column(name = "is_credentials_non_expired")
    private Boolean CredentialsNonExpired;

    @NotNull
    @Column(name = "enabled")
    private Boolean enabled;

    @Past
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Authority> authorities;

    @Transient
    @Setter(value = AccessLevel.NONE)
    private Long age;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_information_id")
    private UserInformation userInformation = new UserInformation(getFirstName(), "");


    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> friends = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> request = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> sentFriendRequest;

    public Long getAge(){
        return ChronoUnit.YEARS.between(birthday ,LocalDate.now());
    }


    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return AccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return AccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return CredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public boolean addAuthority(Authority authority){
        if (authorities.isEmpty()){
            authorities = new ArrayList<>();
        }
        if (authorities.contains(authority)){
            return false;
        }
        else {
            authorities.add(authority);
            return true;
        }
    }

    public void addPost(Post post){
        posts.add(post);
    }

    public void addComment(Comment comment){
        comments.add(comment);
    }

    public void addFriend(User user){
        if(friends.isEmpty()){
            friends = new ArrayList<>();
        }
        if(friends.contains(user)){
            return;
        }
        friends.add(user);
    }

    public void myFriendRequest(User user){
        if(request.contains(user) || friends.contains(user)){
            return;
        }
        request.add(user);
    }

    public void sentFriendRequest(User user){
        if(sentFriendRequest.isEmpty()){
            sentFriendRequest = new ArrayList<>();
        }
        if(sentFriendRequest.contains(user) || friends.contains(user)){
            return;
        }
        sentFriendRequest.add(user);
    }

    public void deleteFriend(User user){
        friends.remove(user);
    }

    public void deletePost(Long id) {
        posts.removeIf(post -> Objects.equals(post.getId(), id));
    }


    public void removeComment(Comment comment) {
        comments.remove(comment);
    }

    public void deleteComment(Long id) {
        comments.removeIf(
                comment -> Objects.equals(comment.getId(), id)
        );
    }

    public void deleteComment(Comment comment) {
        comments.remove(comment);
    }


}
