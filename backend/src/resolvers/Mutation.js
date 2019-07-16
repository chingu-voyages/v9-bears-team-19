const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Query = require("./Query.js");
const { gql } = require("apollo-server");

const Mutation = {
	async createUser(parent, args, ctx, info) {
		let secret = await new Promise((res, rej) => {
			bcrypt.hash(args.password, 10, (err, hash) => {
				if (err) {
					rej(err.message);
				}
				res(hash);
			});
		});
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password: secret,
					permissions: {
						set: ["USER"]
					}
				}
			},
			info
		);
		const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		ctx.res.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		return user;
	},
	async loginUser(parent, { email, password }, ctx, info) {
		// check user
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) {
			throw new Error("No such user found for email ${email}");
		}
		// check password
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			throw new Error("Incorrect Login Details");
		}
		// generate JWT
		const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		// set cookie with token
		ctx.res.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		return user;
	},
	async logoutUser(parent, args, ctx, info) {
		ctx.res.clearCookie("token");
		return { message: "Logged Out" };
	},
	async createActivity(parent, args, ctx, info) {
		if (!ctx.userId) {
			throw new Error({ message: "You must be logged in to do this" });
		}
		const newActivity = await ctx.db.mutation.createActivity({
			data: {
				...args,
				user: {
					connect: {
						id: ctx.userId
					}
				}
			}
		});
		return newActivity;
	},
	async deleteActivity(parent, { id }, ctx, info) {
		const foundActivity = await ctx.db.query.activity(
			{
				where: {
					id
				}
			},
			`id name user {id }`
		);
	},
	async createClub(parent, args, ctx, info) {
		// automatically attach logged in user as admin for that club
		const newClub = await ctx.db.mutation.createClub({
			data: {
				...args,
				adminUser: {
					connect: {
						id: ctx.userId
					}
				}
			}
		});
		return newClub;
	}
};

module.exports = Mutation;
