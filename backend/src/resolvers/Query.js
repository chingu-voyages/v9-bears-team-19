const { forwardTo } = require("prisma-binding");

const Query = {
	users: forwardTo("db"),
	currentUser(parent, args, ctx, info) {
		if (!ctx.userId) {
			return null;
		}
		return ctx.db.query.user(
			{
				where: {
					id: ctx.userId
				}
			},
			info
		);
	},
	activities: forwardTo("db"),
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
