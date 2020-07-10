import React, { Component } from 'react';
import { Card, CardBody, CardText, Button } from 'reactstrap';
import './Home.css';

const staticData = `What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has ?`

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.getLocalStorageData(),
        }
    }

    getLocalStorageData = () => {
        const da = JSON.parse(localStorage.getItem("data_list"));
        if (da)
            localStorage.setItem('count', da.length)
        if (Array.isArray(da)) {
            return da;
        } else {
            return []
        }
    }

    setLocalStorageData = (data = staticData) => {
        localStorage.setItem("data_list", JSON.stringify(data));
        const data1 = JSON.parse(localStorage.getItem("data_list"))
        if (data1)
            localStorage.setItem('count', data1.length);
    }

    deleteHandler = (id) => {
        const newD = this.state.list.filter(val => val.id !== id);
        this.setLocalStorageData(newD);
        this.setState({ list: newD });
    }

    addHandler = () => {
        const newData = [...this.state.list, {
            id: (this.state.list.length === 0) ? 1 : this.state.list[this.state.list.length - 1].id + 1,
            data: staticData
        }];
        this.setState({ list: newData })
        this.setLocalStorageData(newData);
    }

    componentDidMount() {
        this.getLocalStorageData();
    }

    render() {
        return (
            <div>
                <label>Notification {this.state.list ? this.state.list.length : 0}</label><br />
                <button onClick={() => this.addHandler()}>Add</button>
                <Card className="parent">
                    {this.state.list ?
                        this.state.list.map((val) => {
                            return (
                                <CardBody className="card-style" key={val.id}>
                                    <CardText>
                                        {val.data}
                                    </CardText>
                                    <Button className="button-style" onClick={() => this.deleteHandler(val.id)}>Delete</Button>
                                </CardBody>
                            )
                        })
                        : null}
                </Card>
            </div>
        )
    }
}

export default Home;