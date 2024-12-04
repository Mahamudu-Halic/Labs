const personalInfoValidation = (userName: string, email: string, phoneNumber: string) => {
    const isValidName = /^[a-zA-Z\s'-]+$/.test(userName);
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      const isValidPhoneNumber = /^\+\d{1,3}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{3,}$/.test(phoneNumber);

      let isValid = true;
      let userError = "";
      let emailError = "";
      let phoneError = "";

      if (!userName.trim()) {
        userError = "This field is required";
        isValid = false;
      } else if (!isValidName) {
        userError = "Invalid name";
        isValid = false;
      } else {
        userError = ""; 
      }

      if (!email.trim()) {
        emailError = "This field is required";
        isValid = false;
      } else if (!isValidEmail) {
        emailError = "Invalid email address";
        isValid = false;
      } else {
        emailError = ""; 
      }
      
      // Validate phoneNumber
      if (!phoneNumber.trim()) {
        phoneError = "This field is required";
        isValid = false;
      } else if (!isValidPhoneNumber) {
        phoneError = "Invalid phone number";
        isValid = false;
      } else {
        phoneError = ""; 
      }
      
      return { isValid, userError, emailError, phoneError };
  };

  export default personalInfoValidation;