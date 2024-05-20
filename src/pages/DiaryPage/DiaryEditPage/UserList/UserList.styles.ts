import styled from 'styled-components';

export const UserListContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const UserItem = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: left;
  &:last-child {
    border-bottom: none;
  }
  img {
    height: 20px;
  }
`;

export const UserInfo = styled.span`
  flex: 1;
  font-size: 16px;
  color: #333;
  b {
    font-weight: 600;
    margin-right: 8px;
  }
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Select = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:last-child {
    background-color: #dc3545;
    &:hover {
      background-color: #c82333;
    }
  }
`;
