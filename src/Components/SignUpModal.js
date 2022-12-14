import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "../firebase";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type } from "@testing-library/user-event/dist/type";

export const SignUpModal = ({ setModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password confirm") {
      setPasswordConfirm(value);
    }
  };
  console.log(password);
  console.log(passwordConfirm);
  const SignUp = async (e) => {
    e.preventDefault();
    let data;
    let passwordValid =
      /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;
    if (password === passwordConfirm) {
      if (passwordValid.test(password)) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        alert("회원가입에 성공하였습니다!");
        setModal(false);
      } else {
        alert("8~20자 영문 대소문자, 숫자, 특수문자를 사용하세요.");
      }
    } else {
      alert("비밀번호를 확인해주세요.");
    }
    console.log(data);
  };

  return (
    <div className="w-72 h-60 fixed bg-white flex flex-col justify-center">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute top-[5px] left-[270px] hover:cursor-pointer"
        onClick={() => setModal(false)}
      />
      <form onSubmit={SignUp} className="flex flex-col m-2 p-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="my-1 h-10 outline-none px-2 border"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
          className="my-1 h-10 outline-none px-2 border"
        />
        <input
          type="password"
          name="password confirm"
          placeholder="password confirm"
          required
          value={passwordConfirm}
          onChange={onChange}
          className="my-1 h-10 outline-none px-2 border"
        />
        {password !== passwordConfirm ? (
          <p className="text-[11px] text-[red] absolute top-[162px]">
            비밀번호가 일치하지 않습니다
          </p>
        ) : (
          <></>
        )}
        <input
          type="submit"
          value="Sign Up"
          className="bg-[#161F50] text-white rounded-md h-8  shadow-sm hover:cursor-pointer mt-6"
        />
      </form>
    </div>
  );
};
