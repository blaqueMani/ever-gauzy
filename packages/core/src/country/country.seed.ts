import { Connection } from 'typeorm';
import { Country } from './country.entity';
import { ICountry } from '@leano/contracts';
import { DEFAULT_COUNTRIES } from './default-countries';

export const createCountries = async (
	connection: Connection
): Promise<ICountry[]> => {
	return await new Promise<ICountry[]>(async (resolve, reject) => {
		try {
			const countries: ICountry[] = [];
			const entries = DEFAULT_COUNTRIES;
			for (const key of Object.keys(entries)) {
				if (entries.hasOwnProperty(key)) {
					const country: ICountry = {
						isoCode: key,
						country: entries[key]
					};
					countries.push(country);
				}
			}
			await insertCountry(connection, countries);
			resolve(countries);
		} catch (err) {
			console.log('Error parsing country:', err);
			reject(null);
			return;
		}
	});
};

const insertCountry = async (
	connection: Connection,
	countries: ICountry[]
): Promise<void> => {
	await connection
		.createQueryBuilder()
		.insert()
		.into(Country)
		.values(countries)
		.execute();
};
