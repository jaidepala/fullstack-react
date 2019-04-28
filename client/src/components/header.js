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
// import ArrowBackIcon 	from "@material-ui/icons/ArrowBack";

// MODULES
    import Home 		from "../modules/home";
    import About 		from "../modules/about";
    import CreateForm 	from "../modules/create-form";
    import GetForm 		from "../modules/get-form";
    import QuestionnaireCreator 		from "../modules/questionnaire-creator";

class Header extends React.Component {

	constructor( props ) {

		super(props);

		this.state = {
			classes: props,
			top: false,
			title: 'My App',
			left: false,
			bottom: false,
			right: false,
		};
	};

	// changeTitle( title = 'My App' ) {

	// 	console.log('title', title);

	// 	this.setState({
	// 		title: title
	// 	});
	// };

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		});
	};

	render(props) {

		const { title } = this.state;

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
		    		<Link className="menu-link" to="/create-questionnaire">
			        	<ListItem button style={{"textDecoration": "none"}}>
				          		<ListItemText primary="Create Questions" />
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
		// <ArrowBackIcon />

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
							{ title }
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
	                <Route path="/form/:formid" component={GetForm} />
	                <Route path="/create-form" component={CreateForm} />
	                <Route path="/create-questionnaire" component={QuestionnaireCreator} />
				</div>
			</Router>
		);
	};

}

export default Header;

