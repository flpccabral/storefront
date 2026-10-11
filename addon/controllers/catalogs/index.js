import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CatalogsIndexController extends Controller {
    @service store;
    @service intl;
    @service storefront;
    @service modalsManager;
    @service notifications;
    @service crud;
    @service hostRouter;
    queryParams = ['query'];

    @tracked query;
    @tracked statuses = ['draft', 'published'];

    get statusOptions() {
        return this.statuses.map((value) => ({ value, label: this.intl.t(`storefront.catalog-list.statuses.${value}`) }));
    }

    @action createCatalog() {
        const catalog = this.store.createRecord('catalog', {
            store_uuid: this.storefront.activeStore.id,
            status: 'draft',
        });

        return this.editCatalog(catalog, {
            title: this.intl.t('storefront.catalog-list.new-catalog'),
            acceptButtonText: this.intl.t('storefront.catalog-list.confirm'),
            acceptButtonIcon: 'check',
            confirm: async (modal) => {
                modal.startLoading();

                try {
                    await catalog.save();
                    this.hostRouter.refresh();
                    this.notifications.success(this.intl.t('storefront.catalog-list.created'));
                } catch (error) {
                    this.notifications.serverError(error);
                } finally {
                    modal.stopLoading();
                }
            },
        });
    }

    @action editCatalog(catalog, modalOptions = {}) {
        const allProducts = this.store.query('product', { limit: -1 });

        this.modalsManager.show('modals/create-catalog', {
            title: this.intl.t('storefront.catalog-list.edit-catalog'),
            acceptButtonText: this.intl.t('storefront.catalog-list.save-changes'),
            acceptButtonIcon: 'save',
            statusOptions: this.statusOptions,
            catalog,
            allProducts,
            selectedProducts: [],
            toggleCategory: (category) => {
                category.set('expanded', !category.get('expanded'));
            },
            finishAddingProducts: (category) => {
                category.setProperties({
                    adding_products: false,
                });
            },
            confirmSelectedProducts: (category, products) => {
                category.setProperties({
                    products,
                });
            },
            removeProduct: (category, product) => {
                const products = category.get('products').filter((p) => p.id !== product.id);
                category.set('products', products);
            },
            addProducts: (category) => {
                category.setProperties({
                    expanded: true,
                    adding_products: true,
                });
            },
            createCategory: () => {
                const name = prompt(this.intl.t('storefront.catalog-list.enter-category-name'));
                const category = this.store.createRecord('catalog-category', { name });
                catalog.categories.pushObject(category);
            },
            editCategory: (category) => {
                const name = prompt(this.intl.t('storefront.catalog-list.change-category-name'), category.name);
                category.set('name', name);
            },
            deleteCategory: async (category) => {
                const confirmed = confirm(this.intl.t('storefront.catalog-list.delete-category-confirm'));
                if (confirmed) {
                    category.set('deleting', true);

                    try {
                        await category.destroyRecord();
                    } catch (error) {
                        this.notifications.serverError(error);
                    }
                }
            },
            confirm: async (modal) => {
                modal.startLoading();

                try {
                    await catalog.save();
                    this.hostRouter.refresh();
                    this.notifications.success(this.intl.t('storefront.catalog-list.saved'));
                } catch (error) {
                    this.notifications.serverError(error);
                } finally {
                    modal.stopLoading();
                }
            },
            ...modalOptions,
        });
    }

    @action deleteCatalog(catalog) {
        this.crud.delete(catalog, {
            onSuccess: () => {
                return this.hostRouter.refresh();
            },
        });
    }
}
