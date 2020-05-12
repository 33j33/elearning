import React, { Component } from 'react';
import { Table, Tag } from "antd";
import axios from "axios";

class payment extends Component {
constructor(props) {
    super(props);
    this.state={
        coursesArray: [],

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
            console.log(response.data);
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
            <div>
                <Table
          columns={columns}
          dataSource={this.state.coursesArray}
          size="small"
        /> 
            </div>
        );
    }
}

export default payment;