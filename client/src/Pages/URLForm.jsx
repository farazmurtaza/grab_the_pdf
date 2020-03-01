import React from "react";
import { Component } from "react";

export default class URLForm extends Component {
  constructor() {
    super();
    this.state = { url: "" };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("User name : " + this.state.url);

    const url = "http://localhost:5001/generate_pdf";
    const data = { url: this.state.url };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.blob())
      .then(response => {
        console.log(response);
        const file = new Blob([response], {
          type: "application/pdf"
        });

        const fileURL = URL.createObjectURL(file);

        window.open(fileURL);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="url" onChange={this.handleChange} />
        <input type="submit" value="Submit" />{" "}
      </form>
    );
  }
}
