import "@testing-library/jest-dom/extend-expect"
import TflApiMock from "./TflApiMock.json"
import * as TflApi from "./TflApi"

beforeAll(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve(TflApiMock.station),
        })
})

afterEach(() => {
    jest.restoreAllMocks()
})

describe("Test TFLApi functions", () => {
    // Simple fetch test to verify it is called and returns a mock 
    it("getGreatPortlandStreetArrivals call to TflApi", async () => {
        const spy = jest.spyOn(TflApi, "getGreatPortlandStreetArrivals")

        const fetchResponse = await TflApi.getGreatPortlandStreetArrivals()

        expect(spy).toHaveBeenCalled()
        expect(Array.isArray(fetchResponse)).toBe(true)
    })
    // Format Array of trains into distinct platforms and soft modelled train objects
    it("formatTrainList formatting of object", async () => {
        const formattedObject = TflApi.formatTrainList(TflApiMock.station)
        const formattedObjectKeys = Object.keys(formattedObject)
        const platforms = ["Eastbound - Platform 2", "Westbound - Platform 1"]
        const platformSpecificTrainObject = Object.keys(
            Object.values(formattedObject)[0][0]
        )

        const trainModel = [
            "id",
            "timeToStation",
            "line",
            "direction",
            "platformName",
        ]
        
  
        expect(typeof formattedObject).toBe("object")
        expect(formattedObjectKeys.length).toEqual(2)
        expect(formattedObjectKeys).toEqual(platforms)
        expect(platformSpecificTrainObject).toEqual(trainModel)
    })
})