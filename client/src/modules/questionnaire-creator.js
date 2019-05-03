import React from "react";
// REF:
// https://www.npmjs.com/package/uuid-random	
import uuid from 'uuid-random';
// REF:
// https://github.com/kolodny/immutability-helper
import update from 'immutability-helper';

// import ReactDOM from "react-dom";

// REF:
// ClassName: 
// https://github.com/JedWatson/classnames
import classNames from "classnames";
import axios from "axios";

import FormControl from '@material-ui/core/FormControl';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/Share';
import Fab from '@material-ui/core/Fab';

import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { withStyles } from '@material-ui/core/styles';

// Components 
    
    import AppSnackBar, { openSnackbar } from '../components/app.snackbar';
    // import Util from '../components/util';

class QuestionnaireCreator extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {

			question: {

				questiontype: '',
                label: '',
				question: '',
				helper: '',
				placeholder: '',
				optionName: '',
				optionValue: '',
				options: []
			},
            typeOfForm: [{
                optionName: 'Input',
                optionValue: 'input'
            },{
                optionName: 'Select',
                optionValue: 'select'
            },{
                optionName: 'Textarea',
                optionValue: 'textarea'
            },,{
                optionName: 'Checkbox',
                optionValue: 'checkbox'
            },{
                optionName: 'Radio',
                optionValue: 'radio'
            }],

			preview: []
		};

		this.returnFormRender 		= this.returnFormRender.bind(this);
		this.renderPreview 			= this.renderPreview.bind(this);
		this.renderSelection 		= this.renderSelection.bind(this);
		this.renderQuestionnaire 	= this.renderQuestionnaire.bind(this);
		this.addOptions 			= this.addOptions.bind(this);
        this.addQuestion            = this.addQuestion.bind(this);
        this.createShareOptions     = this.createShareOptions.bind(this);
        this.resetForm              = this.resetForm.bind(this);
        this.returnOptionName       = this.returnOptionName.bind(this);
		this.updateOptionValue 		= this.updateOptionValue.bind(this);
       
        // console.log('styles', styles);
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

    returnFormRender( formObj, preview? ) {

    	// formObj
    	// will have 
    	// label, value

    	let { label, questiontype, placeholder, helper, options, question, optionValue } = formObj;

        if( !question || question == null ) {
            return false;
        }

    	const thisUuid = uuid();
        const newUuid = uuid();

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
                                	key={ uuid() }
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

    addQuestion() {

    	let { preview, question } = this.state;

        question.optionValue = null;

    	preview.push( question );

    	this.setState({

    		preview: preview
    	});

        this.resetForm();
    };

    addOptions() {

        let { optionName, options } = this.state.question;

        if( !optionName ) {

            let msg = '';

            if( !optionName )
                msg = 'Please enter name.';
            else
                msg = 'Please enter value.';

            openSnackbar({
                msg: msg,
                actionBtn: 'Ok',
                duration: 5000
            });

            return false;
        }
        else
        {
            for(var i = 0, len = options.length; i < len; i++) {
                var thisFormOption = options[i];

                if ( thisFormOption && thisFormOption.optionName && thisFormOption.optionName.trim().toLowerCase() === optionName.trim().toLowerCase() ) {

                    openSnackbar({
                        msg: 'Label already exists.',
                        actionBtn: 'Ok',
                        duration: 5000
                    });

                    return false;
                }
            };
        }

        const newUuid = uuid();

        options.push({
            // optionValue: formOptionValue,
            optionValue: newUuid,
            optionName: optionName
        });

        this.setState({
			question: {
				...this.state.question, 
        		optionName: null,
				options: options,
                optionValue: newUuid
			}
        });

        console.log('state', this.state);
    };

    createShareOptions() {

        const { preview } = this.state;

        console.log('preview', preview);

        axios.post("api/create-form", {
            preview: preview
        })
        .then(res => {

            if( res && res.success )
            {
                openSnackbar({
                    msg: 'Saved Successfully!',
                    actionBtn: 'Ok',
                    duration: 5000
                });

                // this.getFormData();
            }
        })
        .catch(err => {

            console.log('err', err);
        });
    };

    resetForm() {

        this.setState({

            question: {
                ...this.state.question,
                questiontype: '',
                question: '',
                label: '',
                helper: '',
                placeholder: '',
                optionName: '',
                optionValue: '',
                options: []
            }
        });
    };

    renderSelection() {

        const { helper, placeholder, questiontype } = this.state.question;
    	const { typeOfForm } = this.state;

    	return (
    		<div className="selection-container">
    			<FormControl fullWidth margin="normal">
	                <InputLabel htmlFor="question-type">
	                    Select Question Type
	                </InputLabel>
	                <Select 
	                	value={ this.state.question.questiontype }
	                    onChange={evt => this.setState({
	                    		question: {
			                    	...this.state.question, 
			                    	questiontype: evt.target.value 
		                    	}
	                    	})
	                	}
	                    input={<Input name="question-type" id="question-type" />}>
	                    
	                    {
	                        typeOfForm.map(thisOption => (
	                            <MenuItem key={ thisOption.optionValue } value={ thisOption.optionValue }>
	                                { thisOption.optionName }
	                            </MenuItem>
	                        ))
	                    }
	                </Select>
    			</FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="question" 
                        label="What's your question..." 
                        type="search" 
                        onChange={evt => this.setState({
                                question: {
                                    ...this.state.question, 
                                    question: evt.target.value 
                                }
                            })
                        } />
                </FormControl>
    			<FormControl fullWidth margin="normal">
                    <TextField
                        id="question-label" 
                        label="Add a label for your question..." 
                        type="search" 
                        onChange={evt => this.setState({
	                    		question: {
			                    	...this.state.question, 
			                    	label: evt.target.value 
		                    	}
	                    	})
	                	} />
    			</FormControl>
    			<FormControl fullWidth margin="normal">
                    <TextField
                        id="question-placeholder" 
                        label="Add a placeholder for your question..." 
                        type="search" 
                        onChange={evt => this.setState({
	                    		question: {
			                    	...this.state.question, 
			                    	placeholder: evt.target.value 
		                    	}
	                    	})
	                	} />
    			</FormControl>
    			<FormControl fullWidth margin="normal">
                    <TextField
                        id="question-helper" 
                        label="Add a helper for your question..." 
                        type="search" 
                        onChange={evt => this.setState({
	                    		question: {
			                    	...this.state.question, 
			                    	helper: evt.target.value 
		                    	}
	                    	})
	                	} />
    			</FormControl>
    			{
    				( questiontype === 'select' || questiontype === 'checkbox' || questiontype === 'radio' ) ? 
						(
			    			<FormControl fullWidth margin="normal" >
          						<InputLabel htmlFor="question-options">
          							Add options for your question...
          						</InputLabel>
			                    <Input
			                        id="question-options" 
			                        type="text" 
			                        value={ this.state.question.optionName || '' }
			                        onChange={evt => this.setState({
				                    		question: {
						                    	...this.state.question, 
						                    	optionName: evt.target.value 
					                    	}
				                    	})
				                	} 
						            endAdornment={
						              	<InputAdornment position="end">
						                	<IconButton
						                  		aria-label="Add option"
						                  		onClick={ this.addOptions }>

							                  	<AddIcon />
						                	</IconButton>
						              	</InputAdornment>
						            } />
			    			</FormControl>
						) 
						: 
						''
    			}
                <div className="submit-container">

                    <Button 
                            variant="contained" 
                            size="large" 
                            onClick={() => this.addQuestion()}
                            fullWidth
                            color="primary">

                        Add <AddIcon />
                    </Button>
                </div>
    		</div>
		);
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

	renderQuestionnaire() {

		const { preview } = this.state;

		if( !preview || preview.length === 0 )
			return;

        // const { classes } = this.props;

		return (
            <div className="questionnaire-preview-container">
                {
                    preview.map(( thisPreviewQuestion, thisPreviewQuestionIndex ) => {

                            // let previewAnswer = thisPreviewQuestion.optionValue;

                            // let showValue = classNames({ 
                            //     'hide': !previewAnswer, 
                            //     'show': previewAnswer  
                            // });

                            thisPreviewQuestion['uuid'] = uuid();

                            return (
                                <ExpansionPanel key={ thisPreviewQuestion.uuid } >
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

                                        <Typography>
                                            { thisPreviewQuestion.question }
                                        </Typography>
                                        <span className="expansion-panel-answer">
                                            { 
                                                 this.returnOptionName( thisPreviewQuestion.options, thisPreviewQuestion.optionValue )
                                            }
                                        </span>
                                    </ExpansionPanelSummary>                
                                    <ExpansionPanelDetails>
                                        {
                                            this.returnFormRender( thisPreviewQuestion, preview )
                                        }
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            );
                        }
        			)
                }
            </div>
		);
	};

	renderPreview() {

		const { question } = this.state;
		const questionPreviewContainer = this.returnFormRender( question );

		if( !questionPreviewContainer || questionPreviewContainer == null )
			return;

		return (
			<div className="preview-container">
				
				{
					questionPreviewContainer
				}
			</div>
		);
	};

	render() {

		const { renderSelection, renderPreview, renderQuestionnaire } = this;
		
		const renderSelectionDiv = renderSelection(), 
				renderPreviewDiv = renderPreview(), 
				renderQuestionnaireDiv = renderQuestionnaire();

        // let renderSelectionClassName = classNames({
        //     'show react-container': renderSelectionDiv, 
        //     'hide': !renderSelectionDiv 
        // });

        let renderPreviewClassName = classNames({
            'show react-container': renderPreviewDiv, 
            'hide': !renderPreviewDiv || renderPreviewDiv == null 
        });

        let renderQuestionnaireClassName = classNames({
            'show react-container': renderQuestionnaireDiv, 
            'hide': !renderQuestionnaireDiv || renderQuestionnaireDiv == null 
        });

		return (
			<div className="questionnaire-creator-container">
				<Card className="react-container">
					<h2 className="container-title"> Selection </h2>
					{ 
						renderSelection()
					}
				</Card>
				<Card className={ renderQuestionnaireClassName }>
					<h2 className="container-title"> Questionnaire </h2>
					{ 
						renderQuestionnaire()
					}
                    <div className="submit-container">

                        <Button 
                                variant="contained" 
                                size="large" 
                                onClick={() => this.createShareOptions()}
                                fullWidth
                                color="primary">

                            Share 

                            <ShareIcon />
                        </Button>
                    </div>
				</Card>
                <AppSnackBar />
			</div>
		);
	};
}

export default QuestionnaireCreator;