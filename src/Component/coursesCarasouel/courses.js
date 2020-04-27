import React, { Component } from 'react';
import Header from '../Navbar/Header';
import { Row, Col } from "antd";
import AliceCarousel from 'react-alice-carousel'
import { Card } from 'antd';

class courses extends Component {
items=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    state = {
        galleryItems: this.items.map((i) =>
       <Row style={{marginLeft:12}}> <Col span={23}> <Card title="Default size card" style={{height:200}} extra={<a href="#">More</a>}  key={i}>{i}
       </Card></Col></Row>),
    }

    responsive = {
        0: { items: 1 },
        1024: { items: 5 },
    }

    render() {
        return (
            <div>
                <Header /><br />
                <Row>
                    <AliceCarousel
                        items={this.state.galleryItems}
                        responsive={this.responsive}
                        autoPlayInterval={3000}
                        autoPlayDirection="ltr"
                        autoPlay={true}
                        fadeOutAnimation={true}
                        mouseTrackingEnabled={true}
                        buttonsDisabled={true}
                        
                    />

                </Row>
            </div>
        );
    }
}

export default courses;