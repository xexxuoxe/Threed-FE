/*
  title : bookmark.page
  writer : 이은서
  src : http://localhost:3000/bookmark
*/
import HeaderPageComponent from "@components/sementic/m/header/header.component.tsx";
import BookAndUserComponent from "@components/page/m/bookAndUser/bookAndUser.component";
import FooterPageComponent from "@components/sementic/m/footer/footer.component";

export default function BookMarkPage() {
  return (
    <>
      <HeaderPageComponent />
      <BookAndUserComponent type="bookmark" />
      <FooterPageComponent />
    </>
  )
}
