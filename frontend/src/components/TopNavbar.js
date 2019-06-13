import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class MenuExampleBasic extends Component {
	state = {};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;

		console.log(!!this.props.user);

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
				{!this.props.user ? (
					<p>Please login</p>
				) : (
					<p>Welcome back {this.props.user.name}</p>
				)}
			</Menu>
		);
	}
}
