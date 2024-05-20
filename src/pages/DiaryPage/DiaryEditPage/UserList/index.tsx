const UserList = ({ diaryUserList, onRoleChange, onEdit, onDelete }: any) => {
  const handleRoleChange = (diaryUserId: any, newRole: any) => {
    onRoleChange(diaryUserId, newRole);
  };

  return (
    <div>
      {diaryUserList?.map((user: any, index: any) => (
        <div key={index}>
          <span>
            {user.diaryUserId} {user.diaryRole}
          </span>
          {user.diaryRole !== 'CREATOR' && (
            <>
              <select
                value={user.diaryRole}
                onChange={(e) => handleRoleChange(user.diaryUserId, e.target.value)}
              >
                <option value="READ">읽기</option>
                <option value="WRITE">읽기 쓰기</option>
              </select>
              <button onClick={() => onEdit(user.diaryUserId)}>수정</button>
              <button onClick={() => onDelete(user.diaryUserId)}>삭제</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
