export const handleMobileChange = (e, setUser, setErrorMobile) => {
  const enteredMobile = e.target.value;
  const phonePattern = /^\d{10}$/; // Change this regex according to your desired phone number format

  if (!phonePattern.test(enteredMobile)) {
    setErrorMobile("Invalid phone number. Please enter a 10-digit number.");
    setUser((prevUser) => ({
      ...prevUser,
      mobile: enteredMobile,
    }));
  } else {
    setErrorMobile("");
    setUser((prevUser) => ({
      ...prevUser,
      mobile: enteredMobile,
    }));
  }
};

export const handleEmailChange = (e, setUser, setErrorEmail) => {
  const enteredEmail = e.target.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(enteredEmail)) {
    setErrorEmail("Invalid email address. Please enter a valid email.");
    setUser((prevUser) => ({
      ...prevUser,
      email: enteredEmail,
    }));
  } else {
    setErrorEmail("");
    setUser((prevUser) => ({
      ...prevUser,
      email: enteredEmail,
    }));
  }
};

export const handleAgeChange = (e, setUser, setErrorAge) => {
  const enteredAge = parseInt(e.target.value);

  if (isNaN(enteredAge) || enteredAge < 1 || enteredAge > 120) {
    setErrorAge("Age must be between 1 and 120");
    setUser((prevUser) => ({
      ...prevUser,
      age: enteredAge,
    }));
  } else {
    setErrorAge("");
    setUser((prevUser) => ({
      ...prevUser,
      age: enteredAge,
    }));
  }
};

// for login

export const handleLoginRegisterEmailChange = (e, setEmail, setEmailError) => {
  const enteredEmail = e.target.value;
  setEmail(enteredEmail);

  if (!enteredEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
    setEmailError("Please enter a valid email address");
  } else {
    setEmailError("");
  }
};

export const handleLoginRegisterPasswordChange = (
  e,
  setPassword,
  setPasswordError
) => {
  const enteredPassword = e.target.value;
  setPassword(enteredPassword);

  if (!enteredPassword || enteredPassword.length < 10) {
    setPasswordError("Password must be at least 10 characters");
  } else {
    setPasswordError("");
  }
};
