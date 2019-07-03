const { forwardTo } = require("prisma-binding");

const Query = {
	users: forwardTo("db"),
	currentUser(parent, args, ctx, info) {
		console.log(ctx);
		if (!ctx.userId) {
			return null;
		}
		const user = ctx.db.query.user(
			{
				where: {
					id: ctx.userId
				}
			},
			info
		);
		return user;
	},
	activities: forwardTo("db"),
	dataUnits: forwardTo("db"),
	activity(parent, args, ctx, info) {
		return ctx.db.query.activity({
			where: {
				id: args.activityType
			}
		});
	},
	sessions(parent, args, ctx, info) {
		if (!ctx.userId) {
			throw new Error("You must be logged in to do this");
		}
		return ctx.db.query.sessions({
			where: {
				user: {
					id: ctx.userId
				}
			}
		});
	}
};

module.exports = Query;
