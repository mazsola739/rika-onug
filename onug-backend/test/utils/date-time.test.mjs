import { describe, it } from 'node:test'
import { strictEqual } from 'node:assert'
import { isTimeElapsed } from '../../src/utils'

describe('Test date-time utils', () => {
  it('should correctly measure elapsed time-periods', () => {
    const testData = [
      {
        fromTimeStamp: Date.now() - 1000,
        durationSecond: 1,
        expected: true,
      },
      {
        fromTimeStamp: Date.now() - 900,
        durationSecond: 1,
        expected: false,
      },
      {
        fromTimeStamp: Date.now() - 9000,
        durationSecond: 9,
        expected: true,
      },
      {
        fromTimeStamp: Date.now() - 8900,
        durationSecond: 9,
        expected: false,
      },
    ]
    testData.forEach((data) => {
      const { fromTimeStamp, durationSecond, expected } = data
      console.log(
        `testing: fromTimeStamp[${fromTimeStamp}] now[${Date.now()}] durationSecond[${durationSecond}] should be ${
          expected ? 'elapsed' : 'not elapsed'
        }`
      )
      strictEqual(isTimeElapsed(fromTimeStamp, durationSecond), expected)
    })
  })
})
