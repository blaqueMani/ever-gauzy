import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService, IEnvironment } from '@leano/config';
import passport from 'passport';
import { IApiServerOptions } from '@leano/common';

@Injectable()
export class FiverrStrategy extends PassportStrategy(Strategy, 'fiverr') {
	constructor(private readonly configService: ConfigService) {
		super(config(configService));
	}

	async validate(profile, done: Function) {
		passport['_strategies'].session.role_name = '';
		try {
			try {
				const { emails } = profile;
				const user = {
					emails
				};
				done(null, user);
			} catch (err) {
				done(err, false);
			}
		} catch (err) {
			done(err, false);
		}
	}
}

export const config = (configService: ConfigService) => {
	const FIVERR_CONFIG = configService.get(
		'fiverrConfig'
	) as IEnvironment['fiverrConfig'];
	const { baseUrl } = configService.apiConfigOptions as IApiServerOptions;

	return {
		clientID: FIVERR_CONFIG.clientId || 'disabled',
		clientSecret: FIVERR_CONFIG.clientSecret || 'disabled',
		callbackURL: `${baseUrl}/api/auth/fiverr/callback`,
		passReqToCallback: true
	};
};
