/*
  title : bookmark.page
  writer : 이은서
  src : http://localhost:3000/bookmark
*/
import HeaderPageComponent from "@components/sementic/header/header.component.tsx";
import BookAndUserComponent from "@components/page/bookAndUser/bookAndUser.component";
import FooterPageComponent from "@components/sementic/footer/footer.component";

export default function BookMarkPage() {
  return (
    <>
      <HeaderPageComponent />
      <BookAndUserComponent type="bookmark" />
      <FooterPageComponent />
    </>
  )
}
