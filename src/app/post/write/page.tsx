import HeaderPageComponent from "@components/sementic/header/header.component.tsx";
import WriteComponent from "@components/page/post/write/postWrite.component";
import FooterPageComponent from "@components/sementic/footer/footer.component";

export default function writePage() {
    return (
        <>
            <HeaderPageComponent />
            <WriteComponent />
            <FooterPageComponent />
        </>
    )
}
