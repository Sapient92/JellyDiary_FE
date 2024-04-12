import { WritePageContainer, WritePageContent } from "./WritePage.styles.ts";
import WritePageHeader from "./WritePageHeader/WritePageHeader.tsx";
import WritePageItems from "./WritePageItems/WritePageItems.tsx";
import WritePageDesc from "./WritePageDesc/WritePageDesc.tsx";
import WritePageFooter from "./WritePageFooter/WritePageFooter.tsx";
import AlertModal from "../../components/Modal/AlertModal/AlertModal.tsx";
import { useModalStore } from "../../store/modalStore/modalStore.ts";

const WritePage = () => {
  const { imageAlertModal, imgDupliAlertModal } = useModalStore();

  return (
    <WritePageContainer>
      <WritePageContent>
        {imageAlertModal && (
          <AlertModal type={"imageAlert"}>
            이미지는 최대 5개까지 업로드 할 수 있습니다.
          </AlertModal>
        )}
        {imgDupliAlertModal && (
          <AlertModal type={"duplication"}>
            이미 업로드한 이미지 입니다.
          </AlertModal>
        )}
        <WritePageHeader title={"일지 작성하기"} />
        <WritePageItems />
        <WritePageDesc />
        <WritePageFooter />
      </WritePageContent>
    </WritePageContainer>
  );
};

export default WritePage;
