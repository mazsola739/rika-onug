import styled from '@emotion/styled'

export const StubContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  width: 90%;
  max-height: 90%;
  font-family: 'Roboto', sans-serif;
`

export const Container = styled.div`
  flex: 1;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

export const StubTitle = styled.h3`
  color: white;
  margin-bottom: 20px;
  font-size: 1.4rem;
`

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
  min-width: 100%;
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`

export const ButtonsWrapper = styled.div`
 display: flex;
  flex-direction: column;
  gap: 5px;
`

export const Grid = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-start;
  min-width: 100%;
`

export const Label = styled.label`
  color: white;
  font-size: 0.9rem;
  min-width: 90px;
`

export const InputField = styled.input`
  width: 50px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #fff;
  font-size: 1rem;
`

export const Button = styled.button`
  padding: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #fff;
  background-color: black;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: grey;
  }

  &:disabled {
    background-color: transparent;
  }
`

export const RoleDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  font-size: 14px;
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  overflow-y: auto;
  max-height: 250px;
`
