import React , {useState, userEffect} from 'react';
import ReactDOM from 'react-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './App.css';
import CsvDownload from 'react-json-to-csv';

import Message from './Message.js';
import { Fireplace } from '@material-ui/icons';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            anchorEl: false,
            user: '',
            chats: [],
            img:'',
            data: [],
            selectedId: null,
            dataToBeExported: []
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    handleClick = (event) => {
        console.log("Handle Click", event);
        this.setState({
            anchorEl: event.currentTarget
        })
        console.log("ANchor State",this.state.anchorEl);
      };
      setId(id) {
          this.setState({
              selectedId: id 
          })
          console.log("GG wp",id);
      }
      isSpam(id) {
          this.updateData(true);
          this.setState({
            anchorEl: false
        })
      }
      isNotSpam(id) {
        this.updateData(false);
        console.log("IS HAM");
        this.setState({
          anchorEl: false
      })
    }

    updateData( flag) {
        console.log("Reached here",this.state.selectedId,flag);
        const data = {
            id: this.state.selectedId,
            isSpam: flag
        }
        fetch('http://localhost:3000/users', {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'Content-Type'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
    
    handleClose = () => {
        this.setState({
            anchorEl: null
        })
      };

    componentDidMount() {
        this.scrollToBot();
        var user= localStorage.getItem('userName');
        fetch("http://localhost:3000/users", {

        })
        .then(response => response.json())
        .then(response => {
        console.log(response)
        this.setState({
            chats: response,
            user: user
        })
        for(let data in this.state.chats){
            console.log("Data", this.state.chats[data]);
            if(this.state.chats[data].isSpam){
                this.setState({
                    dataToBeExported: this.state.dataToBeExported.concat([{
                        label: 'spam',
                        sms: this.state.chats[data].content
                    }])
                })
            }
            else {
                this.setState({
                    dataToBeExported: this.state.dataToBeExported.concat([{
                        label: 'ham',
                        sms: this.state.chats[data].content
                    }])
                })
            }
        }
        })
        .catch(err => {
        console.log(err);
        });
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    sendData(){
        let img = '';
        if(this.props.location.userName == 'sam'){
            img = 'https://i.ibb.co/MM4vsRr/IMG-3042.jpg';
        }
        else {
            img = 'https://i.ibb.co/hyWVz4y/Screen-Shot-2020-11-22-at-12-18-24-AM.png';
        }
        const data = {
            username: this.state.user,
            content: ReactDOM.findDOMNode(this.refs.msg).value,
            img: img
        }
        console.log('data',data);
        fetch('http://localhost:3000/users', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'Content-Type'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }

    submitMessage(e) {
        e.preventDefault();
        this.setState({
            chats: this.state.chats.concat([{
                username: this.state.user,
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                img: this.img,
            }]),
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
        this.sendData();
    }

    render() {
        const username = this.state.user;
        // alert(username);
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3>Bholi Padosan</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                        <div>
                            <li className={`chat ${username === chat.username ? "right" : "left"}`} onClick={this.handleClick}>
                            {username !== chat.username
                                && <img src={chat.img} alt={`${chat.username}'s profile pic`} />
                            }
                            <div onClick={() => {this.setId(chat._id)}}>
                            {chat.content}
                                </div>
                        </li>
                                                    <Menu
                                                    id= {chat._id}
                                                    anchorEl={this.state.anchorEl}
                                                    keepMounted
                                                    open={this.state.anchorEl}
                                                    onClose={this.handleClose}
                                                >
                                                    <MenuItem onClick={() => {this.isSpam(chat._id)}}>Spam</MenuItem>
                                                    <MenuItem onClick={() => {this.isNotSpam(chat._id)}}>Not Spam</MenuItem>
                                                </Menu>
                                                </div>
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
                <CsvDownload data={this.state.dataToBeExported} />
            </div>
        );
    }
}

export default Chatroom;