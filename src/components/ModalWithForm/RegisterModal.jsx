import ModalWithForm from "./ModalWithForm.jsx";
import { signUp } from "../../utils/auth.js";

export default function RegisterModal({
  isLoading,
  setLoading,
  onOpen,
  onClose,
  isOpen,
}) {
  const handleSubmit = (values) => {
    const userData = {
      email: values["sign-up-email"],
      password: values["sign-up-password"],
      username: values["sign-up-username"],
    };
    setLoading(true);
    return signUp(userData).catch((err) => {
      throw err;
    });
  };

  return (
    <ModalWithForm
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
      name="sign-up"
      title="Sign up"
      buttonText={isLoading ? "Signing up" : "Sign up"}
      inputs={2}
      onSubmit={handleSubmit}
      setLoading={setLoading}
      redirectText={"Sign in"}
    >
      <label className="form__label">
        <span className="form__label-header">Email</span>
        <input
          type="email"
          className="form__input"
          name="sign-up-email"
          placeholder="Email"
          required
        />
        <span className="form__error" id="sign-up-email" />
      </label>
      <label className="form__label">
        <span className="form__label-header">Password</span>
        <input
          type="password"
          className="form__input"
          name="sign-up-password"
          placeholder="Password"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__error" id="sign-up-password" />
      </label>
      <label className="form__label">
        <span className="form__label-header">Username</span>
        <input
          type="text"
          className="form__input"
          name="sign-up-username"
          placeholder="Username"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__error" id="sign-up-username" />
      </label>
    </ModalWithForm>
  );
}
