import HeaderPageComponent from "@components/sementic/m/header/header.component.tsx";
import WriteComponent from "@components/page/m/post/write/postWrite.component";
import FooterPageComponent from "@components/sementic/m/footer/footer.component";

export default function writePage() {
    return (
        <>
            <HeaderPageComponent />
            <WriteComponent />
            <FooterPageComponent />
        </>
    )
}
