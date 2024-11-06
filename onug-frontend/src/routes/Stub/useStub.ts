import { API_HOST } from 'constant'
import { useCallback, useState } from 'react'
import { labels } from './Stub.constants'
import { testCase } from './TestCases/testCase'

interface ServerResponse {
  serverResponse: string
}

interface UseStubLogicReturn {
  inputValues: number[]
  response: ServerResponse
  handleInputChange: (index: number, value: number) => void
  populateStub: () => Promise<void>
  resetStub: () => Promise<void>
  useTestCase: () => Promise<void>
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

  const useTestCase = useCallback(async () => {
    setDealStub(testCase)
    setInputValues(labels.map(label => testCase[label] || 0))
    await updateResponse(testCase)
  }, [])

  return {
    inputValues,
    response,
    handleInputChange,
    populateStub,
    resetStub,
    useTestCase
  }
}
