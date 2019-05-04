import React from "react";
// import ReactDOM from "react-dom";
// REF:
// https://github.com/kolodny/immutability-helper
import update from 'immutability-helper';

// REF:
// ClassName: 
// https://github.com/JedWatson/classnames
import classNames from "classnames";
import axios from "axios";

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Components 
    
    import AppSnackBar, { openSnackbar } from '../components/app.snackbar';
    // import Util from '../components/util';

class AllQuestionnaire extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
        	preview: []
        };

        this.showPreview = this.showPreview.bind(this);
        this.returnOptionName = this.returnOptionName.bind(this);
        this.getQuestionnaires = this.getQuestionnaires.bind(this);
        this.returnFormRender = this.returnFormRender.bind(this);
        this.updateOptionValue = this.updateOptionValue.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    };

  	componentDidMount () {

  		this.getQuestionnaires();
  	};

  	getQuestionnaires() {
  		
        axios.get("/api/get-form", {
                crossdomain: true,
                headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
            .then(res => {

                this.setState({

                    preview: res.data.data
                })
            })
            .catch(err => {

                console.log('err', err);
            });
  	};

    updateOptionValue(evt, formObj, preview) {

        if( preview && preview != null )
        {
            // let previwl
            // console.log('previw', preview);
            let ind = null;
            // let previewObj = this.state.preview.map( (thisPreviewQuestion, thisPreviewQuestionIndex) => {
            //     if(thisPreviewQuestion.uuid === formObj.uuid) {

            //         ind = thisPreviewQuestionIndex;
            //         thisPreviewQuestion.optionValue = evt.target.value;
            //     }

            //     return thisPreviewQuestion;
            // });
            let updatedPreviewObj = null;
            for(var i = 0, len = this.state.preview.length; i < len; i++) {
                var thisPreviewQuestion = this.state.preview[i];
                
                if(thisPreviewQuestion.uuid === formObj.uuid) {
                    ind = i;
                    thisPreviewQuestion['optionValue'] = evt.target.value;

                    updatedPreviewObj = thisPreviewQuestion;

                    // console.log('found ind', ind, updatedPreviewObj);
                    break;
                }
            }

            // console.log('previewObj', previewObj);

            // this.setState({
            //     preview: previewObj
            // });
            if( ind != null ) 
            {
                const updatedPreview = update(this.state.preview, {$splice: [[ind, 1, updatedPreviewObj]]}); 

                console.log('updatedPreview', updatedPreview);
                this.setState({
                    preview: updatedPreview
                }); 

                // this.setState(
                //     update(this.state.preview, {
                //         ind: {
                //             $set: { 
                //                 optionValue: evt.target.value
                //             }
                //         }
                //     })
                // );

                console.log('ind', ind, evt.target.value, this.state.preview);
            }

        
            // console.log('previewObj', previewObj);
            // this.setState({
            //     preview: this.state.preview.map((thisPreviewQuestion) => {
            //         if ( thisPreviewQuestion && thisPreviewQuestion.uuid === formObj.uuid ) {
            //             thisPreviewQuestion.optionValue = evt.target.value;
            //         }
            //     })
            // });
        }
        else
        {
            this.setState({

                question: {
                    ...this.state.question,
                    optionValue: evt.target.value
                }
            });
        }
    };

    deleteQuestion( thisPreviewQuestion ) {

    	// console.log('thisPreviewQuestion', thisPreviewQuestion);

        axios.delete("api/delete-questionnaire", {
            data: {
            	id: thisPreviewQuestion._id
            }
        })
        .then(res => {

            if( res && res != null )
            {
  				this.getQuestionnaires();
            }
        });
    };

    returnFormRender( formObj, preview? ) {

    	// formObj
    	// will have 
    	// label, value

    	let { label, questiontype, placeholder, helper, options, question, optionValue } = formObj;

        if( !question || question == null ) {
            return false;
        };

    	const thisUuid = formObj._id;
        const newUuid = formObj.uuid;

        if( questiontype === 'input' )
        {
            return (
                <div className="demo-input-container">
                    <TextField
                        label={ label }
                        placeholder={ placeholder } 
                        value={ formObj.optionValue || "" } 
                        onChange={ (evt) => this.updateOptionValue( evt, formObj, preview ) }
                        helperText={ helper } 
                        fullWidth
                        variant="filled" />
                </div>
            );
        }
        else if( questiontype === 'select' )
        {
            return (
                <div className="demo-select-container">
                    <InputLabel htmlFor={thisUuid}>
                        { label } 
                    </InputLabel>
                    <Select 
                        fullWidth
                        value={ formObj.optionValue || "" }
                        onChange={ (evt) => this.updateOptionValue( evt, formObj, preview ) }
                        input={<Input 
                            name={ thisUuid } 
                            id={ thisUuid }   />
                        }>
                        
                        {
                            options.map(thisOption => (
                                <MenuItem 
                                    key={ thisOption.optionValue } 
                                    value={ thisOption.optionValue }>

                                    { thisOption.optionName }
                                </MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>{ helper }</FormHelperText>
                </div>
            );
        }
        else if( questiontype === 'textarea' )
        {
            return (
                <div className="demo-select-container">
                    <TextField
                        label={ label }
                        value={ formObj.optionValue || "" }
                        onChange={ (evt) => this.updateOptionValue( evt, formObj, preview ) }
                        placeholder={ placeholder } 
                        helperText={ helper } 
                        fullWidth
                        multiline
                        variant="filled" />
                </div>
            );
        }
        else if( questiontype === 'checkbox' || questiontype === 'radio' )
        {
            return (
                <div className={{
                    'demo-checkbox-container': questiontype === 'checkbox',
                    'demo-radio-container': questiontype === 'radio'
                }}>
                    <FormGroup row>
          				<FormLabel>{ label }</FormLabel>
                        {
                            options.map(thisOption => (

                                <FormControlLabel
                                	key={ thisOption.uuid }
                                    value={ formObj.optionValue || '' }
                                    className="form-selection-container"
                                    control={

                                        ( questiontype === 'checkbox' ) ?
                                        (<Checkbox
                                            key={ thisOption.optionValue } 
                                            value={ thisOption.optionValue }
                                            name={ newUuid } />
					                	)
                                        :
                                        (<Radio
                                            key={ thisOption.optionValue } 
                                            value={ thisOption.optionValue }
                                            name={ newUuid }
					                        onChange={ (evt) => this.updateOptionValue( evt, formObj, preview ) } />
					                	)
                                    }
                                    label={ thisOption.optionName }>
                                </FormControlLabel>
                            ))
                        }
                    <FormHelperText>{ helper }</FormHelperText>
                    </FormGroup>
                </div>
            );
        }
    };	

    returnOptionName( options, selectionOption ) {
        if(!selectionOption || selectionOption == null) return false;

        let answer = options.find( (thisOption) => {

            // console.log('thisOption', thisOption.optionValue, selectionOption);
            if( thisOption.optionValue === selectionOption ) {

                // console.log('selection', thisOption);
                return thisOption;
            }
        });

        if(!answer)
            return false;

        // console.log('answer', answer);
        return answer.optionName;
    };

  	showPreview() {

		const { preview } = this.state;

		if( !preview || preview.length === 0 )
			return;

		return (
            <div className="questionnaire-preview-container">
                {
                    preview.map(( thisPreviewQuestion, thisPreviewQuestionIndex ) => {

                    	console.log('thisPreviewQuestion', thisPreviewQuestion.preview);

                    	return thisPreviewQuestion.preview.map( (thisQuestion) => {

                    		console.log('thisQuestion', thisQuestion);

                            return (
                                <ExpansionPanel key={ thisQuestion._id } >
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

                                        <Typography>
                                            { thisQuestion.question }
                                        </Typography>
                                        <span className="expansion-panel-answer">
                                            { 
                                                 this.returnOptionName( thisQuestion.options, thisQuestion.optionValue )
                                            }
                                        </span>
                                    </ExpansionPanelSummary>                
                                    <ExpansionPanelDetails>
                                        {
                                    		this.returnFormRender( thisQuestion, thisPreviewQuestion )
                                        }
					                	<IconButton
					                		onClick={ () => this.deleteQuestion( thisPreviewQuestion ) }
					                  		aria-label="Delete Question">

						                  	<DeleteIcon />
					                	</IconButton>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            );
                        })
                    })
                }
            </div>
		);
  	};

    render() {

    	return (
    		<Paper className="get-form-container">
    			{
    				this.showPreview()
    			}
                <AppSnackBar />
            </Paper>
        );
    };
};


export default AllQuestionnaire;
