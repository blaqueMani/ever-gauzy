import { Connection } from 'typeorm';
import { IOrganization, IProductVariantSetting, ITenant } from '@leano/contracts';
import { ProductVariantSetting } from './product-setting.entity';
import * as faker from 'faker';
import { ProductCategory } from '../product-category/product-category.entity';
import { Product } from '../product/product.entity';
import { ProductVariant } from '../product-variant/product-variant.entity';

export const createRandomProductVariantSettings = async (
	connection: Connection,
	tenants: ITenant[],
	tenantOrganizationsMap: Map<ITenant, IOrganization[]>
): Promise<IProductVariantSetting[]> => {
	if (!tenantOrganizationsMap) {
		console.warn(
			'Warning: tenantOrganizationsMap not found, Product Options  will not be created'
		);
		return;
	}
	const productVariantSettings: IProductVariantSetting[] = [];

	for (const tenant of tenants) {
		const tenantOrgs = tenantOrganizationsMap.get(tenant);
		for (const tenantOrg of tenantOrgs) {
			const productCategories = await connection.manager.find(
				ProductCategory,
				{
					where: [{ organization: tenantOrg }]
				}
			);
			for (const productCategory of productCategories) {
				const products = await connection.manager.find(Product, {
					where: [{ productCategory: productCategory }]
				});
				for (const product of products) {
					const productVariants = await connection.manager.find(
						ProductVariant,
						{
							where: [{ productId: product.id }]
						}
					);
					for (const productVariant of productVariants) {
						const productVariantSetting = new ProductVariantSetting();
						productVariantSetting.productVariant = productVariant;
						productVariantSetting.isSubscription = faker.datatype.boolean();
						productVariantSetting.isPurchaseAutomatically = faker.datatype.boolean();
						productVariantSetting.canBeSold = faker.datatype.boolean();
						productVariantSetting.canBePurchased = faker.datatype.boolean();
						productVariantSetting.canBeCharged = faker.datatype.boolean();
						productVariantSetting.canBeRented = faker.datatype.boolean();
						productVariantSetting.isEquipment = faker.datatype.boolean();
						productVariantSetting.trackInventory = faker.datatype.boolean();
						productVariantSetting.tenant = tenant;
						productVariantSetting.organization = tenantOrg;

						productVariantSettings.push(productVariantSetting);
					}
				}
			}
		}
	}

	await connection.manager.save(productVariantSettings);
};
