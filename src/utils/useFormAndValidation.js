import { useState, useCallback } from "react";

export function useFormAndValidation({
  onSubmit,
  onClose,
  setLoading,
  isOpen,
  onOpen,
}) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [backendError, setBackendError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBackendError("");

    onSubmit(values)
      .then(() => {
        onClose();
        resetForm();
        if (isOpen === "register") {
          onOpen("successfully-registration");
        }
      })
      .catch((err) => {
        let message = "Something went wrong";

        if (err.includes(400)) {
          message = "Invalid input. Please check your entries.";
        } else if (err.includes(401)) {
          message = "Incorrect email or password.";
        } else if (err.includes(409)) {
          message = "An account with this email already exists.";
        } else if (err?.response?.data?.message) {
          message = err.response.data.message;
        }

        setBackendError(message);
      })
      .finally(() => setLoading(false));
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    setValues,
    setIsValid,
    backendError,
  };
}
