import React from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Signout from "../components/Signout";

const Auth = props => {
	console.table(props);
	return (
		<div>
			<Signup />
			<Signin />
			<Signout />
		</div>
	);
};

export default Auth;
