import React from "react";
// REF:
// https://www.npmjs.com/package/uuid-random	
import uuid from 'uuid-random';

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
import { withStyles } from '@material-ui/core/styles';

// Components 
    
    import AppSnackBar, { openSnackbar } from '../components/app.snackbar';
    // import Util from '../components/util';

class QuestionnaireCreator extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {

			question: {

				type: '',
                label: '',
				question: '',
				helper: '',
				placeholder: '',
				optionName: '',
				optionValue: '',
				options: [],
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
				}]
			},

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
		this.returnOptionName 		= this.returnOptionName.bind(this);
       
        // console.log('styles', styles);
	};

    returnFormRender( formObj, preview? ) {

    	// formObj
    	// will have 
    	// label, value

    	let { label, type, placeholder, helper, options, value, question, optionValue } = formObj;

        if( !question || question == null ) {
            return false;
        }

    	const thisUuid = uuid();
        const newUuid = uuid();

        if( type === 'input' )
        {
            return (
                <div className="demo-input-container">
                    <TextField
                        label={ label }
                        placeholder={ placeholder } 
                        onChange={( evt ) => { 
                                formObj.optionValue = evt.target.value 
                            }
                        }
                        helperText={ helper } 
                        fullWidth
                        variant="filled" />
                </div>
            );
        }
        else if( type === 'select' )
        {
            return (
                <div className="demo-select-container">
                    <InputLabel htmlFor={thisUuid}>
                        { label } 
                    </InputLabel>
                    <Select 
                        fullWidth
                        value={ formObj.optionValue || "" }
                        onChange={(evt) => {
                                // formObj.optionValue = evt.target.value;

                                if( preview && preview != null )
                                {
                                    // let previwl
                                    // console.log('previw', preview);

                                    this.setState({
                                        question: {
                                            ...this.state.question,
                                            preview: preview.map( (thisPreviewQuestion) => {
                                                if(thisPreviewQuestion.uuid == formObj.uuid) {

                                                    thisPreviewQuestion.optionValue = evt.target.value;
                                                }

                                                return thisPreviewQuestion;
                                            })
                                        }
                                    });
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

                                // console.log('optionValue', formObj, optionValue);
                            }
                        }
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
        else if( type === 'textarea' )
        {
            return (
                <div className="demo-select-container">
                    <TextField
                        label={ label }
                        onChange={( evt ) => { 
                                formObj.optionValue = evt.target.value 
                            }
                        }
                        placeholder={ placeholder } 
                        helperText={ helper } 
                        fullWidth
                        multiline
                        variant="filled" />
                </div>
            );
        }
        else if( type === 'checkbox' || type === 'radio' )
        {
            return (
                <div className={{
                    'demo-checkbox-container': type === 'checkbox',
                    'demo-radio-container': type === 'radio'
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

                                        ( type === 'checkbox' ) ?
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
					                        onChange={( evt ) => { 
                                                    formObj.optionValue = evt.target.value 
                                                }
                                            } />
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
    };

    resetForm() {

        this.setState({

            question: {
                ...this.state.question,
                type: '',
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

    	const { typeOfForm, helper, placeholder, type } = this.state.question;

    	return (
    		<div className="selection-container">
    			<FormControl fullWidth margin="normal">
	                <InputLabel htmlFor="question-type">
	                    Select Question Type
	                </InputLabel>
	                <Select 
	                	value={ this.state.question.type }
	                    onChange={evt => this.setState({
	                    		question: {
			                    	...this.state.question, 
			                    	type: evt.target.value 
		                    	}
	                    	})
	                	}
	                    input={<Input name="question-type" id="question-type" value="" />}>
	                    
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
    				( type === 'select' || type === 'checkbox' || type === 'radio' ) ? 
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

		if( !preview || preview.length == 0 )
			return;

        // const { classes } = this.props;

		return (
            <div className="questionnaire-preview-container">
                {
                    preview.map(( thisPreviewQuestion, thisPreviewQuestionIndex ) => {

                            let previewAnswer = thisPreviewQuestion.optionValue;

                            let showValue = classNames({ 
                                'hide': !previewAnswer, 
                                'show': previewAnswer  
                            });

                            thisPreviewQuestion.uuid = uuid();

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
                
                <div className="submit-container">

                    <Button 
                            variant="contained" 
                            size="large" 
                        	onClick={() => this.addQuestion()}
                            fullWidth
                            color="primary">

                        Save
                    </Button>
                </div>
			</div>
		);
	};

	render() {

		const { renderSelection, renderPreview, renderQuestionnaire } = this;
		
		const renderSelectionDiv = renderSelection(), 
				renderPreviewDiv = renderPreview(), 
				renderQuestionnaireDiv = renderQuestionnaire();

        let renderSelectionClassName = classNames({
            'show react-container': renderSelectionDiv, 
            'hide': !renderSelectionDiv 
        });

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
				<Card className={ renderPreviewClassName }>
					<h2 className="container-title"> Preview </h2>
					{ 
						renderPreview()
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