package com.MichaelRichards.FriendShare.Service;


import com.MichaelRichards.FriendShare.APIResponses.Exception.EmailTakenException;
import com.MichaelRichards.FriendShare.APIResponses.Exception.LoginNotMatchException;
import com.MichaelRichards.FriendShare.APIResponses.Exception.UsernameNotFoundException;
import com.MichaelRichards.FriendShare.APIResponses.Exception.UsernameTakenException;
import com.MichaelRichards.FriendShare.DAO.AuthorityRepository;
import com.MichaelRichards.FriendShare.DAO.UserRepository;
import com.MichaelRichards.FriendShare.Entity.Authority;
import com.MichaelRichards.FriendShare.Entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;


@Service @Slf4j @Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username)  {
        return findUserByUsername(username);
    }

    public List<User> findAll(){
        List<User> users = userRepository.findAll();
        if (users.isEmpty()){
            return new ArrayList<>();
        }
        else return users;
    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow(
                () ->
                        new UsernameNotFoundException(username)
        );
    }

    public User saveUser(User user){

        boolean isUsernameTaken = userRepository.findByUsername(user.getUsername()).isPresent();
        boolean isEmailTaken = userRepository.findByEmail(user.getEmail()).isPresent();


        if(!isEmailTaken && !isUsernameTaken) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
//            return GoodUserRequest.accountSaved(user);
            return user;
        }
        else if(isEmailTaken){
            throw new EmailTakenException(user.getEmail());
        }
        else {
            throw new UsernameTakenException(user.getUsername());
        }
    }

    public void deleteUserByUsername(String username){
        User user = userRepository.findByUsername(username).orElseThrow(
                () ->
                        new UsernameNotFoundException(username)
        );
        userRepository.delete(user);
    }


    public User findById(Long id){
        return  userRepository.findById(id).orElse(null);
    }


    public ResponseEntity<User> updateUserByUsername(String username, String firstName, String lastName, String email, String Uname, String password, Boolean isAccountNonLocked, Boolean isAccountNonExpired, Boolean isCredentialsNonExpired, Boolean enabled) {

        User user = userRepository.findByUsername(username).orElseThrow(
                () ->
                        new UsernameNotFoundException(username)
        );;

        if(firstName != null) {
            String newFirstName = firstName.strip().replaceAll(" ", "");
            if (newFirstName.length() >= 3 && !newFirstName.equals(user.getFirstName())) {
                user.setFirstName(newFirstName);
            }
        }

        if(lastName != null) {
            String newLastName = lastName.strip().replaceAll(" ", "");
            if (newLastName.length() >= 3 && !newLastName.equals(user.getLastName())) {
                user.setLastName(newLastName);
            }
        }

        if(email != null) {
            String newEmail = email.strip().replaceAll(" ", "");

            if (newEmail.length() >= 5 && !newEmail.equals(user.getEmail())) {
                boolean isEmailPresent = userRepository.findByEmail(email).isPresent();

                if (isEmailPresent) {
                    throw new EmailTakenException(newEmail);
                } else {
                    user.setEmail(newEmail);
                }

            }
        }

        if(Uname != null){
            String newUname = Uname.strip().replaceAll(" ", "");
            if(newUname.length() >= 5 && !newUname.equals(user.getUsername())){

                boolean isUnameTaken = userRepository.findByUsername(newUname).isPresent();
                if (!isUnameTaken){
                    user.setUsername(newUname);
                }
                else {
                    throw new UsernameTakenException(newUname);
                }
            }
            else {
                throw new IllegalStateException("Username Does not fit Criteria");
            }
        }

        if(password != null){
            String newPassword = password.strip().replaceAll(" ", "");
            String passwordHashed = bCryptPasswordEncoder.encode(newPassword);
            if(newPassword.length() >= 8 &&
                    specialCharacterChecker(newPassword) &&
                    hasNumber(newPassword) &&
                    hasCapitalLetter(newPassword) &&
                    hasLowCaseLetter(newPassword) &&
                    !bCryptPasswordEncoder.matches(newPassword, user.getPassword())
            ){

                user.setPassword(passwordHashed);
            }
        }

        if(enabled != null && enabled != user.isEnabled()){
            user.setEnabled(enabled);
        }

        if(isAccountNonExpired != null &&isAccountNonExpired != user.isAccountNonExpired()){
            user.setAccountNonExpired(isAccountNonExpired);
        }

        if(isAccountNonLocked != null && isAccountNonLocked != user.isAccountNonLocked()){
            user.setAccountNonLocked(isAccountNonLocked);
        }

        if(isCredentialsNonExpired != null && isCredentialsNonExpired != user.isCredentialsNonExpired()){
            user.setCredentialsNonExpired(isCredentialsNonExpired);
        }
        return ResponseEntity.accepted().body(user);
    }

    private Boolean specialCharacterChecker(String string){
        Pattern pattern = Pattern.compile("[!@#$%&*()_+=|<>?{}\\[\\]~-]");
        return pattern.matcher(string).find();
    }

    private Boolean hasNumber(String string){
        Pattern digit = Pattern.compile("[0-9]");
        return digit.matcher(string).find();
    }

    private Boolean hasCapitalLetter(String string){
        Pattern letter = Pattern.compile("[A-Z]");
        return letter.matcher(string).find();
    }

    private boolean hasLowCaseLetter(String string) {
        Pattern letter = Pattern.compile("[a-z]");
        return letter.matcher(string).find();
    }

    public Authority saveAuthority(Authority authority) {
        return authorityRepository.save(authority);
    }

    public void addAuthorityToUser(String username, String authority){
        User user = findUserByUsername(username);
        Authority authority1 = authorityRepository.findByAuthority(authority);
        user.addAuthority(authority1);
    }

    public List<User> addFriend(String username, String friendName){
        User user = findUserByUsername(username);
        User friend = findUserByUsername(friendName);
        user.addFriend(friend);
        friend.addFriend(user);
        ArrayList<User> friendPair = new ArrayList<>();
        friendPair.add(user);
        friendPair.add(friend);
        return friendPair;

    }

}
