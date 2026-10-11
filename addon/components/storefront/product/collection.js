import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class StorefrontProductCollectionComponent extends Component {
    @service intl;

    get products() {
        return this.args.products ?? [];
    }

    get hasProducts() {
        return this.products.length > 0;
    }

    get isListView() {
        return this.args.viewMode === 'list';
    }

    get title() {
        return this.args.category ? this.intl.t('storefront.product-list.category-products', { name: this.args.category.name }) : this.intl.t('storefront.product-list.all-products');
    }
}
