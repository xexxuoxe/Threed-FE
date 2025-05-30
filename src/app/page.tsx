/*
  title : home.page
  writer : 이은서
  src : http://localhost:3000/
*/
import HeaderPageComponent from "@components/sementic/header/header.component.tsx";
import HomeComponent from "@components/page/home/home.component";
import FooterPageComponent from "@components/sementic/footer/footer.component";

export default function Home() {

  return (
    <>
      <HeaderPageComponent />
      <HomeComponent type="company" />
      <FooterPageComponent />
    </>
  )
}