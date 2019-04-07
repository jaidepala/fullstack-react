// REF:
// https://material-ui.com/demos/snackbars/
import React from "react";

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class AppSnackBar extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {

			open: false,
			msg: props.msg,
			actionBtn: props.actionBtn,
			duration: parseInt(props.duration) || 5000
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
	};

	componentDidMount() {

		this.handleClick();
	};

	handleClick = () => {
		
		this.setState({ 
			open: true
		});
	};

	handleClose = (event, reason) => {
		
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ 
			open: false
		});
	};

	render() {

		return (
			<div className="snackbar-container">
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={ this.state.open }
					autoHideDuration={ this.state.duration }
					onClose={ this.handleClose }
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id="message-id">
						{ this.state.msg }
					</span>}
					action={[
						<Button 
								key="undo" 
								color="secondary" 
								size="small" 
								onClick={ this.handleClose }>
					  			
					  			{ this.state.actionBtn }
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

export default AppSnackBar;
