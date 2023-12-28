exports.handler = async (event) => {
    console.log("EVENT: ", event)

//    let { cards } = JSON.parse(event.body)

//    console.log("CARDS: ", cards)

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            roomId: "TODO GENERATE",
            players: {
                todo: "TODO",
            },
        }),
    }

    console.log("RESPONSE:", response)
    return response
}