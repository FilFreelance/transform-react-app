import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import * as TflApi from "../api/TflApi"
import React, { Component } from "react"

class TrainList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            platforms: [],
        }
    }

    getPlatforms() {
        TflApi.getGreatPortlandStreetArrivals().then((station) => {
            this.setState({ platforms: TflApi.formatTrainList(station) })
        })
    }
    async componentDidMount() {
        this.getPlatforms()
        try {
            setInterval(async () => {
                this.getPlatforms()
            }, 10000)
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const trainsRunning = this.state.platforms.length > 0

        if (trainsRunning) {
            return (
                <Container>
                    {this.state.platforms.map((train, i) => (
                        <Card key={train.id + i}>
                            <Container>
                                <Row xs={3} md={3} lg={3}>
                                    <Col>{train.timeToStation} minutes</Col>
                                    <Col>
                                        <p>{train.direction}</p>
                                    </Col>
                                    <Col>
                                        <p>{train.platformName}</p>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    ))}
                </Container>
            )
        } else {
            return <div className="station-text">No trains are currently running </div>
        }
    }
}
export default TrainList
