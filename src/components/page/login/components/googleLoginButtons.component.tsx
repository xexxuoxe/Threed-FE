import Image from "next/image";
import styles from "./loginButtons.module.scss";

export default function GoogleLoginButtons() {
  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_API}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&prompt=consent`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button
      className={`${styles.login_btn} ${styles.google_btn}`}
      onClick={loginHandler}
    >
      <Image
        width={30}
        height={30}
        src="/images/ico_google.png"
        alt="Google 로그인"
      />
      <span className={styles.login_text}>Google로 로그인</span>
    </button>
  );
}
