import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { LuFileSearch, LuSearch } from 'react-icons/lu';
import styled from 'styled-components';
import api from '../../../../api';

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
`;

const Modal = ({ id, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isInvited, setIsInvited] = useState(false);

  const handleSearch = async (e) => {
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

  const handleResultClick = (participant) => {
    console.log(`참여자 추가: ${participant.name}`);
    // 여기에 참여자 추가 로직을 추가합니다.
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const inviteUser = async (participant) => {
    try {
      const response = await api.post('/api/diary/user', {
        diaryId: id,
        userId: participant?.userId,
      });

      if (response.status === 201) {
        console.log('다이어리 유저 생성 완료:', response.data);
        setIsInvited(true); // 초대 완료 상태로 업데이트
      } else {
        console.error('다이어리 유저 생성 실패:', response.status);
      }
    } catch (error) {
      console.error('서버와의 통신 중 오류 발생:', error);
    }
  };

  const handleInviteClick = (participant) => {
    inviteUser(participant);
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
          {results.map((participant) => (
            <ResultItem key={participant.userId} onClick={() => handleResultClick(participant)}>
              <div>
                <img src={participant.profileImg} alt={participant.userId} />
                {participant.userName}
                {participant.isInvited}
              </div>
              <button
                onClick={() => handleInviteClick(participant)}
                disabled={participant.isInvited}
              >
                {participant.isInvited ? '초대 완료' : '초대하기'}
              </button>
            </ResultItem>
          ))}
        </SearchResult>
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
