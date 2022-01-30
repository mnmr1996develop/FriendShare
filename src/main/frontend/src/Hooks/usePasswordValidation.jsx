import { useState, useEffect } from "react";

export const usePasswordValidation = ({
     password = "",
     requiredLength = 8
    }) => {
const [validLength, setValidLength] = useState(null);
const [hasNumber, setHasNumber] = useState(null);
const [upperCase, setUpperCase] = useState(null);
const [lowerCase, setLowerCase] = useState(null);
const [specialChar, setSpecialChar] = useState(null);


  
useEffect(() => {
  
    setValidLength(password.length >= 8 ? true : false);
    setUpperCase(password.toLowerCase() !== password);
    setLowerCase(password.toUpperCase() !== password);
    setHasNumber(/\d/.test(password));
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
      
    }, [password]);

return [validLength, hasNumber, upperCase, lowerCase, specialChar];}