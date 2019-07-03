const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Query = require("./Query.js");

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
	async createDataUnit(parent, { name, factor, standardUnit }, ctx, info) {
		const dataUnit = await ctx.db.mutation.createDataUnit({
			data: {
				name,
				factor,
				standardUnit: false
			}
		});
		return dataUnit;
	},
	async deleteDataUnit(parent, { id }, ctx, info) {
		const user = await ctx.db.query.user({
			where: {
				id: ctx.userId
			}
		});
		// todo set Admin Privelidge on this
		// todo user does not include permissions.
		if (!user) {
			throw new Error("Insufficient Privelidges");
		}
		return ctx.db.mutation.deleteDataUnit({
			where: {
				id
			}
		});
	},
	async createDataMetric(
		parent,
		{ dataName, dataUnit, stdDataUnit },
		ctx,
		info
	) {
		const metric = await ctx.db.mutation.createDataMetric({
			data: {
				dataName,
				dataUnit: {
					connect: dataUnit
				},
				stdDataUnit: {
					connect: stdDataUnit
				}
			}
		});
		return metric;
	},
	async createActivity(parent, args, ctx, info) {
		const fields = args.dataFields;
		const activity = await ctx.db.mutation.createActivity(
			{
				data: {
					...args,
					dataFields: {
						set: [...fields]
					}
				}
			},
			info
		);
		return activity;
	},
	async deleteActivity(parent, args, ctx, info) {
		const activity = await ctx.db.query.activity({ where: { id: args.id } });
		// todo add permissions
		if (!ctx.userId) {
			throw new Error("You do not have sufficient permissions to do this");
		}
		return ctx.db.mutation.deleteActivity({ where: { id: args.id } });
	},
	async createSession(parent, args, ctx, info) {
		if (!ctx.userId) {
			throw new Error("Login Required");
		}
		const user = await ctx.db.query.user({ where: { id: ctx.userId } });
		const session = await ctx.db.mutation.createSession(
			// todo pass dataValues as a json file
			{
				data: {
					...args,
					user: {
						connect: { id: ctx.userId }
					},
					activityType: {
						connect: { id: args.activityType }
					},
					dataValues: JSON.stringify(args.dataValues)
				}
			},
			info
		);
		return session;
	},
	async deleteSession(parent, args, ctx, info) {
		const session = await ctx.db.query.session({ where: { id: args.id } });
		// todo add permissions
		if (!ctx.userId) {
			throw new Error("You do not have sufficient permissions to do this");
		}
		return ctx.db.mutation.deleteSession({ where: { id: args.id } });
	}
};

module.exports = Mutation;
