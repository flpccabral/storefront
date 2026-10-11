import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class StorefrontOrderDetailsCustomerInsightsComponent extends Component {
    @service intl;

    get customer() {
        return this.args.resource?.customer;
    }

    get orderCount() {
        return Number(this.customer?.orders ?? this.customer?.order_count ?? 0);
    }

    get hasCompleteContact() {
        return Boolean(this.customer?.phone && this.customer?.email);
    }

    get customerType() {
        if (!this.customer) {
            return null;
        }

        return this.intl.t(this.orderCount > 1 ? 'storefront.order-details.returning-customer' : 'storefront.order-details.first-time-customer');
    }

    get contactStatus() {
        if (this.hasCompleteContact) {
            return this.intl.t('storefront.order-details.contact-status.phone-and-email');
        }

        if (this.customer?.phone) {
            return this.intl.t('storefront.order-details.contact-status.phone');
        }

        if (this.customer?.email) {
            return this.intl.t('storefront.order-details.contact-status.email');
        }

        return this.intl.t('storefront.order-details.no-contact-details');
    }
}
