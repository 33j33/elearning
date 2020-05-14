import React, { Component } from 'react';
import { Table } from "antd";
import axios from "axios";
import { Spin } from "antd";

class payment extends Component {
constructor(props) {
    super(props);
    this.state={
        coursesArray: [],
loading:true
    }
    
}

    componentDidMount() {
        const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
        const headers = { "x-auth-token": currentUser.token };
        axios
          .get(
            `https://elearningserver.herokuapp.com/student/selectedCourse/${currentUser.studentid}`,
            { headers }
          )
          .then((response) => {
            this.setState({loading:false})
            console.log(response);
            for (const i in response.data) {
              response.data[i].date = response.data[i].date.split("T")[0];
            }
    
            this.setState({ coursesArray: response.data });
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    render() {
        const columns = [
            {
              title: "Course Name",
              dataIndex: "course_name",
              key: "course_name",
              responsive: ["sm"],

            },
            {
              title: "Teacher Name",
              dataIndex: "teacher_name",
              key: "teacher_name",
              responsive: ["sm"],

            },
            {
              title: "Starting Date",
              dataIndex: "date",
              key: "date",
              responsive: ["sm"],

            },
            // {
            //   title: "Amount Paid",
            //   key: "tags",
            //   dataIndex: "tags",
            //   render: (tags) => (
            //     <span>
            //       {tags.map((tag) => {
            //         let color = "green";
            //         return (
            //           <Tag color={color} key={tag}>
            //             {tag.toUpperCase()}
            //           </Tag>
            //         );
            //       })}
            //     </span>
            //   ),
            // },
            {
              title: "Teacher Mobile Number",
              dataIndex: "teacher_mobile",
              key: "teacher_mobile",
              responsive: ["sm"],

            },
            {
                title: "Course Type",
                dataIndex: "course_type",
                key: "course_type",
                responsive: ["sm"],

              },
          ];
        return (
          <Spin spinning={this.state.loading}>
            <div>
                <Table
          columns={columns}
          dataSource={this.state.coursesArray}
          size="small"
        /> 
            </div>
            </Spin>
        );
    }
}

export default payment;