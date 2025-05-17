import ModalWithForm from "./ModalWithForm.jsx";
// import { useNavigate } from "react-router-dom";

export default function LoginModal({
  isLoading,
  setLoading,
  onOpen,
  onClose,
  isOpen,
}) {
  // const navigate = useNavigate();
  const handleSubmit = (values) => {
    // const userData = {
    //   email: values["sign-in-email"],
    //   password: values["sign-in-password"],
    // };
    // setLoading(true);
    // return signIn(userData)
    //     .then((user) => {
    //         if (user.token) {
    //             setToken(user.token);
    //             return getCurrentUser(user.token);
    //         }
    //     })
    //     .then((user) => {
    //         setCurrentUser(user.data);
    //         setLoggedIn(true);
    //         navigate('/profile');
    //     });
  };

  return (
    <ModalWithForm
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
      name="sign-in"
      title="Sign in"
      buttonText={isLoading ? "Signing in" : "Sign in"}
      inputs={2}
      onSubmit={handleSubmit}
      setLoading={setLoading}
      redirectText={"Sign up"}
    >
      <label className="form__label">
        <span className="form__label-header">Email</span>
        <input
          type="email"
          className="form__input"
          name="sign-in-email"
          placeholder="Email"
          required
        />
        <span className="form__error" id="sign-in-email" />
      </label>
      <label className="form__label">
        <span className="form__label-header">Password</span>
        <input
          type="password"
          className="form__input"
          name="sign-in-password"
          placeholder="Password"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__error" id="sign-in-password" />
      </label>
    </ModalWithForm>
  );
}
