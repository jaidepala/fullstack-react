// REF:
// https://material-ui.com/demos/drawers/

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Drawer 		from "@material-ui/core/Drawer";
import AppBar 		from "@material-ui/core/AppBar";
import Toolbar 		from "@material-ui/core/Toolbar";
import Typography 	from "@material-ui/core/Typography";
import Button 		from "@material-ui/core/Button";
import List 		from "@material-ui/core/List";
import Divider 		from "@material-ui/core/Divider";
import ListItem 	from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton 	from '@material-ui/core/IconButton';
import MenuIcon 	from "@material-ui/icons/Menu";

const styles = {
	list: {
    	width: 250,
  	},
	fullList: {
    	width: 'auto',
  	},
  	root: {
    	flexGrow: 1,
  	},
  	grow: {
    	flexGrow: 1,
  	},
  	menuButton: {
    	marginLeft: -12,
    	marginRight: 20,
  	}
};

class Header extends React.Component {

	constructor( props ) {

		super(props);

		this.state = {
			classes: props,
			top: false,
			left: false,
			bottom: false,
			right: false,
		};
	};

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		});
	};

	render(props) {

		const sideList = (
		  	<div>
		  		<Router>
			    	<List>
				      	{['Home', 'Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
		      				<Link to="/" key={text}>
					        	<ListItem button>
						          		<ListItemText primary={text} />
					        	</ListItem>
			        		</Link>
				      	))}
			    	</List>
				    <Divider />
				    <List>
				      	{['All mail', 'Trash', 'Spam'].map((text, index) => (
				        	<ListItem button key={text}>
				          		<ListItemText primary={text} />
				        	</ListItem>
				      	))}
				    </List>
			    </Router>
		  	</div>
		);

		return (
			<div className={this.state.classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton 
							color="inherit" 
							className={this.state.classes.menuButton}
							onClick={this.toggleDrawer('left', true)}
							aria-label="Menu">
							
							<MenuIcon />
						</IconButton>
						<Typography 
							variant="h6" 
							className={this.state.classes.grow}
							color="inherit">
							My App
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('left', false)}
						onKeyDown={this.toggleDrawer('left', false)}>

						{ sideList }
					</div>
				</Drawer>
			</div>
		);
	};

}

export default Header;

