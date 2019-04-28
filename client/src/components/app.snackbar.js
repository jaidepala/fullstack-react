// REF:
// https://material-ui.com/demos/snackbars/
// https://medium.freecodecamp.org/how-to-show-informational-messages-using-material-ui-in-a-react-web-app-5b108178608
import React from "react";

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

let openSnackbarFn;

class AppSnackBar extends React.Component {

	constructor( props ) {

		super( props );

		this.queue = [];

		this.state = {

			open: false,
			messageInfo: {},
			msg: props.msg,
			actionBtn: props.actionBtn,
			duration: parseInt(props.duration) || 5000
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.processQueue = this.processQueue.bind(this);
		this.handleExited = this.handleExited.bind(this);
	};

	componentDidMount() {

    	openSnackbarFn = this.handleClick;
	};

	processQueue = () => {
		
		if (this.queue.length > 0) {
			
			this.setState({
				messageInfo: this.queue.shift(),
				open: true
			});
		}
	};

	handleClick = ( snackbarConfig ) => {
		
		// let duration = snackbarConfig.duration;
		// let msg = snackbarConfig.msg;
		// let actionBtn = snackbarConfig.actionBtn;

		let { duration, msg, actionBtn } = snackbarConfig;

	    this.queue.push({
			duration: duration,
			msg: msg,
			actionBtn: actionBtn,
			key: new Date().getTime(),
	    });

	    if (this.state.open) {
	      // immediately begin dismissing current message
	      // to start showing new one
	      
	      	this.setState({ 
	  			open: false 
	      	});

	    // } else {
	      
	    }
  		
  		this.processQueue();
	};

	handleClose = (event, reason) => {
		
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ 
			open: false
		});
	};

	handleExited = () => {
		
		this.processQueue();
	};

	render() {
    	
    	const { messageInfo } = this.state;

		const message = (<span className="snackbar-message"
		    dangerouslySetInnerHTML={{ __html: messageInfo.msg}} />
		);

		return (
			<div className="snackbar-container">
				<Snackbar
          			key={ messageInfo.key }
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={ this.state.open }
					autoHideDuration={ messageInfo.duration }
					onClose={ this.handleClose }
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={ message }
					action={[
						<Button 
								key="undo" 
								color="secondary" 
								size="small" 
								onClick={ this.handleClose }>
					  			
					  			{ messageInfo.actionBtn }
						</Button>,
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={ this.handleClose }>

					  		<CloseIcon />
						</IconButton>,
					]} />
				</div>
		);
	};
};

export function openSnackbar(snackbarConfig) {

	openSnackbarFn(snackbarConfig);
}

export default AppSnackBar;
