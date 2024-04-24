import { useParams } from "react-router-dom";

import WritePageHeader from "./WritePageHeader";
import WritePageItems from "./WritePageItems";
import WritePageDesc from "./WritePageDesc";
import WritePageFooter from "./WritePageFooter";
import AlertModal from "../../components/Modal/AlertModal";

import { useModalStore } from "../../store/modalStore/modalStore.ts";

import { WritePageContainer, WritePageContent } from "./WritePage.styles.ts";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const WritePage = () => {
  const { imageAlertModal, imgDupliAlertModal, titleAlertModal } =
    useModalStore();
  const { id } = useParams();
  const { isLoading, data, isError } = useQuery({
    queryKey: ["fetch-post"],
    queryFn: () => {
      return axios.get(`edit/${id}`);
    },
    select: (data) => data.data[0],
  });
  if (isLoading) return <>Loading...</>;
  if (isError) return <>데이터를 불러오는데 실패하였습니다.</>;

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
        {titleAlertModal && (
          <AlertModal type={"titleAlert"}>제목을 입력해 주세요.</AlertModal>
        )}
        <WritePageHeader
          title={data ? "일지 수정하기" : "일지 작성하기"}
          data={data}
        />
        <WritePageItems data={data} />
        <WritePageDesc data={data} />
        <WritePageFooter data={data} />
      </WritePageContent>
    </WritePageContainer>
  );
};

export default WritePage;
