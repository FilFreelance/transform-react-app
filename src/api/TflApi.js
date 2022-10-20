// Mock for down time train hours 
// import TflApiMock from "./TflApiMock.json"


//  Request all trains from Great Portland Street Station by its unique Stoppoint ID
export function getGreatPortlandStreetArrivals() {
    return new Promise((resolve, reject) => {
        fetch("https://api.tfl.gov.uk/Stoppoint/940GZZLUGPS/Arrivals")
            .then((response) => {
                // return TflApiMock.station
                return response.json()
            })
            .then((response) => {
                // return resolve(TflApiMock.station)
                return resolve(response)
            })
            .catch((err) => reject(err))
    })
}

// Format returned trainList for simpler fields and sorting of list
export function formatTrainList(trainList) {
    let formattedList = []

    trainList.forEach((train) => {
        formattedList.push(formatTrainObject(train))
    })
    return formattedList.sort((a, b) => a.timeToStation - b.timeToStation);

}

// Soft MODEL processing train object
function formatTrainObject(train) {
    return {
        id: train.id,
        timeToStation: Math.ceil(train.timeToStation / 60),
        line: train.lineName,
        direction: train.towards,
        platformName: train.platformName,
    }
}
