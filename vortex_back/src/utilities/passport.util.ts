import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../models/user/user.model';
import { compare } from 'bcrypt';

export function initializePassport() {
  passport.use(
    new Strategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
      try {
        const result = await User.searchUserByEmail(email);

        if (result.rows.length > 0) {
          const user = User.fromJson(result.rows[0]);

          if (await compare(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
}
