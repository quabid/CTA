import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

export const hashPassword = (password, done) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) {
				return done(err, null);
			}
			return done(null, hash);
		});
	});
};

export const comparePassword = (password, hash, done) => {
	bcrypt.compare(password, hash, (err, res) => {
		if (err) {
			done(
				{
					message: err
				},
				null
			);
		} else {
			done(null, {
				result: res
			});
		}
	});
};
