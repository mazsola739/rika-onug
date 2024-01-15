export const sendReadyRequest = async () => {
  try {
    const requestBody = {}

    const response = await fetch('http://localhost:7654/ready', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const responseData = await response.json()
    return responseData
  } catch (error) {
    throw new Error(`Error sending ready request: ${error.message}`)
  }
}
