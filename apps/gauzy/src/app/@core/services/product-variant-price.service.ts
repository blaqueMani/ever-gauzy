import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductVariantPrice } from '@leano/contracts';
import { firstValueFrom } from 'rxjs';
import { API_PREFIX } from '../constants/app.constants';

@Injectable()
export class ProductVariantPriceService {
	PRODUCT_VARIANT_PRICE_URL = `${API_PREFIX}/product-variant-prices`;

	constructor(private http: HttpClient) { }

	updateProductVariantPrice(
		productVariantPrice: IProductVariantPrice
	): Promise<IProductVariantPrice> {
		return firstValueFrom(
			this.http
				.put<IProductVariantPrice>(
					`${this.PRODUCT_VARIANT_PRICE_URL}/${productVariantPrice.id}`,
					productVariantPrice
				)
		);
	}
}
