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
} from './Stub.styles'
import { Icon } from 'components'
import { dealStubDoppelganger } from './TestCases/test-case-doppelganger-01'

const DEAL_POPULATOR = 'Deal populator'
const POPULATE = 'populate'
const RESET = 'reset'
const TEST_CASE = 'test case'
const RESPONSE = 'Response'
const labels = [
  'P1',
  'P2',
  'P3',
  'P4',
  'P5',
  'P6',
  'P7',
  'P8',
  'P9',
  'P10',
  'P11',
  'P12',
  'newWolfCard',
  'newVillainCard',
  'middleCard',
  'rightCard',
  'leftCard',
]
// TODO security, protected routing and sending a secure GOD token
export type DealStubType = {
  [key: string]: number
}

export const Stub: React.FC = observer(() => {
  const [response, setResponse] = useState({
    serverResponse: 'will be populated here',
  })
  const [dealStub, setDealStub] = useState<DealStubType>({})

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

  const updateDealStub = useCallback(
    (position: string, id: number) => {
      const newDealStub = { ...dealStub }
      newDealStub[position] = id
      setDealStub(newDealStub)
    },
    [dealStub, setDealStub]
  )

  return (
    <StyledStub>
      <LeftSide>
        <StubTitle>
          <Icon iconName="shield" size={25} /> {DEAL_POPULATOR}
        </StubTitle>
        <PopulatorContainer>
          <FormContainer>
            <InputContainer>
              {labels.map((label, index) => (
                <PositionContainer key={index}>
                  <Label htmlFor={label}>{label}</Label>
                  <Input
                    type="number"
                    id={label}
                    name={label}
                    onChange={(e) =>
                      updateDealStub(label, e.target.valueAsNumber)
                    }
                  />
                </PositionContainer>
              ))}
            </InputContainer>
          </FormContainer>
        </PopulatorContainer>
        <ButtonsContainer>
          <Button onClick={populateStub}>
            <Icon iconName="alien" size={25} /> {POPULATE}
          </Button>
          <Button onClick={resetStub}>
            <Icon iconName="alien" size={25} /> {RESET}
          </Button>{' '}
          <Button onClick={useTestCase}>
            <Icon iconName="alien" size={25} /> {TEST_CASE}
          </Button>{' '}
        </ButtonsContainer>{' '}
      </LeftSide>
      <RightSide>
        <StubTitle>
          <Icon iconName="interaction" size={25} /> {RESPONSE}{' '}
          <Icon iconName="blind" size={25} />
          <Icon iconName="claw" size={25} />
          <Icon iconName="eye" size={25} />
          <Icon iconName="mute" size={25} />
          <Icon iconName="ufo" size={25} />
          <Icon iconName="select" size={25} />
          <Icon iconName="secret" size={25} />
        </StubTitle>
        <ResponseContainer>
          <ResponsePre>{`${JSON.stringify(response, null, 4)}`}</ResponsePre>
        </ResponseContainer>
      </RightSide>
    </StyledStub>
  )
})
