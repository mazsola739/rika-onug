import styled from '@emotion/styled'

export const StyledLobbyy = styled.div`
  height: 100%;
  margin: auto;
  width: 100%;
  display: grid;
  gap: 20px;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
`
export const Selection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;`

export const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
`;

export const ButtonB = styled.button`
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const SelectedRoom = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
`;

export const RoomBackground = styled.div<{ img: string }>`
  width: 200px;
  height: 200px;
  background: ${({ img }) => `url(${img}) center center/cover no-repeat`};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin-top: 20px;
`;
