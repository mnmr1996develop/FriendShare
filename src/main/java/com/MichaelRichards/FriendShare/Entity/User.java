package com.MichaelRichards.FriendShare.Entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.UUID;

@Entity
@Table(name = "User")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class User implements UserDetails {

    public User(String firstName, String lastName, String email, String username, String password, boolean locked, boolean isAccountExpired, boolean isCredentialsExpired, boolean enabled, LocalDate birthday) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.locked = locked;
        this.isAccountExpired = isAccountExpired;
        this.isCredentialsExpired = isCredentialsExpired;
        this.enabled = enabled;
        this.birthday = birthday;
        this.age = getAge();
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @NotNull
    @Column(name = "first_name")
    private String firstName;

    @NotNull
    @Column(name = "last_name")
    private String lastName;

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


    @Column(name = "locked")
    private boolean locked;

    @Column(name = "is_account_expired")
    private boolean isAccountExpired;

    @Column(name = "is_credentials_expired")
    private boolean isCredentialsExpired;

    @Column(name = "enabled")
    private boolean enabled;

    @Past
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    @Transient
    private Long age;


    public Long getAge(){
        return ChronoUnit.YEARS.between(birthday ,LocalDate.now());
    }





    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !isAccountExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !isCredentialsExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
