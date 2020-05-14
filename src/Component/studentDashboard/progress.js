import React, { Component } from 'react';
import { Card } from 'antd';

class progress extends Component {
    render() {
        return (
            <div>
                <h5 style= {{ marginBottom: 20}}>Current Courses: </h5>
                    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="HTML and CSS Fundamentals"
    >
      <p style={{marginBottom: 0}}>Teacher: Mr. Aman Gupta</p>
      <p style={{marginBottom: 0}}>Slots: Monday: 9:00-10:0, 12:00-1:00</p>
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="Fundamentals of Machine Learning"
    >
      <p style={{marginBottom: 0}}>Teacher: Ms. Sweta Sharma</p>
      <p style={{marginBottom: 0}}>Slots: Wednesday: 13:00-14:00</p>
      <p style={{marginLeft: 40, marginBottom: 0}}>Friday: 8:00-9:00, 14:00-15:00</p>
    </Card>
    <h5 style={{marginTop: 20, marginBottom: 20}}>Completed Courses: </h5>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="Data Structures using C"
    >
      <p style={{marginBottom: 0}}>Teacher: Mr. Amit Gupta</p>
    </Card>

            </div>
        );
    }
}

export default progress;