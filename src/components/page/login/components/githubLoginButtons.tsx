import Image from "next/image";
import styles from "./loginButtons.module.scss";

export default function GithubLoginButtons() {
  const link = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_API}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button
      className={`${styles.login_btn} ${styles.github_btn}`}
      onClick={loginHandler}
    >
      <Image
        width={30}
        height={30}
        src="/images/ico_github.png"
        alt="Google 로그인"
      />
      <span className={styles.login_text}>Github로 로그인</span>
    </button>
  );
}