import React from "react";
// import ReactDOM from "react-dom";

// REF:
// ClassName: 
// https://github.com/JedWatson/classnames
import classNames from "classnames";
import axios from "axios";

import FormControl from '@material-ui/core/FormControl';
// import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

// Components 
    
    import AppSnackBar from '../components/app.snackbar';

class CreateForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            formType: '',
            formLabel: '',
            formPlaceholder: '',
            formHelpertext: '',

            formOptionLabel: '',
            formOptionValue: '',
            formOptionSelected: '',
            formOptions: []
        };

        this.getFormType = this.getFormType.bind(this);
        this.addOptions = this.addOptions.bind(this);

        const sn = new AppSnackBar();

        console.log('AppSnackBar', sn);

    };

    getFormType() {

        const formType = this.state.formType && this.state.formType.toLowerCase(); 

        if( formType === 'input' )
        {
            return (
                <div className="demo-input-container">
                    <TextField
                        id="demo-form"
                        label={ this.state.formLabel }
                        placeholder={ this.state.formPlaceholder } 
                        helperText={ this.state.formHelpertext } 
                        fullWidth
                        margin="normal"
                        variant="filled" />
                </div>
            );
        }
        else if( formType === 'select' )
        {
            let options = this.state.formOptions;

            return (
                <div className="demo-select-container">
                    <InputLabel htmlFor="demo-form-type">
                        { this.state.formLabel }
                    </InputLabel>
                    <Select
                        fullWidth 
                        onChange={e => this.setState({ formOptionSelected: e.target.value })}
                        input={<Input name="demo-form-type" id="demo-form-type" />}>
                        
                        {
                            options.map(thisOption => (
                                <MenuItem key={ thisOption.optionValue } value={ thisOption.optionValue }>
                                    { thisOption.optionName }
                                </MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>{ this.state.formHelpertext }</FormHelperText>
                </div>
            );
        }
        else if( formType === 'textarea' )
        {
            return (
                <div className="demo-select-container">
                    <TextField
                        id="demo-textarea"
                        label={ this.state.formLabel }
                        placeholder={ this.state.formPlaceholder } 
                        helperText={ this.state.formHelpertext } 
                        fullWidth
                        multiline
                        margin="normal"
                        variant="filled" />
                </div>
            );
        }
        else if( formType === 'checkbox' || formType === 'radio' )
        {
            let options = this.state.formOptions;

            return (
                <div className={{
                    'demo-checkbox-container': formType === 'checkbox',
                    'demo-radio-container': formType === 'radio'
                }}>
                    <FormGroup row>
                        {
                            options.map(thisOption => (

                                <FormControlLabel
                                    className="form-selection-container"
                                    fullWidth
                                    control={

                                        ( formType === 'checkbox' ) ?
                                        (<Checkbox
                                            key={ thisOption.optionValue } 
                                            value={ thisOption.optionValue }
                                            name="checkbox-button-demo"
                                            onChange={e => this.setState({ formOptionSelected: e.target.value })}  />)
                                        :
                                        (<Radio
                                            key={ thisOption.optionValue } 
                                            value={ thisOption.optionValue }
                                            name="radio-button-demo"
                                            checked={ this.state.formOptionSelected === thisOption.optionValue }
                                            onChange={e => this.setState({ formOptionSelected: e.target.value })}  />)
                                    }
                                    label={ thisOption.optionName }>
                                </FormControlLabel>
                            ))
                        }
                    <FormHelperText>{ this.state.formHelpertext }</FormHelperText>
                    </FormGroup>
                </div>
            );
        }
    };

    addOptions() {

        var allOptions = this.state.formOptions;

        let { formOptionLabel } = this.state;
        let { formOptionValue } = this.state;

        console.log('this.state.snackbar',this.state.snackbar);

        if( !formOptionValue || !formOptionLabel ) {

            // this.state.snackbar.handleClick();
            return false;
        }

        allOptions.push({
            optionValue: formOptionValue,
            optionName: formOptionLabel
        });

        this.setState({
            formOptionLabel: '',
            formOptionValue: allOptions.length,
            formOptionSelected: formOptionValue,
            formOptions: allOptions
        });

        console.log('options', this.state.formOptions);
    };

    saveFormDetails() {

    };

    render() {

        let demoFormTypeContainer = this.getFormType();
        let { formType } = this.state;
        let showOptions = (formType === 'radio' || formType === 'checkbox' || formType === 'select');
        let { formOptions } = this.state;

        let showOptionClass = classNames({
            'show add-data-container': showOptions, 
            'hide': !showOptions 
        });

        let outputContainer = classNames({ 
            'hide': !demoFormTypeContainer, 
            'demo-form show': demoFormTypeContainer  
        });

    	return (
    		<Paper className="create-form-container">
                <FormControl className="show">
                    <div className="input-container">
                        <InputLabel htmlFor="form-type">
                            Select Form Type
                        </InputLabel>
                        <Select
                            fullWidth 
                            value={ this.state.formType }
                            onChange={e => this.setState({ formType: e.target.value })}
                            input={<Input name="form-type" id="form-type" />}>

                            <MenuItem value={'input'}>Input</MenuItem>
                            <MenuItem value={'select'}>Select</MenuItem>
                            <MenuItem value={'textarea'}>TextArea</MenuItem>
                            <MenuItem value={'checkbox'}>Checkbox</MenuItem>
                            <MenuItem value={'radio'}>Radio</MenuItem>
                        </Select>
                    </div>
                    <div className="input-container">
                        <TextField
                            id="form-label" 
                            label="Add a label for your form..." 
                            margin="normal" 
                            type="search" 
                            onChange={e => this.setState({ formLabel: e.target.value })} 
                            fullWidth />
                    </div>
                    <div className="input-container">
                        <TextField
                            id="form-placeholder" 
                            label="Add a Placeholder for your form..." 
                            margin="normal" 
                            type="search" 
                            onChange={e => this.setState({ formPlaceholder: e.target.value })} 
                            fullWidth />
                    </div>
                    <div className="input-container">
                        <TextField
                            id="form-helpertext" 
                            label="Add a Helpertext for your form..." 
                            margin="normal" 
                            type="search" 
                            onChange={e => this.setState({ formHelpertext: e.target.value })} 
                            fullWidth />
                    </div>
                </FormControl>
                <Card 
                    className={ showOptionClass }>
                    <List component="nav">
                    {
                        formOptions.map(thisOption => (
                            <ListItem key={ thisOption.optionValue }>
                                <ListItemText primary={ thisOption.optionName } />
                            </ListItem>
                        ))
                    }
                    </List>

                    <Divider />

                    <form noValidate autoComplete="off">
                        <TextField

                            placeholder="Add an option label"
                            margin="none"
                            onChange={e => this.setState({ formOptionLabel: e.target.value })}
                            variant="outlined"
                            fullWidth />

                        <TextField

                            placeholder="Add an option value"
                            margin="none"
                            onChange={e => this.setState({ formOptionValue: e.target.value })}
                            variant="outlined"
                            fullWidth />

                        <div className="add-option-btn-container">
                            <Fab 
                                className="add-option-btn" 
                                color="primary" 
                                onClick={() => this.addOptions()}
                                aria-label="Add" >

                                <AddIcon />
                            </Fab>
                        </div>
                    </form>

                </Card>
                <Divider />
                <Paper className="demo-form-output-container">
                    <Card className={ outputContainer }>
                        { demoFormTypeContainer }
                    </Card>
                </Paper>
                <AppSnackBar 
                    msg="Please set an option"
                    actionBtn="Ok"
                    duration="2000" />
            </Paper>
        );
    };
};


export default CreateForm;
