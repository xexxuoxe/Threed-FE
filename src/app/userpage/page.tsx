/*
  title : mypage.page
  writer : 이은서
  src : http://localhost:3000/mypage
*/
import HeaderPageComponent from "@components/sementic/header/header.component.tsx";
import BookAndUserComponent from "@components/page/bookAndUser/bookAndUser.component";
import FooterPageComponent from "@components/sementic/footer/footer.component";

export default function MyPage() {
  return (
    <>
      <HeaderPageComponent />
      <BookAndUserComponent type="mypage" />
      <FooterPageComponent />
    </>
  )
}