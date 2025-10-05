import HeaderPageComponent from "@components/sementic/header/header.component.tsx";
import EditComponent from "@components/page/post/write/postEdit.component";
import FooterPageComponent from "@components/sementic/footer/footer.component";

export default function editPage() {
    return (
        <>
            <HeaderPageComponent />
            <EditComponent />
            <FooterPageComponent />
        </>
    )
}
