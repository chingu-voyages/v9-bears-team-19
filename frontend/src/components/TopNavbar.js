import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class MenuExampleBasic extends Component {
	state = {};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;

		console.log(this.props.user);

		return (
			<Menu>
				<Menu.Item
					name="editorials"
					active={activeItem === "editorials"}
					onClick={this.handleItemClick}
				>
					Editorials
				</Menu.Item>

				<Menu.Item
					name="reviews"
					active={activeItem === "reviews"}
					onClick={this.handleItemClick}
				>
					Reviews
				</Menu.Item>

				<Menu.Item
					name="upcomingEvents"
					active={activeItem === "upcomingEvents"}
					onClick={this.handleItemClick}
				>
					Upcoming Events
				</Menu.Item>
				{/* this should be displaying the welcome back but it is not; it is, instead, displaying the Please Login */}
				{/* when the component renders initially this.props.user is undefined but then it comes back with the user */}
				{/* details but does not rerender the component to mirror that (as far as I can see), this may be a lifecycle thing */}
				{!this.props.user ? <p>Welcome back</p> : <p>Please login</p>}
			</Menu>
		);
	}
}
