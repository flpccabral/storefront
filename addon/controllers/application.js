import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
    @service storefront;
    @service hostRouter;
    @service loader;
    @service fetch;
    @service intl;
    @service abilities;
    @service store;
    @alias('storefront.activeStore') activeStore;
    @tracked productCategories = [];
    categoryLoadStoreUuid;

    get navigationItems() {
        const hasActiveStore = Boolean(this.activeStore?.id);

        return [
            {
                label: this.intl.t('storefront.sidebar.dashboard'),
                description: this.intl.t('storefront.sidebar.dashboard-description'),
                icon: 'home',
                route: 'console.storefront.home',
                keywords: ['dashboard', 'overview', 'metrics', 'sales'],
            },
            {
                label: this.intl.t('storefront.sidebar.products'),
                description: this.intl.t('storefront.sidebar.products-description'),
                icon: 'box',
                permission: 'storefront list product',
                visible: this.can('storefront see product'),
                disabled: !hasActiveStore,
                children: [
                    {
                        label: this.intl.t('storefront.sidebar.all-products'),
                        description: this.intl.t('storefront.sidebar.all-products-description'),
                        icon: 'box',
                        route: 'console.storefront.products.index.index',
                        keywords: ['inventory', 'items', 'sku', 'create product', 'add product'],
                    },
                    ...this.productCategoryItems,
                ],
            },
            {
                label: this.intl.t('storefront.sidebar.catalogs'),
                description: this.intl.t('storefront.sidebar.catalogs-description'),
                icon: 'book-open',
                route: 'console.storefront.catalogs',
                permission: 'storefront list catalog',
                visible: this.can('storefront see catalog'),
                disabled: !hasActiveStore,
                keywords: ['menus', 'catalogs', 'published catalog'],
            },
            {
                label: this.intl.t('storefront.sidebar.customers'),
                description: this.intl.t('storefront.sidebar.customers-description'),
                icon: 'users',
                route: 'console.storefront.customers',
                permission: 'storefront list user',
                visible: this.can('storefront see user'),
                disabled: !hasActiveStore,
                keywords: ['contacts', 'buyers', 'users'],
            },
            {
                label: this.intl.t('storefront.sidebar.orders'),
                description: this.intl.t('storefront.sidebar.orders-description'),
                icon: 'file-invoice-dollar',
                route: 'console.storefront.orders',
                permission: 'storefront list order',
                visible: this.can('storefront see order'),
                disabled: !hasActiveStore,
                keywords: ['fulfillment', 'deliveries', 'checkout orders'],
            },
            {
                label: this.intl.t('storefront.sidebar.networks'),
                description: this.intl.t('storefront.sidebar.networks-description'),
                icon: 'network-wired',
                route: 'console.storefront.networks',
                permission: 'storefront list network',
                visible: this.can('storefront see network'),
                disabled: !hasActiveStore,
                keywords: ['marketplace', 'network stores', 'partners'],
            },
            {
                label: this.intl.t('storefront.sidebar.food-trucks'),
                description: this.intl.t('storefront.sidebar.food-trucks-description'),
                icon: 'truck',
                route: 'console.storefront.food-trucks',
                permission: 'storefront list food-truck',
                visible: this.can('storefront see food-truck'),
                disabled: !hasActiveStore,
                keywords: ['vehicles', 'mobile store', 'truck'],
            },
            {
                label: this.intl.t('storefront.sidebar.promotions'),
                description: this.intl.t('storefront.sidebar.promotions-description'),
                icon: 'bullhorn',
                permission: 'storefront view promotions',
                visible: this.can('storefront see promotions'),
                disabled: !hasActiveStore,
                children: [
                    {
                        label: this.intl.t('storefront.promotions.list.tab-title'),
                        description: this.intl.t('storefront.sidebar.promotions-list-description'),
                        icon: 'tags',
                        route: 'console.storefront.promotions.index',
                        keywords: ['discounts', 'coupons', 'promo codes', 'sales', 'deals'],
                    },
                    {
                        label: this.intl.t('storefront.promotions.campaigns.tab-title'),
                        description: this.intl.t('storefront.sidebar.campaigns-description'),
                        icon: 'bullhorn',
                        route: 'console.storefront.promotions.campaigns',
                        keywords: ['marketing', 'broadcast', 'notifications'],
                    },
                    {
                        label: this.intl.t('storefront.promotions.segments.tab-title'),
                        description: this.intl.t('storefront.sidebar.segments-description'),
                        icon: 'users',
                        route: 'console.storefront.promotions.segments',
                        keywords: ['audience', 'customers', 'targeting'],
                    },
                    {
                        label: this.intl.t('storefront.sidebar.push-notifications'),
                        description: this.intl.t('storefront.sidebar.push-notifications-description'),
                        icon: 'bell',
                        route: 'console.storefront.promotions.push-notifications',
                        keywords: ['marketing', 'broadcast', 'campaigns'],
                    },
                ],
            },
            {
                label: this.intl.t('storefront.sidebar.settings'),
                description: this.intl.t('storefront.sidebar.settings-description'),
                icon: 'cogs',
                permission: 'storefront view settings',
                visible: this.can('storefront see settings'),
                disabled: !hasActiveStore,
                children: [
                    {
                        label: this.intl.t('storefront.common.general'),
                        description: this.intl.t('storefront.sidebar.general-description'),
                        icon: 'cog',
                        route: 'console.storefront.settings.index',
                        keywords: ['settings', 'general'],
                    },
                    {
                        label: this.intl.t('storefront.common.location'),
                        description: this.intl.t('storefront.sidebar.location-description'),
                        icon: 'map-marker-alt',
                        route: 'console.storefront.settings.locations',
                        keywords: ['locations', 'places', 'pickup'],
                    },
                    {
                        label: this.intl.t('storefront.common.gateways'),
                        description: this.intl.t('storefront.sidebar.gateways-description'),
                        icon: 'cash-register',
                        route: 'console.storefront.settings.gateways',
                        keywords: ['payments', 'stripe', 'qpay', 'checkout'],
                    },
                    {
                        label: this.intl.t('storefront.common.api'),
                        description: this.intl.t('storefront.sidebar.api-description'),
                        icon: 'code',
                        route: 'console.storefront.settings.api',
                        keywords: ['api', 'developer'],
                    },
                    {
                        label: this.intl.t('storefront.common.notification'),
                        description: this.intl.t('storefront.sidebar.notification-description'),
                        icon: 'bell-concierge',
                        route: 'console.storefront.settings.notifications',
                        keywords: ['push notifications', 'apn', 'fcm'],
                    },
                ],
            },
            {
                label: this.intl.t('storefront.sidebar.launch-app'),
                description: this.intl.t('storefront.sidebar.launch-app-description'),
                icon: 'rocket',
                url: 'https://github.com/fleetbase/storefront-app',
                target: '_github',
                keywords: ['launch app', 'storefront app', 'github'],
            },
        ];
    }

    get activeStoreUuid() {
        return this.activeStore?.id;
    }

    get productCategoryItems() {
        return this.productCategories
            .filter((category) => category?.slug)
            .map((category) => {
                const description = category.description || category.slug;
                const route = 'console.storefront.products.index.category';

                return {
                    id: `product-category:${category.id ?? category.slug}`,
                    label: category.name,
                    description,
                    icon: 'folder',
                    // Route-only matching cannot distinguish categories sharing a dynamic route.
                    activeWhen: () => this.hostRouter.isActive(route, category.slug),
                    onClick: () => this.hostRouter.transitionTo(route, category.slug),
                    keywords: ['category', 'collection', category.slug, category.name, description].filter(Boolean),
                };
            });
    }

    can(permission) {
        try {
            return this.abilities.can(permission);
        } catch (_) {
            return true;
        }
    }

    async loadProductCategories(storeUuid = this.activeStoreUuid) {
        const ownerUuid = storeUuid;
        this.categoryLoadStoreUuid = ownerUuid;

        if (!ownerUuid) {
            this.productCategories = [];
            return [];
        }

        try {
            const categories = await this.store.query('category', {
                for: 'storefront_product',
                owner_uuid: ownerUuid,
                limit: -1,
            });

            if (this.categoryLoadStoreUuid !== ownerUuid) {
                return this.productCategories;
            }

            this.productCategories = categories?.toArray?.() ?? Array.from(categories ?? []);
            return this.productCategories;
        } catch (_) {
            if (this.categoryLoadStoreUuid !== ownerUuid) {
                return this.productCategories;
            }

            this.productCategories = [];
            return [];
        }
    }

    @action createNewStorefront() {
        return this.storefront.createNewStorefront({
            onSuccess: () => {
                const loader = this.loader.show({ loadingMessage: this.intl.t('storefront.sidebar.switching-to-new-store') });

                this.hostRouter.refresh().then(() => {
                    this.notifyPropertyChange('activeStore');
                    this.loadProductCategories(this.activeStoreUuid);
                    this.loader.removeLoader(loader);
                });
            },
        });
    }

    @action switchActiveStore(store) {
        const loader = this.loader.show({ loadingMessage: `Switching Storefront to ${store.name}...` });
        this.storefront.setActiveStorefront(store);
        this.productCategories = [];
        return this.hostRouter
            .refresh()
            .then(() => {
                this.notifyPropertyChange('activeStore');
                return this.loadProductCategories(store.id);
            })
            .finally(() => {
                this.loader.removeLoader(loader);
            });
    }

    @action
    async searchNavigation({ query, limit = 12 }) {
        const trimmedQuery = query?.trim();

        if (!trimmedQuery || !this.activeStore?.public_id) {
            return [];
        }

        try {
            const response = await this.fetch.get(
                'search',
                {
                    query: trimmedQuery,
                    limit,
                    storefront: this.activeStore.public_id,
                },
                { namespace: 'storefront/int/v1' }
            );

            return response.results ?? [];
        } catch (_) {
            return [];
        }
    }
}
