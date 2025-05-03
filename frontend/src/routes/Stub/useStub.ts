import { API_HOST } from 'constants'
import { useCallback, useState } from 'react'
import { labels } from './Stub.constants'
import { testCase1, testCase2, testCase3, testCase4, testCase5 } from './StubTestCases'

interface ServerResponse {
  serverResponse: string
}

interface UseStubLogicReturn {
  inputValues: number[]
  response: ServerResponse
  handleInputChange: (index: number, value: number) => void
  populateStub: () => Promise<void>
  resetStub: () => Promise<void>
  useTestCase1: () => Promise<void>
  useTestCase2: () => Promise<void>
  useTestCase3: () => Promise<void>
  useTestCase4: () => Promise<void>
  useTestCase5: () => Promise<void>
}

export const useStub = (): UseStubLogicReturn => {
  const [inputValues, setInputValues] = useState<number[]>(Array(labels.length).fill(0))
  const [response, setResponse] = useState<ServerResponse>({
    serverResponse: 'will be populated here'
  })
  const [dealStub, setDealStub] = useState<Record<string, number>>({})

  const fetchOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const updateResponse = async (body: object) => {
    const res = await fetch(`${API_HOST}/stub/populate/deal`, {
      ...fetchOptions,
      body: JSON.stringify(body)
    })
    setResponse(await res.json())
  }

  const handleInputChange = useCallback((index: number, value: number) => {
    const parsedValue = Number(value)
    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 86) return

    setInputValues(prev => {
      const newValues = [...prev]
      newValues[index] = parsedValue
      return newValues
    })

    setDealStub(prevStub => ({
      ...prevStub,
      [labels[index]]: parsedValue || null
    }))
  }, [])

  const populateStub = useCallback(async () => {
    await updateResponse(dealStub)
  }, [dealStub])

  const resetStub = useCallback(async () => {
    setDealStub({})
    setInputValues(Array(labels.length).fill(0))
    await updateResponse({ reset: true })
  }, [])

  const useTestCase1 = useCallback(async () => {
    setDealStub(testCase1)
    setInputValues(labels.map(label => testCase1[label] || 0))
    await updateResponse(testCase1)
  }, [])
  const useTestCase2 = useCallback(async () => {
    setDealStub(testCase2)
    setInputValues(labels.map(label => testCase2[label] || 0))
    await updateResponse(testCase2)
  }, [])
  const useTestCase3 = useCallback(async () => {
    setDealStub(testCase3)
    setInputValues(labels.map(label => testCase3[label] || 0))
    await updateResponse(testCase3)
  }, [])
  const useTestCase4 = useCallback(async () => {
    setDealStub(testCase4)
    setInputValues(labels.map(label => testCase4[label] || 0))
    await updateResponse(testCase4)
  }, [])
  const useTestCase5 = useCallback(async () => {
    setDealStub(testCase5)
    setInputValues(labels.map(label => testCase5[label] || 0))
    await updateResponse(testCase5)
  }, [])

  return {
    inputValues,
    response,
    handleInputChange,
    populateStub,
    resetStub,
    useTestCase1,
    useTestCase2,
    useTestCase3,
    useTestCase4,
    useTestCase5
  }
}
