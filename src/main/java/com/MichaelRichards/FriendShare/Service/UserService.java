package com.MichaelRichards.FriendShare.Service;


import com.MichaelRichards.FriendShare.DAO.UserRepository;
import com.MichaelRichards.FriendShare.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;


@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username)  {
        User user =userRepository.findByUsername(username).orElse(null);

        return user;
    }

    public List<User> findAll(){
        List<User> users = userRepository.findAll();
        if (users.isEmpty()){
            return new ArrayList<>();
        }
        else return users;
    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username).orElse(null);
    }

    public void saveUser(User user){

        boolean isUsernameTaken = userRepository.findByUsername(user.getUsername()).isPresent();
        boolean isEmailTaken = userRepository.findByEmail(user.getEmail()).isPresent();


        if(!isEmailTaken && !isUsernameTaken) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        }
        else if(isEmailTaken){
            throw new IllegalStateException("Email "+ user.getEmail() +" Taken");
        }
        else {
            throw new IllegalStateException("Username "+ user.getUsername() +" Taken");
        }
    }

    public void deleteUserByUsername(String username){
        User user = userRepository.findByUsername(username).orElse(null);
        if(user == null){
            throw new IllegalStateException("User does not exist");
        }
        userRepository.delete(user);
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


    public User findById(Long id){
        return  userRepository.findById(id).orElse(null);
    }

    @Transactional
    public void updateUserByUsername(String username,
                                     String firstName,
                                     String lastName,
                                     String email,
                                     String Uname,
                                     String password,
                                     Boolean isAccountNonLocked,
                                     Boolean isAccountNonExpired,
                                     Boolean isCredentialsNonExpired,
                                     Boolean enabled) {

        User user = userRepository.findByUsername(username).orElseThrow(()-> new IllegalStateException("No User by that name"));

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
                    throw new IllegalStateException("Email " + newEmail + " already taken");
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
                    throw new IllegalStateException("Username Taken");
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
                    !passwordHashed.equals(user.getPassword())){

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

    }
}
