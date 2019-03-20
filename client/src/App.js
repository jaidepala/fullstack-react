import React from "react";
import axios from "axios";
// import ReactDOM from "react-dom";
import "./App.css";
import Button from "@material-ui/core/Button";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
// import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

class App extends React.Component {

    constructor(props) {

        // console.log('en', process.env.REACT_APP_SECRET_NAME);

        super(props);

        // initialize our state 
        this.state = {
            passwords: [],
            data: [],
            id: 0,
            message: null,
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null
        };

        this.getDataFromDb = this.getDataFromDb.bind(this);
        this.putDataToDB = this.putDataToDB.bind(this);
        this.deleteFromDB = this.deleteFromDB.bind(this);
        this.updateDB = this.updateDB.bind(this);
        this.selectDataToEdit = this.selectDataToEdit.bind(this);
        this.selectDataToDelete = this.selectDataToDelete.bind(this);
    }

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has 
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        this.getPasswords();
        // if (!this.state.intervalIsSet) {
        //   let interval = setInterval(this.getDataFromDb, 1000);
        //   this.setState({ intervalIsSet: interval });
        // }
    }

    // never let a process live forever 
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    // just a note, here, in the front end, we use the id key of our data object 
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify 
    // data base entries

    // our first get method that uses our backend api to 
    // fetch data from our data base
    getDataFromDb = () => {

        axios.get("api/getData", {
                crossdomain: true,
                headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
            // .then(response => response.json())
            .then(res => {

                this.setState({ data: res.data.data })
            })
            .catch(err => {

                console.log('err', err);
            });
    };

    // our put method that uses our backend api
    // to create new query into our data base
    putDataToDB = message => {

        let currentIds = this.state.data && this.state.data.map(data => data && data['id']);

        let idToBeAdded = 0;
        while (currentIds && currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post("api/putData", {
            id: idToBeAdded,
            message: message
        })
        .then(res => {

            // console.log('res', res);

            if( res && res.success )
            {
                this.getDataFromDb();
            }
        });
    };


    // our delete method that uses our backend api 
    // to remove existing database information
    deleteFromDB = idTodelete => {
        let objIdToDelete = null;
        this.state.data.forEach(dat => {
            if (dat.id === idTodelete) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete("api/deleteData", {
            data: {
                id: objIdToDelete
            }
        })
        .then(res => {

            this.getDataFromDb();
        });
    };

    selectDataToEdit = ( selectedData ) => {

        this.setState({ idToUpdate: selectedData._id });
    };

    selectDataToDelete = ( selectedData ) => {

        this.setState({ idToDelete: selectedData._id });
    };

    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        this.state.data.forEach(dat => {
            if (dat.id === idToUpdate) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post("api/updateData", {
            id: objIdToUpdate,
            update: { message: updateToApply }
        });
    };

    getPasswords = () => {
        // Get the passwords and store them in state
        fetch('api/passwords')
            .then(res => res.json())
            .then(passwords => this.setState({ passwords }))
            .catch((err) => {
                console.log('err', err);
            });
    }


    // here is our UI
    // it is easy to understand their functions when you 
    // see them render into our screen
    render() {
        const { data } = this.state;
        const { passwords } = this.state;

        return (
            <div>
        {passwords.length ? (
          <div>
            <h1>5 Passwords.</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
            <button
              className="more"
              onClick={this.getDataFromDb}>
              Get Some More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
        <Card>
            {
                !data || data.length <= 0 ?

                <h2>  
                    No Entries Found!
                </h2>  
                :
                <div>  
                    <List component="nav">
                        {
                            data.map(thisData => (
                                <ListItem 
                                    dense
                                    button
                                    key={thisData._id}>

                                    <ListItemText primary={thisData.message} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            aria-label="Edit"
                                            onClick={() => this.selectDataToEdit(thisData)} >
                                            
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="Delete"
                                            onClick={() => this.deleteFromDB(thisData._id)} >
                                            
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                    </List>
                </div>  
            }
            <TextField

                label="add something to db"
                margin="normal"
                onChange={e => this.setState({ message: e.target.value })} />

                <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => this.putDataToDB(this.state.message)}>
                    
                        ADD
                </Button>
        </Card>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
        );
    }
}

export default App;