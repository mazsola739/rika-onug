import { observer } from 'mobx-react-lite'
import { DEAL_POPULATOR, LABELS, POPULATE, RESET, RESPONSE, ROLEMAPPING, TEST_CASE } from './Stub.constants'
import { Button, ButtonsWrapper, Container, FormContainer, Grid, InputField, InputsWrapper, Label, RoleDisplay, StubContainer, StubTitle } from './Stub.styles'
import { useStub } from './useStub'
import { useCallback } from 'react'

export const Stub: React.FC = observer(() => {
  const { inputValues, response, handleInputChange, populateStub, resetStub, useTestCase } = useStub()
  const getRoleName = (value: number) => ROLEMAPPING[value] || 'Unknown'

  return (
    <StubContainer>
      <Container>
        <StubTitle>{DEAL_POPULATOR}</StubTitle>
        <FormContainer>
          <InputsWrapper>
            {LABELS.map((label, index) => (
              <Grid key={index}>
                <Label htmlFor={label}>{label}</Label>
                <InputField type="text" inputMode="numeric" id={label} name={label} value={inputValues[index]} onChange={(e) => handleInputChange(index, parseInt(e.target.value) || 0)} />
                <small style={{ marginLeft: '8px', color: '#888' }}>
                  {getRoleName(inputValues[index])}
                </small>
              </Grid>
            ))}
          </InputsWrapper>
          <ButtonsWrapper>
            <Button onClick={populateStub}>{POPULATE}</Button>
            <Button onClick={resetStub}>{RESET}</Button>
            <Button onClick={useTestCase}>{TEST_CASE}</Button>
          </ButtonsWrapper>
        </FormContainer>
      </Container>

      <Container>
        <StubTitle>{RESPONSE}</StubTitle>
        <RoleDisplay>
          {Object.entries(ROLEMAPPING).map(([id, name]) => (
            <span key={id}>
              {id}: {name}
            </span>
          ))}
        </RoleDisplay>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </Container>
    </StubContainer>
  )
})
