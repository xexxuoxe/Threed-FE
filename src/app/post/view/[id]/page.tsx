import HeaderPageComponent from "@components/sementic/header/header.component.tsx";
import ViewComponent from "@components/page/post/view/postView.component";
import FooterPageComponent from "@components/sementic/footer/footer.component";

export default function HomePage() {
  return (
    <>
      <HeaderPageComponent />
      <ViewComponent />
      <FooterPageComponent />
    </>
  )
}