// REF:
// Drawers Ref
// 		https://material-ui.com/demos/drawers/
// Routers Ref
// 		https://stackoverflow.com/questions/41474134/nested-routes-with-react-router-v4
// 		https://reacttraining.com/react-router/

import React from "react";
// import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Drawer 		from "@material-ui/core/Drawer";
import AppBar 		from "@material-ui/core/AppBar";
import Toolbar 		from "@material-ui/core/Toolbar";
import Typography 	from "@material-ui/core/Typography";
// import Button 		from "@material-ui/core/Button";
import List 		from "@material-ui/core/List";
import Divider 		from "@material-ui/core/Divider";
import ListItem 	from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton 	from '@material-ui/core/IconButton';
import MenuIcon 	from "@material-ui/icons/Menu";

// MODULES
    import Home 		from "../modules/home";
    import About 		from "../modules/about";
    import CreateForm 	from "../modules/create-form";

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
	  	// {['Home', 'Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
			// 	<Link to="/" key={text}>
	      //   	<ListItem button style="text-decoration: none;">
		     //      		<ListItemText primary={text} />
	      //   	</ListItem>
	// 		</Link>
	  	// ))}

		const sideList = (
		  	<div>
		    	<List>
		    		<Link className="menu-link" to="/">
			        	<ListItem button style={{"textDecoration": "none"}}>
				          		<ListItemText primary="Home" />
			        	</ListItem>
		    		</Link>
		    		<Link className="menu-link" to="/about">
			        	<ListItem button style={{"textDecoration": "none"}}>
				          		<ListItemText primary="About" />
			        	</ListItem>
		    		</Link>
		    		<Link className="menu-link" to="/create-form">
			        	<ListItem button style={{"textDecoration": "none"}}>
				          		<ListItemText primary="Create Form" />
			        	</ListItem>
		    		</Link>
		    	</List>
			    <Divider />
			    <List>
			      	{['All mail', 'Trash', 'Spam'].map((text, index) => (
			        	<ListItem button key={text}>
			        		<Link to={"/" + text}>
			          			<ListItemText primary={text} />
			        		</Link>
			        	</ListItem>
			      	))}
			    </List>
		  	</div>
		);

		return (
			<Router className={this.state.classes.root}>
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
				<div className="app-container">
	                
	                <Route exact path="/" component={Home} />
	                <Route path="/about" component={About} />
	                <Route path="/create-form" component={CreateForm} />
				</div>
			</Router>
		);
	};

}

export default Header;

