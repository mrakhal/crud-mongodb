import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import { Button, Input, Table, Alert,Container,Row,Col,Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label  , FormText } from "reactstrap";

const URL_API = "http://localhost:2021";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notif: null,
      data: [],
      nama: null,
      modal:false,
      modals:false,
      modalsz:false,
      id:0,
    };
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios
      .get(
        "http://localhost:2021/get-data"
      )
      .then((res) => {
        this.setState({data:res.data})
      })
      .catch((err) => {
        console.log(err);
      });
  }; 


  deleteData = () => {
    axios
      .delete(
        "http://localhost:2021/delete-data",{id:this.state.id}
      )
      .then((res) => {
        alert("sukses")
      })
      .catch((err) => {
        console.log(err);
      });
  }; 

  generateId = () =>{
    let idx= 0
    return idx = this.state.data.length
  }

  addData = () => {
    axios
      .post(
        "http://localhost:2021/add-data",
        {
          id:this.generateId(),
          nama:this.nameIn.value,
          usia:this.usiaIn.value,
        }
      )
      .then((res) => {
        alert("sukses");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onBtEdit = (id) => {
    axios
      .patch(
        "http://localhost:2021/update-data",
        {
          id:this.state.id,
          nama:this.nameIn1.value,
          usia:this.usiaIn1.value,
        }
      )
      .then((res) => {
        alert("sukses");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  printData = () => {
    return this.state.data.map((item, idx) => {
      return (
        <tr>
              <td>{idx+1}</td>
              <td>{item.nama}</td>
              <td>{item.usia}</td>
              <td><Button color="primary" onClick={()=>{this.setState({id:item.id,modals:!this.state.modals})}}>Edit</Button>&nbsp;
              <Button color="danger" onClick={()=>{this.setState({id:item.id,modalsz:!this.state.modalsz})}}>Delete</Button></td>
        </tr>
      );
    });
  };

  printEdit = ()=>{
    return(<div>
      <Modal isOpen={this.state.modals} toggle={()=>{this.setState({modals:!this.state.modals})}} >
        <ModalHeader toggle={()=>{this.setState({modals:!this.state.modals})}}>Input Data</ModalHeader>
        <ModalBody>
           <Form>
      <FormGroup>
        <Label for="exampleEmail">Nama</Label>
        <Input type="text" name="nama" id="exampleNama" placeholder="Masukkan Nama" innerRef={(el) => (this.nameIn1 = el)}/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleUsia">Usia</Label>
        <Input type="number" name="usia" id="exampleUsia" placeholder="Masukkan Usia" innerRef={(el) => (this.usiaIn1 = el)}/>
      </FormGroup>
      <br></br>
      <Button color="primary" onClick={this.onBtEdit}>Submit</Button>
      </Form>
        </ModalBody>
      </Modal>
    </div>)
  }


  printInput = ()=>{
    return(<div>
      <Modal isOpen={this.state.modal} toggle={()=>{this.setState({modal:!this.state.modal})}} >
        <ModalHeader toggle={()=>{this.setState({modal:!this.state.modal})}}>Input Data</ModalHeader>
        <ModalBody>
           <Form>
      <FormGroup>
        <Label for="exampleEmail">Nama</Label>
        <Input type="text" name="nama" id="exampleNama" placeholder="Masukkan Nama" innerRef={(el) => (this.nameIn = el)}/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleUsia">Usia</Label>
        <Input type="number" name="usia" id="exampleUsia" placeholder="Masukkan Usia" innerRef={(el) => (this.usiaIn = el)}/>
      </FormGroup>
      <br></br>
      <Button color="primary" onClick={this.addData}>Edit</Button>
      </Form>
        </ModalBody>
      </Modal>
    </div>)
  }


  printDelete = ()=>{
    return(<div>
      <Modal isOpen={this.state.modalsz} toggle={()=>{this.setState({modalsz:!this.state.modalsz})}} >
        <ModalHeader toggle={()=>{this.setState({modalsz:!this.state.modalsz})}}>Delete Confirmation</ModalHeader>
        <ModalBody>
           <Form>
      <FormGroup style={{display:"flex",justifyContent:"center"}}>
        <Button color="danger" onClick={this.deleteData}>Yes</Button>&nbsp;
        <Button color="primary" onClick={()=>{this.setState({modalsz:!this.state.modalsz})}}>No</Button>
      </FormGroup>
      <br></br>
      </Form>
        </ModalBody>
      </Modal>
    </div>)
  }



  render() {
   console.log('data',this.state.data)
    return (
    <Container>
      <Row>
        <Container className="mt-2">
          <Row>
            <Col md="2">
            <Button color="success" onClick={()=>{this.setState({modal:!this.state.modal})}}>Input Data</Button>
            </Col>
          </Row>
        </Container>
    <Col md="12">
    {this.printInput()}
     {this.printEdit()}
     {this.printDelete()}
    <Table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Usia</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.printData()}
       
      </tbody>
    </Table>
    </Col>
    </Row>
    </Container>);
  }
}

export default App;
