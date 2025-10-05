import Image from "next/image";
import styles from "./loginButtons.module.scss";

export default function GoogleLoginButtons() {
  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_API}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGL_REDIRECT_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button
      className={`${styles.login_btn} ${styles.google_btn}`}
      onClick={loginHandler}
    >
      <i>
        <Image
          fill={true}
          src="/images/ico_google.png"
          alt="Google 로그인"
        />
      </i>
      <span className={styles.login_text}>Google로 로그인</span>
    </button>
  );
}
