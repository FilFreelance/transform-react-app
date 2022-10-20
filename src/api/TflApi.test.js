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
    it("formatTrainList formatting of array of trains", async () => {
        const formattedList = TflApi.formatTrainList(TflApiMock.station)

        const trainModel = [
            "id",
            "timeToStation",
            "line",
            "direction",
            "platformName",
        ]
        

        expect(Array.isArray(formattedList)).toBe(true)
        expect(formattedList.length).toEqual(23)
        expect(Object.keys(formattedList[0])).toEqual(trainModel)
    })
})
