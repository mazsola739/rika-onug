import { observer } from 'mobx-react-lite'
import { labels, role_map } from './Stub.constants'
import { Button, ButtonsWrapper, Container, FormContainer, Grid, InputField, InputsWrapper, Label, PreDisplay, RoleDisplay, StubContainer, StubTitle } from './Stub.styles'
import { useStub } from './useStub'

export const Stub: React.FC = observer(() => {
  const { inputValues, response, handleInputChange, populateStub, resetStub, useTestCase } = useStub()
  const getRoleName = (value: number) => role_map[value] || 'Unknown'

  return (
    <StubContainer>
      <Container>
        <StubTitle>Deal populator</StubTitle>
        <FormContainer>
          <InputsWrapper>
            {labels.map((label, index) => (
              <Grid key={index}>
                <Label htmlFor={label}>{label}</Label>
                <InputField
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  id={label}
                  name={label}
                  value={inputValues[index]}
                  onChange={e => {
                    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10)
                    handleInputChange(index, value)
                  }}
                />

                <small style={{ marginLeft: '8px', color: '#888' }}>{getRoleName(inputValues[index])}</small>
              </Grid>
            ))}
          </InputsWrapper>
          <ButtonsWrapper>
            <Button onClick={populateStub}>populate</Button>
            <Button onClick={resetStub}>reset</Button>
            <Button onClick={useTestCase}>test case</Button>
            {/* TODO another test case button, hook, and file <Button onClick={useTestCase}>{TEST_CASE}</Button> */}
          </ButtonsWrapper>
        </FormContainer>
      </Container>

      <Container>
        <StubTitle>Response</StubTitle>
        <RoleDisplay>
          {Object.entries(role_map).map(([id, name]) => (
            <span key={id}>
              {id}: {name}
            </span>
          ))}
        </RoleDisplay>
        <PreDisplay>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </PreDisplay>
      </Container>
    </StubContainer>
  )
})
