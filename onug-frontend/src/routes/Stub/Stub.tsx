import { API_HOST, RESET } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'
import { DEAL_POPULATOR, LABELS, POPULATE, RESPONSE, ROLEMAPPING, TEST_CASE } from './Stub.constants'
import { Button, ButtonsContainer, FormContainer, Input, InputContainer, InputField, Label, LeftSide, PopulatorContainer, PositionContainer, ResponseContainer, ResponsePre, RightSide, RoleName, StubTitle, StyledStub } from './Stub.styles'
import { testCase } from './TestCases/testCase'

// TODO security, protected routing and sending a secure GOD token
export const Stub: React.FC = observer(() => {
  const [inputValues, setInputValues] = useState<number[]>(
    Array(LABELS.length).fill(0)
  )
  const [response, setResponse] = useState({
    serverResponse: 'will be populated here',
  })
  const [dealStub, setDealStub] = useState<Record<string, number>>({})

  const handleInputChange = useCallback(
    (index: number, value: number) => {
      if (value < 0 || value > 86) return

      setInputValues((prevState) => {
        const newState = [...prevState]
        newState[index] = value
        return newState
      })
      const newDealStub = { ...dealStub }
      newDealStub[LABELS[index]] = value === 0 ? null : value
      setDealStub(newDealStub)
    },
    [dealStub, setDealStub]
  )

  const getRoleName = useCallback((id: number): string => {
    return ROLEMAPPING[id] || 'Unknown'
  }, [])

  const populateStub = useCallback(async () => {
    const res = await fetch(`${API_HOST}/stub/populate/deal`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dealStub),
    })
    const json = await res.json()
    setResponse(json)
  }, [dealStub])

  const resetStub = useCallback(async () => {
    setDealStub({})
    setInputValues(Array(LABELS.length).fill(0))
    const res = await fetch(`${API_HOST}/stub/populate/deal`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reset: true }),
    })
    const json = await res.json()
    setResponse(json)
  }, [dealStub])

  const useTestCase = useCallback(async () => {
    setDealStub(testCase)
    setInputValues(
      LABELS.map((label) =>
        Object.keys(testCase).find(
          (testCaseLabel) => testCaseLabel === label
        )
          ? testCase[label]
          : 0
      )
    )
    const res = await fetch(`${API_HOST}/stub/populate/deal`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCase),
    })
    const json = await res.json()
    setResponse(json)
  }, [setDealStub])

  return (
    <StyledStub>
      <LeftSide>
        <StubTitle>{DEAL_POPULATOR}</StubTitle>
        <PopulatorContainer>
          <FormContainer>
            <InputContainer>
              {LABELS.map((label, index) => (
                <PositionContainer key={index}>
                  <Input>
                    <Label htmlFor={label}>{label}</Label>
                    <InputField type="text" inputMode="numeric" id={label} name={label} value={inputValues[index]} onChange={(e) => handleInputChange(index, parseInt(e.target.value) || 0)} />
                  </Input>
                  <RoleName>{getRoleName(dealStub[label])}</RoleName>
                </PositionContainer>
              ))}
            </InputContainer>
          </FormContainer>
          <ButtonsContainer>
            <Button onClick={populateStub}>{POPULATE}</Button>
            <Button onClick={resetStub}>{RESET}</Button>
            <Button onClick={useTestCase}>{TEST_CASE}</Button>
          </ButtonsContainer>
        </PopulatorContainer>
      </LeftSide>
      <RightSide>
        <StubTitle>{RESPONSE}</StubTitle>
        <ResponseContainer>
          <ResponsePre>{`${JSON.stringify(response, null, 4)}`}</ResponsePre>
          <br />
          <ResponsePre>{`${JSON.stringify(ROLEMAPPING, null, 4)}`}</ResponsePre>
        </ResponseContainer>
      </RightSide>
    </StyledStub>
  )
})
