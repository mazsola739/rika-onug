import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'
import {
  Button,
  ButtonsContainer,
  PositionContainer,
  FormContainer,
  InputContainer,
  Input,
  Label,
  LeftSide,
  ResponseContainer,
  ResponsePre,
  RightSide,
  StyledStub,
  PopulatorContainer,
  StubTitle,
  RoleName,
  InputField,
} from './Stub.styles'
import { dealStubDoppelganger } from './TestCases/test-case-doppelganger-01'
import {
  labels,
  roleMapping,
  DEAL_POPULATOR,
  POPULATE,
  RESET,
  TEST_CASE,
  RESPONSE,
} from './Stub.constants'

// TODO security, protected routing and sending a secure GOD token

export const Stub: React.FC = observer(() => {
  const [inputValues, setInputValues] = useState<number[]>(
    Array(labels.length).fill(0)
  )
  const [response, setResponse] = useState({
    serverResponse: 'will be populated here',
  })
  const [dealStub, setDealStub] = useState<Record<string, number>>({})

  const handleInputChange = useCallback(
    (index: number, value: number) => {
      setInputValues((prevState) => {
        const newState = [...prevState]
        newState[index] = value
        return newState
      })
      const newDealStub = { ...dealStub }
      newDealStub[labels[index]] = value < 1 || value > 86 ? null : value
      setDealStub(newDealStub)
    },
    [dealStub, setDealStub]
  )

  const getRoleName = useCallback((id: number): string => {
    return roleMapping[id] || 'Unknown'
  }, [])

  const populateStub = useCallback(async () => {
    const res = await fetch('/stub/populate/deal', {
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
    const res = await fetch('/stub/populate/deal', {
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
    setDealStub(dealStubDoppelganger)
    const res = await fetch('/stub/populate/deal', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dealStubDoppelganger),
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
              {labels.map((label, index) => (
                <PositionContainer key={index}>
                  <Input>
                    <Label htmlFor={label}>{label}</Label>
                    <InputField
                      type="number"
                      id={label}
                      name={label}
                      value={inputValues[index]}
                      onChange={(e) =>
                        handleInputChange(index, parseInt(e.target.value))
                      }
                    />
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
        </ResponseContainer>
      </RightSide>
    </StyledStub>
  )
})
