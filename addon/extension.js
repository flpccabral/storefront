import { Widget, ExtensionComponent } from '@fleetbase/ember-core/contracts';

/**
 * Header menu items and widgets are registered with translation keys, which
 * ember-ui's `translate-label` translates when they render. Consoles running an
 * ember-ui without that helper render the value as-is, so translate up front.
 */
function labelResolver(app) {
    if (app.factoryFor('helper:translate-label')) {
        return (key) => key;
    }

    const intl = app.lookup('service:intl');
    return (key) => intl.t(key);
}

function createStorefrontKeyMetricsWidget(label) {
    return new Widget({
        id: 'storefront-key-metrics-widget',
        name: label('storefront.extension.widgets.key-metrics.name'),
        description: label('storefront.extension.widgets.key-metrics.description'),
        icon: 'store',
        component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/storefront-key-metrics'),
        grid_options: { w: 12, h: 7, minW: 8, minH: 7 },
        options: { title: 'Storefront Metrics' },
        category: 'Legacy',
        default: false,
    });
}

export function registerWidgets(widgetService, label = (key) => key) {
    widgetService.registerDashboard('storefront');

    widgetService.registerWidgets('storefront', [
        new Widget({
            id: 'storefront-kpi-revenue-widget',
            name: label('storefront.extension.widgets.kpi-revenue.name'),
            description: label('storefront.extension.widgets.kpi-revenue.description'),
            icon: 'sack-dollar',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/kpi-revenue'),
            grid_options: { w: 3, h: 4, minW: 3, minH: 4 },
            category: 'KPI Tiles',
            default: true,
        }),
        new Widget({
            id: 'storefront-kpi-orders-widget',
            name: label('storefront.extension.widgets.kpi-orders.name'),
            description: label('storefront.extension.widgets.kpi-orders.description'),
            icon: 'bag-shopping',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/kpi-orders'),
            grid_options: { w: 3, h: 4, minW: 3, minH: 4 },
            category: 'KPI Tiles',
            default: true,
        }),
        new Widget({
            id: 'storefront-kpi-aov-widget',
            name: label('storefront.extension.widgets.kpi-aov.name'),
            description: label('storefront.extension.widgets.kpi-aov.description'),
            icon: 'receipt',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/kpi-aov'),
            grid_options: { w: 3, h: 4, minW: 3, minH: 4 },
            category: 'KPI Tiles',
            default: true,
        }),
        new Widget({
            id: 'storefront-kpi-active-orders-widget',
            name: label('storefront.extension.widgets.kpi-active-orders.name'),
            description: label('storefront.extension.widgets.kpi-active-orders.description'),
            icon: 'bolt',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/kpi-active-orders'),
            grid_options: { w: 3, h: 4, minW: 3, minH: 4 },
            category: 'KPI Tiles',
            default: true,
        }),
        new Widget({
            id: 'storefront-kpi-completed-orders-widget',
            name: label('storefront.extension.widgets.kpi-completed-orders.name'),
            description: label('storefront.extension.widgets.kpi-completed-orders.description'),
            icon: 'circle-check',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/kpi-completed-orders'),
            grid_options: { w: 3, h: 4, minW: 3, minH: 4 },
            category: 'KPI Tiles',
            default: true,
        }),
        new Widget({
            id: 'storefront-kpi-customers-widget',
            name: label('storefront.extension.widgets.kpi-customers.name'),
            description: label('storefront.extension.widgets.kpi-customers.description'),
            icon: 'users',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/kpi-customers'),
            grid_options: { w: 3, h: 4, minW: 3, minH: 4 },
            category: 'KPI Tiles',
            default: true,
        }),
        new Widget({
            id: 'storefront-kpi-cart-conversion-widget',
            name: label('storefront.extension.widgets.kpi-cart-conversion.name'),
            description: label('storefront.extension.widgets.kpi-cart-conversion.description'),
            icon: 'cart-shopping',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/kpi-cart-conversion'),
            grid_options: { w: 3, h: 4, minW: 3, minH: 4 },
            category: 'KPI Tiles',
            default: true,
        }),
        new Widget({
            id: 'storefront-kpi-cancellation-rate-widget',
            name: label('storefront.extension.widgets.kpi-cancellation-rate.name'),
            description: label('storefront.extension.widgets.kpi-cancellation-rate.description'),
            icon: 'ban',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/kpi-cancellation-rate'),
            grid_options: { w: 3, h: 4, minW: 3, minH: 4 },
            category: 'KPI Tiles',
            default: true,
        }),
        new Widget({
            id: 'storefront-revenue-trend-widget',
            name: label('storefront.extension.widgets.revenue-trend.name'),
            description: label('storefront.extension.widgets.revenue-trend.description'),
            icon: 'chart-line',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/revenue-trend'),
            grid_options: { w: 6, h: 10, minW: 5, minH: 9 },
            category: 'Analytics',
            default: true,
        }),
        new Widget({
            id: 'storefront-top-products-widget',
            name: label('storefront.extension.widgets.top-products.name'),
            description: label('storefront.extension.widgets.top-products.description'),
            icon: 'ranking-star',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/top-products'),
            grid_options: { w: 6, h: 10, minW: 5, minH: 9 },
            category: 'Analytics',
            default: true,
        }),
        new Widget({
            id: 'storefront-orders-widget',
            name: label('storefront.extension.widgets.orders.name'),
            description: label('storefront.extension.widgets.orders.description'),
            icon: 'bag-shopping',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/orders'),
            grid_options: { w: 12, h: 11, minW: 8, minH: 8 },
            options: { wrapperClass: 'bordered-classic' },
            category: 'Operations',
            default: true,
        }),
        new Widget({
            id: 'storefront-customer-insights-widget',
            name: label('storefront.extension.widgets.customer-insights.name'),
            description: label('storefront.extension.widgets.customer-insights.description'),
            icon: 'chart-pie',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/customer-insights'),
            grid_options: { w: 6, h: 9, minW: 5, minH: 8 },
            category: 'Analytics',
            default: true,
        }),
        new Widget({
            id: 'storefront-orders-by-status-widget',
            name: label('storefront.extension.widgets.orders-by-status.name'),
            description: label('storefront.extension.widgets.orders-by-status.description'),
            icon: 'chart-column',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/orders-by-status'),
            grid_options: { w: 6, h: 9, minW: 5, minH: 8 },
            category: 'Analytics',
            default: true,
        }),
        new Widget({
            id: 'storefront-metrics-widget',
            name: label('storefront.extension.widgets.metrics.name'),
            description: label('storefront.extension.widgets.metrics.description'),
            icon: 'chart-line',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/storefront-metrics'),
            grid_options: { w: 12, h: 4, minW: 8, minH: 4 },
            category: 'Legacy',
            default: false,
        }),
        new Widget({
            id: 'storefront-customers-widget',
            name: label('storefront.extension.widgets.customers.name'),
            description: label('storefront.extension.widgets.customers.description'),
            icon: 'users',
            component: new ExtensionComponent('@fleetbase/storefront-engine', 'widget/customers'),
            grid_options: { w: 12, h: 11, minW: 8, minH: 8 },
            options: { wrapperClass: 'bordered-classic' },
            category: 'Operations',
            default: true,
        }),
    ]);

    widgetService.registerWidgets('dashboard', [createStorefrontKeyMetricsWidget(label)]);
}

export default {
    setupExtension(app, universe) {
        const label = labelResolver(app);
        const menuService = universe.getService('menu');
        const registryService = universe.getService('registry');
        const widgetService = universe.getService('widget');

        // Register menu item in header
        menuService.registerHeaderMenuItem('Storefront', 'console.storefront', {
            icon: 'store',
            priority: 1,
            description: label('storefront.extension.description'),
            shortcuts: [
                {
                    id: 'storefront-sc-products',
                    title: label('storefront.extension.shortcuts.products.title'),
                    description: label('storefront.extension.shortcuts.products.description'),
                    icon: 'box-open',
                    route: 'console.storefront.products',
                },
                {
                    id: 'storefront-sc-orders',
                    title: label('storefront.extension.shortcuts.orders.title'),
                    description: label('storefront.extension.shortcuts.orders.description'),
                    icon: 'bag-shopping',
                    route: 'console.storefront.orders',
                },
                {
                    id: 'storefront-sc-customers',
                    title: label('storefront.extension.shortcuts.customers.title'),
                    description: label('storefront.extension.shortcuts.customers.description'),
                    icon: 'users',
                    route: 'console.storefront.customers',
                },
                {
                    id: 'storefront-sc-networks',
                    title: label('storefront.extension.shortcuts.networks.title'),
                    description: label('storefront.extension.shortcuts.networks.description'),
                    icon: 'network-wired',
                    route: 'console.storefront.networks',
                },
                {
                    id: 'storefront-sc-catalogs',
                    title: label('storefront.extension.shortcuts.catalogs.title'),
                    description: label('storefront.extension.shortcuts.catalogs.description'),
                    icon: 'book-open',
                    route: 'console.storefront.catalogs',
                },
                {
                    id: 'storefront-sc-promotions',
                    title: label('storefront.extension.shortcuts.promotions.title'),
                    description: label('storefront.extension.shortcuts.promotions.description'),
                    icon: 'bullhorn',
                    route: 'console.storefront.promotions',
                },
            ],
        });

        registerWidgets(widgetService, label);

        // register component to views
        registryService.registerRenderableComponent('fleet-ops:component:order:details', new ExtensionComponent('@fleetbase/storefront-engine', 'storefront-order-summary'));
        registryService.registerRenderableComponent(
            'fleet-ops:template:operations:orders:new:entities-input',
            new ExtensionComponent('@fleetbase/storefront-engine', 'add-product-as-entity-button')
        );
    },
};
