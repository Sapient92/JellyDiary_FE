import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import styled from 'styled-components';
import api from '../../../../api';
import fakeImg from '../../../../assets/images/UserAvatar.png';
import { toast, ToastContainer } from 'react-toastify';
// 모달 스타일링
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 91%;
  vertical-align: middle;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchResult = styled.div`
  height: 250px;
  max-height: 300px;
  width: 96%;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
`;

const ResultItem = styled.div`
  padding: 5px;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  gap: 0.5em;
  div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  img {
    height: 40px;
    border-radius: 50%;
  }
  &:hover {
    background-color: #f0f0f0;
  }
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Modal = ({ id, isOpen, onClose }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await api.get(`/api/diary/user/${id}/search`, {
          params: { searchWord: value },
        });
        setResults(response.data.data); // 서버에서 반환된 데이터 형식에 따라 조정 필요
        console.log(response.data.data);
      } catch (error) {
        console.error('참여자 검색 실패:', error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (participant: any) => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const inviteUser = async (participant: any) => {
    try {
      const response = await api.post('/api/diary/user', {
        diaryId: id,
        userId: participant?.userId,
      });

      if (response.data.statusCode === 201) {
        console.log('다이어리 유저 생성 완료:', response.data.message);
        toast(response.data.message);
      } else {
        console.error('다이어리 유저 생성 실패:', response.data);
      }
    } catch (error: any) {
      toast(error?.response?.data.data);
    }
  };

  const handleInviteClick = async (participant: any) => {
    try {
      const response = await api.get(`/api/feed/userInfo/${participant.userId}`);
      const userRole = response.data.role; // Assuming the API response contains the user's role

      // Invite user based on their role
      if (userRole === 'READ') {
        console.log(userRole);
        toast('이미 초대된 사용자입니다.');
      } else {
        // Proceed with inviting the user
        inviteUser(participant);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      toast('사용자 정보를 가져오는 동안 오류가 발생했습니다.');
    }
  };
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>참여자 검색</h2>
        <div>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="참여자 이름을 입력하세요"
          />
          <LuSearch size={20} />
        </div>
        <SearchResult>
          {results
            .filter(
              (participant: any) =>
                participant.isInvited === null || participant.isInvited === false,
            )
            .map((participant: any) => (
              <ResultItem key={participant.userId} onClick={() => handleResultClick(participant)}>
                <div>
                  <img src={participant.profileImg || fakeImg} alt={participant.userId} />
                  {participant.userName}
                  {participant.isInvited}
                </div>
                <button
                  onClick={() => handleInviteClick(participant)}
                  disabled={false}
                  style={{ background: participant.isInvited === false ? 'gray' : 'blue' }}
                >
                  {participant.isInvited ? '초대 완료' : '초대하기'}
                </button>
              </ResultItem>
            ))}
        </SearchResult>
      </ModalContent>
      <ToastContainer />
    </ModalBackground>
  );
};

export default Modal;
