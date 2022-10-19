import _ from "lodash"

export function getGreatPortlandStreetArrivals() {
    return new Promise(function (resolve, reject) {
        fetch("https://api.tfl.gov.uk/Stoppoint/940GZZLUGPS/Arrivals")
            .then((response) => {
                return response.json()
            })
            .then((array) => {
                resolve(array)
            })
            .catch((err) => reject(err))
    })
}

export function formatTrainList(trainList) {
    let formattedList = []
    
    trainList.forEach((train) => {
        formattedList.push(formatTrainObject(train))
    })
    return _.groupBy(formattedList, "platformName")
}

function formatTrainObject(train) {
    return {
        id: train.vehicleId,
        timeToStation: train.timeToStation,
        line: train.lineName,
        direction: train.direction,
        platformName: train.platformName,
    }
}
