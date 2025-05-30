import HeaderPageComponent from "@components/sementic/m/header/header.component.tsx";
import ViewComponent from "@components/page/m/post/view/postView.component";
import FooterPageComponent from "@components/sementic/m/footer/footer.component";

export default function HomePage() {
  return (
    <>
      <HeaderPageComponent />
      <ViewComponent />
      <FooterPageComponent />
    </>
  )
}