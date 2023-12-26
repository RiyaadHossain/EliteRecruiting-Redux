import { useState } from "react";
import signUpImg from "../../assets/signup-fig.png";
import Modal from "../modal/Modal";
import FormInput from "../form/FormInput";
import { ENUM_USER_ROLE } from "../../enums/userRole";
import { ENUM_AUTH_MODAL } from "../../enums/authModal";
import "./styles/module.style.css";
import FormInputIcon from "../form/FormInputIcon";
import { IoLockClosed, IoMail } from "react-icons/io5";
import Form from "../form/Form";

export default function SignUpModal({ openAuthModal, setOpenAuthModal }) {
  const [role, setRole] = useState(ENUM_USER_ROLE.candidate);

  const onSignInHandle = () => setOpenAuthModal(ENUM_AUTH_MODAL.SIGN_IN);
  const onModalClose = () => {
    document.body.classList.toggle("overflow-y-hidden");
    setOpenAuthModal(null);
  };

  const onSubmit = async (data) => {
    try {
      // Set the role from the `role` state
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      openModal={openAuthModal === ENUM_AUTH_MODAL.SIGN_UP}
      toggleModal={onModalClose}
    >
      <div className="">
        <img src={signUpImg} alt="" className="modal_img" />
      </div>
      <h5 className="modal_title">Create an account</h5>

      <div className="flex mt-5">
        <div
          onClick={() => setRole(ENUM_USER_ROLE.candidate)}
          className={`${
            role === ENUM_USER_ROLE.candidate
              ? "radio_role_active"
              : "radio_role"
          } rounded-l-3xl`}
        >
          I'm candidate
        </div>
        <div
          onClick={() => setRole(ENUM_USER_ROLE.company)}
          className={`${
            role === ENUM_USER_ROLE.company ? "radio_role_active" : "radio_role"
          }  rounded-r-3xl`}
        >
          I'm company
        </div>
      </div>

      <Form submitHandler={onSubmit} className="w-full mt-6">
        {role === ENUM_USER_ROLE.company ? (
          <FormInput
            id="companyName"
            name="companyName"
            placeholder="Company Name"
            type="text"
          />
        ) : (
          <div className="flex gap-3">
            <FormInput
              id="firstName"
              name="firstName"
              placeholder="First Name"
              type="text"
              divClass="flex-grow w-1/2"
            />
            <FormInput
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              type="text"
              divClass="flex-grow w-1/2"
            />
          </div>
        )}
        <FormInputIcon
          id="email_sign_up"
          name="email"
          placeholder="Email"
          type="email"
          icon={<IoMail className="input_icon" size={18} />}
        />
        <FormInputIcon
          id="password_sign_up"
          name="password"
          placeholder="Password"
          type="password"
          icon={<IoLockClosed className="input_icon" size={18} />}
        />
        <button type="submit" className="btn_secondary w-full">
          Continue
        </button>
        <div className="text-center">
          <div className="mt-6 text-sm font-light">
            Already Have an account?{" "}
            <span
              onClick={onSignInHandle}
              className="text-primary cursor-pointer"
            >
              Sign In
            </span>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
