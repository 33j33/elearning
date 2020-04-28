import React, { Component } from 'react';
import { Row, Col } from "antd";
import AliceCarousel from 'react-alice-carousel'
import { Card } from 'antd';

class courses extends Component {
items=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    state = {
        galleryItems: this.items.map((i) =>
       <Row style={{marginLeft:12}}> <Col span={23}> 
       <Card title="Course Name" style={{height:250}} extra={<h6>Anything</h6>}  
       key={i}>Teacher Name, duration , fees
       </Card></Col>
       </Row>),
    }

    responsive = {
        0: { items: 1 },
        1024: { items: 5 },
    }

    render() {
        return (
            <div >
                <div style={{backgroundColor:"grey" ,paddingTop:50, paddingBottom:50}}>                  <Row className="heading">
          <h5>WHAT ARE YOU LOOKING FOR .......</h5>
        </Row><br />
                <Row className="row-search">
          <Col span={10}>
            <div className="search">
              <form className="search-form">
                <input type="text" placeholder="Search " />
              </form>
            </div>
          </Col>
        </Row>
        </div><br />
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