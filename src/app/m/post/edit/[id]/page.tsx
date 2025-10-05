import HeaderPageComponent from "@components/sementic/m/header/header.component.tsx";
import EditComponent from "@components/page/m/post/write/postEdit.component";
import FooterPageComponent from "@components/sementic/m/footer/footer.component";

export default function editPage() {
    return (
        <>
            <HeaderPageComponent />
            <EditComponent />
            <FooterPageComponent />
        </>
    )
}
