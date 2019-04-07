import React from "react";

// Components
	import AppSnackBar from './app.snackbar';

const Util = {

	createSnackBar: function( snackBarConfig ) {
		var msg 		= snackBarConfig.msg,
			actionBtn 	= snackBarConfig.actionBtn,
			duration 	= parseInt( snackBarConfig.duration ) || 5000;

		return (
		    <AppSnackBar 
		        msg={ msg }
		        actionBtn={ actionBtn }
		        duration={ duration } />
		);
	}


};

export default Util;
