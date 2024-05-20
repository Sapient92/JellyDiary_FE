import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import CustomButton from '../../../components/CustomButton';
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  TextArea,
} from './DiaryWritePage.styles';
import imgSrc from '../../../assets/testImage/suggestedPostImage.png';

const CreateDiaryModal = ({ isOpen, onClose, onSubmit }: any) => {
  const [diaryName, setDiaryName] = useState('');
  const [diaryDescription, setDiaryDescription] = useState('');
  const [diaryProfileImage, setDiaryProfileImage] = useState(null);
  const defaultImage = imgSrc;

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setDiaryProfileImage(file);
  };

  const handleSubmit = () => {
    const diaryData = {
      diaryName,
      diaryDescription,
      diaryProfileImage: diaryProfileImage || defaultImage,
    };
    onSubmit(diaryData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <h2>Create New Diary</h2>
          <MdClose onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Diary Name"
            value={diaryName}
            onChange={(e) => setDiaryName(e.target.value)}
          />
          <TextArea
            placeholder="Diary Description"
            value={diaryDescription}
            onChange={(e) => setDiaryDescription(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </ModalBody>
        <ModalFooter>
          <CustomButton
            text="생성하기"
            backgroundColor="blue"
            onClick={handleSubmit}
            disabled={false}
          />
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

export default CreateDiaryModal;
