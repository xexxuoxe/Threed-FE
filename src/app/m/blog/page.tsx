/*
  title : member main page
  writer : 이은서
  src : http://localhost:3000/
*/
import HeaderPageComponent from "@components/sementic/m/header/header.component.tsx";
import HomeComponent from "@components/page/m/home/home.component";
import FooterPageComponent from "@components/sementic/m/footer/footer.component";

export default function Home() {

    return (
        <>
            <HeaderPageComponent />
            <HomeComponent type="member" />
            <FooterPageComponent />
        </>
    )
}