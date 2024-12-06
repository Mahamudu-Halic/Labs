const formFieldValidation = (field: string, value: string) => {
  let errorMessage = "";

  switch (field) {
    case "name":
      if (!value.trim()) {
        errorMessage = "This field is required.";
      } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
        errorMessage = "Name can only contain letters and spaces.";
      }
      break;

    case "email":
      if (!value.trim()) {
        errorMessage = "This field is required.";
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())
      ) {
        errorMessage = "Invalid email address.";
      }
      break;

    case "phoneNumber":
      if (!value.trim()) {
        errorMessage = "This field is required.";
      } else if (
        !/^\+\d{1,3}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{3,}$/.test(value.trim())
      ) {
        errorMessage = "Invalid phone number format.";
      }
      break;

    case "addons":
      if (!value.trim()) {
        errorMessage = "Please select at least one add-on.";
      }
      break;

    default:
      break;
  }

  return errorMessage;
};

export default formFieldValidation;
