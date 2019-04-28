import React from "react";
// import ReactDOM from "react-dom";

// REF:
// ClassName: 
// https://github.com/JedWatson/classnames
import classNames from "classnames";
import axios from "axios";

// import FormControl from '@material-ui/core/FormControl';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
// import TextField from '@material-ui/core/TextField';
// import Fab from '@material-ui/core/Fab';

// import AddIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';

// import MenuItem from '@material-ui/core/MenuItem';
// import Input from '@material-ui/core/Input';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Radio from '@material-ui/core/Radio';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Components 
    
    import AppSnackBar, { openSnackbar } from '../components/app.snackbar';
    // import Util from '../components/util';

class GetForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
        };
    };

  	componentDidMount () {
    	const { formid } = this.props.match.params;

        axios.get("/api/get-form-details/" + formid, {
                crossdomain: true,
                headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
            .then(res => {

                // this.setState({

                //     list: res.data.data
                // })
            })
            .catch(err => {

                console.log('err', err);
            });
  	};

    render() {

    	return (
    		<Paper className="get-form-container">
    			Get Form
                <AppSnackBar />
            </Paper>
        );
    };
};


export default GetForm;
