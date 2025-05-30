import Image from "next/image";
import styles from "./loginButtons.module.scss";

export default function KakaoLoginButtons() {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button
      className={`${styles.login_btn} ${styles.kakao_btn}`}
      onClick={loginHandler}
    >
      <Image
        width={30}
        height={30}
        src="/images/ico_kakao.png"
        alt="Kakao 로그인"
      />
      <span className={styles.login_text}>Kakao로 로그인</span>
    </button>
  );
}
