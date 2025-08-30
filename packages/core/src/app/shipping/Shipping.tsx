<<<<<<< HEAD
import { 
    Address, 
    AddressRequestBody, 
    Cart, 
    CheckoutRequestBody, 
    CheckoutSelectors, 
    Consignment, 
    ConsignmentAssignmentRequestBody, 
    ConsignmentUpdateRequestBody, 
    Country, 
    Customer, 
    CustomerRequestOptions, 
    FormField, 
    ShippingInitializeOptions, 
    ShippingRequestOptions 
=======
import {
    type Address,
    type AddressRequestBody,
    type Cart,
    type CheckoutRequestBody,
    type CheckoutSelectors,
    type Consignment,
    type ConsignmentAssignmentRequestBody,
    type Country,
    type Customer,
    type CustomerRequestOptions,
    type FormField,
    type ShippingInitializeOptions,
    type ShippingRequestOptions,
>>>>>>> staging
} from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import React, { Component, type ReactNode } from 'react';
import { createSelector } from 'reselect';

import { type ExtensionContextProps, withExtension } from '@bigcommerce/checkout/checkout-extension';
import { shouldUseStripeLinkByMinimumAmount } from '@bigcommerce/checkout/instrument-utils';
import { TranslatedString } from '@bigcommerce/checkout/locale';
import { type CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';
import { AddressFormSkeleton, ConfirmationModal } from '@bigcommerce/checkout/ui';

import { isEqualAddress, mapAddressFromFormValues } from '../address';
import { withCheckout } from '../checkout';
import type CheckoutStepStatus from '../checkout/CheckoutStepStatus';
import { EMPTY_ARRAY, isFloatingLabelEnabled } from '../common/utility';
import getProviderWithCustomCheckout from '../payment/getProviderWithCustomCheckout';
import { PaymentMethodId } from '../payment/paymentMethod';

<<<<<<< HEAD
import { UnassignItemError } from './errors';
import findLineItems from './findLineItems';
=======
>>>>>>> staging
import getShippableItemsCount from './getShippableItemsCount';
import getShippingMethodId from './getShippingMethodId';
import hasPromotionalItems from './hasPromotionalItems';
import { type MultiShippingFormValues } from './MultiShippingForm';
import ShippingForm from './ShippingForm';
import ShippingHeader from './ShippingHeader';
<<<<<<< HEAD
import { SingleShippingFormValues } from './SingleShippingForm';
import ShippingBanner from './customComponents/shipDate/ShippingBanner';
=======
import { type SingleShippingFormValues } from './SingleShippingForm';
>>>>>>> staging
import StripeShipping from './stripeUPE/StripeShipping';

export interface ShippingProps {
    isBillingSameAsShipping: boolean;
    cartHasChanged: boolean;
    isMultiShippingMode: boolean;
    step: CheckoutStepStatus;
    onCreateAccount(): void;
    onToggleMultiShipping(): void;
    onReady?(): void;
    onUnhandledError(error: Error): void;
    onSignIn(): void;
    navigateNextStep(isBillingSameAsShipping: boolean): void;
<<<<<<< HEAD
    shipDate: Date;
    setShipDate: Function;
    arrivalDate: Date;
    setArrivalDate: Function;
    giftMessage: String;
    setGiftMessage: Function;
=======
    setIsMultishippingMode(isMultiShippingMode: boolean): void;
>>>>>>> staging
}

export interface WithCheckoutShippingProps {
    billingAddress?: Address;
    cart: Cart;
    cartHasPromotionalItems: boolean;
    consignments: Consignment[];
    countries: Country[];
    countriesWithAutocomplete: string[];
    customer: Customer;
    customerMessage: string;
    googleMapsApiKey: string;
    isGuest: boolean;
    isInitializing: boolean;
    isLoading: boolean;
    isShippingStepPending: boolean;
    methodId?: string;
    shippingAddress?: Address;
    shouldShowMultiShipping: boolean;
    shouldShowOrderComments: boolean;
    providerWithCustomCheckout?: string;
    isFloatingLabelEnabled?: boolean;
    assignItem(consignment: ConsignmentAssignmentRequestBody): Promise<CheckoutSelectors>;
    deinitializeShippingMethod(options: ShippingRequestOptions): Promise<CheckoutSelectors>;
    deleteConsignments(): Promise<Address | undefined>;
    getFields(countryCode?: string): FormField[];
    initializeShippingMethod(options: ShippingInitializeOptions): Promise<CheckoutSelectors>;
    loadShippingAddressFields(): Promise<CheckoutSelectors>;
    loadBillingAddressFields(): Promise<CheckoutSelectors>;
    loadShippingOptions(): Promise<CheckoutSelectors>;
    signOut(options?: CustomerRequestOptions): void;
    createCustomerAddress(address: AddressRequestBody): Promise<CheckoutSelectors>;
    unassignItem(consignment: ConsignmentAssignmentRequestBody): Promise<CheckoutSelectors>;
    updateBillingAddress(address: Partial<Address>): Promise<CheckoutSelectors>;
    updateCheckout(payload: CheckoutRequestBody): Promise<CheckoutSelectors>;
    updateShippingAddress(address: Partial<Address>): Promise<CheckoutSelectors>;
<<<<<<< HEAD
    updateConsignment(consignment: ConsignmentUpdateRequestBody): Promise<CheckoutSelectors>;
    loadPaymentMethods(): Promise<CheckoutSelectors>;
=======
    shouldRenderStripeForm: boolean;
>>>>>>> staging
}

interface ShippingState {
    isInitializing: boolean;
<<<<<<< HEAD
    isGiftOrder: boolean;
    giftMessages: Array<any>;
=======
    isMultiShippingUnavailableModalOpen: boolean;
>>>>>>> staging
}

class Shipping extends Component<ShippingProps & WithCheckoutShippingProps & ExtensionContextProps, ShippingState> {
    constructor(props: ShippingProps & WithCheckoutShippingProps & ExtensionContextProps) {
        super(props);

        this.state = {
            isInitializing: true,
<<<<<<< HEAD
            isGiftOrder: false,
            giftMessages: new Array
=======
            isMultiShippingUnavailableModalOpen: false,
>>>>>>> staging
        };
    }

    async componentDidMount(): Promise<void> {
        const {
            loadShippingAddressFields,
            loadBillingAddressFields,
            loadShippingOptions,
            onReady = noop,
            onUnhandledError = noop,
            cartHasPromotionalItems,
            isMultiShippingMode,
        } = this.props;

        var toggleMulti = false
        this.loadGiftMessages(toggleMulti)

        try {
            await Promise.all([loadShippingAddressFields(), loadShippingOptions(), loadBillingAddressFields()]);

            if (cartHasPromotionalItems && isMultiShippingMode) {
                this.setState({ isMultiShippingUnavailableModalOpen: true });
            }

            onReady();
        } catch (error) {
            onUnhandledError(error);
        } finally {
            this.setState({ isInitializing: false });
        }
    }

    render(): ReactNode {
        const {
            isBillingSameAsShipping,
            isGuest,
            shouldShowMultiShipping,
            customer,
            updateShippingAddress,
            updateConsignment,
            initializeShippingMethod,
            deinitializeShippingMethod,
            isMultiShippingMode,
<<<<<<< HEAD
            onToggleMultiShipping,
            shipDate,
            setShipDate,
            arrivalDate,
            setArrivalDate,
            giftMessage,
            setGiftMessage,
            // isStripeLinkEnabled,
            providerWithCustomCheckout,
=======
>>>>>>> staging
            step,
            isFloatingLabelEnabled,
            shouldRenderStripeForm,
            cartHasPromotionalItems,
            extensionState: { shippingFormRenderTimestamp } = {},
            setIsMultishippingMode,
            ...shippingFormProps
        } = this.props;

        const {
            isInitializing,
<<<<<<< HEAD
            isGiftOrder,
            giftMessages
=======
            isMultiShippingUnavailableModalOpen,
>>>>>>> staging
        } = this.state;

        const handleSwitchToSingleShipping = async () => {
            this.setState({ isMultiShippingUnavailableModalOpen: false });
            await this.handleMultiShippingModeSwitch();
        }

        if (shouldRenderStripeForm && !customer.email && this.props.countries.length > 0) {
            return <StripeShipping
                { ...shippingFormProps }
                customer={ customer }
                deinitialize={deinitializeShippingMethod}
                initialize={initializeShippingMethod}
                isBillingSameAsShipping={isBillingSameAsShipping}
                isGuest={ isGuest }
                isInitialValueLoaded={!isInitializing}
                isLoading={ isInitializing }
                isMultiShippingMode={isMultiShippingMode}
                isShippingMethodLoading={ this.props.isLoading }
                onMultiShippingChange={ this.handleMultiShippingModeSwitch }
                onSubmit={this.handleSingleShippingSubmit}
                shouldShowMultiShipping={ shouldShowMultiShipping }
                step={step}
                updateAddress={updateShippingAddress}
            />;
        }

        const setIsGiftOrder = (isGiftOrder: boolean) => {
            this.setState({isGiftOrder: isGiftOrder})
        }

        const setGiftMessages = (giftMessage: any) => {
            var updatedGiftMessages = giftMessages
            updatedGiftMessages.map(item => {
                if (item.consignmentId === giftMessage.consignmentId) {
                    item.giftMessage = giftMessage.giftMessage
                }
            })
            this.setState({ giftMessages: updatedGiftMessages })
        }

        return (
            <AddressFormSkeleton isLoading={isInitializing} renderWhileLoading={true}>
                <div className="checkout-form">
<<<<<<< HEAD
                    { isMultiShippingMode && !isGuest &&
                        <ShippingBanner
                            className='multi-ship-alert-banner'
                            mainMessage={'You may experience increased screen loading times for orders with multiple destinations.'}
                        />
                    }
=======
                    <ConfirmationModal
                        action={handleSwitchToSingleShipping}
                        actionButtonLabel={<TranslatedString id="common.ok_action" />}
                        headerId="shipping.multishipping_unavailable_action"
                        isModalOpen={isMultiShippingUnavailableModalOpen}
                        messageId="shipping.checkout_switched_to_single_shipping"
                        shouldShowCloseButton={false}
                    />
>>>>>>> staging
                    <ShippingHeader
                        cartHasPromotionalItems={cartHasPromotionalItems}
                        isGuest={isGuest}
                        isMultiShippingMode={isMultiShippingMode}
                        onMultiShippingChange={this.handleMultiShippingModeSwitch}
                        shouldShowMultiShipping={shouldShowMultiShipping}
                    />
                    <ShippingForm
                        {...shippingFormProps}
                        deinitialize={deinitializeShippingMethod}
                        initialize={initializeShippingMethod}
                        isBillingSameAsShipping={isBillingSameAsShipping}
                        isFloatingLabelEnabled={isFloatingLabelEnabled}
                        isGuest={isGuest}
                        isInitialValueLoaded={!isInitializing}
                        isMultiShippingMode={isMultiShippingMode}
                        onMultiShippingSubmit={this.handleMultiShippingSubmit}
                        onSingleShippingSubmit={this.handleSingleShippingSubmit}
                        setIsMultishippingMode={setIsMultishippingMode}
                        shippingFormRenderTimestamp={shippingFormRenderTimestamp}
                        updateAddress={updateShippingAddress}
<<<<<<< HEAD
                        shipDate={ shipDate }
                        setShipDate={ setShipDate }
                        arrivalDate={ arrivalDate }
                        setArrivalDate={ setArrivalDate }
                        giftMessage={ giftMessage }
                        setGiftMessage={ setGiftMessage }
                        isGiftOrder={ isGiftOrder }
                        setIsGiftOrder={ setIsGiftOrder }
                        giftMessages={ giftMessages }
                        setGiftMessages={ setGiftMessages }
                        loadGiftMessages={ this.loadGiftMessages }
                        isFloatingLabelEnabled={isFloatingLabelEnabled}
=======
>>>>>>> staging
                    />
                </div>
            </AddressFormSkeleton>
        );
    }

    private loadGiftMessages: (toggleMulti: boolean) => void = async (toggleMulti: boolean) => {
        const {
            consignments,
            isMultiShippingMode
        } = this.props

        var giftMessages = new Array

        if (isMultiShippingMode || toggleMulti) {
            consignments.map((consignment: Consignment) => {
                var giftMessage
                var consignmentId
                giftMessage = consignment.shippingAddress.customFields.find(customField => customField.fieldId === 'field_32')
                consignmentId = consignment.id
                if (consignmentId) {
                    giftMessages.push({
                        consignmentId: consignmentId,
                        giftMessage: giftMessage && giftMessage.fieldValue || ''
                    })
                }
            })
    
            this.setState({ giftMessages: giftMessages })
        }
    }

    private handleMultiShippingModeSwitch: () => void = async () => {
        const {
            consignments,
            isMultiShippingMode,
            onToggleMultiShipping = noop,
            onUnhandledError = noop,
            updateShippingAddress,
            deleteConsignments,
        } = this.props;

        try {
            this.setState({ isInitializing: true });

            if (isMultiShippingMode && consignments.length) {
                // Collapse all consignments into one
                await updateShippingAddress(consignments[0].shippingAddress);
            }
            else {
                await deleteConsignments();
            }
        } catch (error) {
            onUnhandledError(error);
        } finally {
            this.setState({ isInitializing: false });
        }
        
        var toggleMulti = true
        this.loadGiftMessages(toggleMulti)
        onToggleMultiShipping();
    };

    private handleSingleShippingSubmit: (values: SingleShippingFormValues) => void = async ({
        billingSameAsShipping,
        shippingAddress: addressValues,
        orderComment,
    }) => {
        const {
            cart,
            customerMessage,
            updateCheckout,
            updateShippingAddress,
            updateBillingAddress,
            navigateNextStep,
            onUnhandledError,
            shippingAddress,
            billingAddress,
            methodId,
            shipDate,
            arrivalDate,
            giftMessage,
        } = this.props;

        const { isGiftOrder } = this.state;

        // CHECKOUT CUSTOM FIELDS
        // Update Ship Date, Arrival Date, Gift Message, Gift Order custom fields when shipping step is completed.

        if (addressValues) {
            const shipDateValue = shipDate.toLocaleDateString('en-US')
            const arrivalDateValue = arrivalDate.toLocaleDateString('en-US')
            const giftMessageValue = giftMessage.toString()
            const cartID = cart.id
            addressValues.customFields.field_30 = shipDateValue
            addressValues.customFields.field_38 = arrivalDateValue
            addressValues.customFields.field_32 = giftMessageValue
            isGiftOrder ? addressValues.customFields.field_34 = ['0'] : addressValues.customFields.field_34 = []
            addressValues.customFields.field_36 = cartID
        }

        const updatedShippingAddress = addressValues && mapAddressFromFormValues(addressValues);
        const promises: Array<Promise<CheckoutSelectors>> = [];
        const hasRemoteBilling = this.hasRemoteBilling(methodId);

        if (!isEqualAddress(updatedShippingAddress, shippingAddress) || shippingAddress?.shouldSaveAddress !== updatedShippingAddress?.shouldSaveAddress) {
            promises.push(updateShippingAddress(updatedShippingAddress || {}));
        }

        if (
            billingSameAsShipping &&
            updatedShippingAddress &&
            !isEqualAddress(updatedShippingAddress, billingAddress) &&
            !hasRemoteBilling
        ) {
            promises.push(updateBillingAddress(updatedShippingAddress));
        }

        if (customerMessage !== orderComment) {
            promises.push(updateCheckout({ customerMessage: orderComment }));
        }

        try {
            await Promise.all(promises);

            navigateNextStep(billingSameAsShipping);
        } catch (error) {
            if (error instanceof Error) {
                onUnhandledError(error);
            }
        }
    };

    private hasRemoteBilling: (methodId?: string) => boolean = (methodId) => {
        const PAYMENT_METHOD_VALID = ['amazonpay'];

        return PAYMENT_METHOD_VALID.some((method) => method === methodId);
    };

<<<<<<< HEAD
    private handleUseNewAddress: (address: Address, itemId: string) => void = async (
        address,
        itemId,
    ) => {
        const { unassignItem, onUnhandledError, isMultiShippingMode } = this.props;

        try {
            await unassignItem({
                address,
                lineItems: [
                    {
                        quantity: 1,
                        itemId,
                    },
                ],
            });

            location.href = '/account.php?action=add_shipping_address&from=checkout';
        } catch (error) {
            if (error instanceof UnassignItemError) {
                onUnhandledError(new UnassignItemError(error));
            }
        }

        this.loadGiftMessages(isMultiShippingMode)
    };

=======
>>>>>>> staging
    private handleMultiShippingSubmit: (values: MultiShippingFormValues) => void = async ({
        orderComment,
    }) => {
        const {
            customerMessage,
            updateCheckout,
            updateConsignment,
            navigateNextStep,
            onUnhandledError,
            consignments,
            shipDate,
            cart,
            isMultiShippingMode
        } = this.props;

        const { giftMessages } = this.state;

        interface ConsignmentUpdateRequestBody {
            id: string;
            shippingAddress?: AddressRequestBody;
            lineItems?: Array<any>;
        }

        const promises: Array<Promise<CheckoutSelectors>> = [];

        // CHECKOUT CUSTOM FIELDS
        // Update Ship Date, Arrival Date, Gift Message, Gift Order custom fields when shipping step is completed.
        
        const updateConsignmentCustomFields = async (consignment: Consignment) => {

            if (giftMessages.length > 0) {
                var giftMessage
                giftMessage = giftMessages.find(item => item.consignmentId === consignment.id).giftMessage
            }
            const shipDateValue = shipDate.toLocaleDateString('en-US')
            const cartID = cart.id.toString()

            var customFields = [
                { fieldId: "field_30", fieldValue: shipDateValue },
                { fieldId: "field_36", fieldValue: cartID },
                { fieldId: "field_32", fieldValue: giftMessage && giftMessage || '' }
            ]

            consignment.shippingAddress.customFields = customFields
            var consignmentLineItems: { itemId: string | number; quantity: number; }[] = []
            const lineItems = findLineItems(cart, consignment)
            lineItems.map(lineItem => consignmentLineItems.push({ itemId: lineItem.id, quantity: lineItem.quantity}))

            const payload: ConsignmentUpdateRequestBody = {
                id: consignment.id,
                shippingAddress: consignment.shippingAddress,
                lineItems: consignmentLineItems
            };

            await promises.push(updateConsignment(payload || {}))
        }

        if (isMultiShippingMode || consignments.length > 1) {
            consignments.map((consignment) => {
                updateConsignmentCustomFields(consignment)
            })
        }

        try {
            await Promise.all(promises);

            if (customerMessage !== orderComment) {
                await updateCheckout({ customerMessage: orderComment });
            }

            navigateNextStep(false);
        } catch (error) {
            if (error instanceof Error) {
                onUnhandledError(error);
            }
        }
    };
}

const deleteConsignmentsSelector = createSelector(
    ({ checkoutService: { deleteConsignment } }: CheckoutContextProps) => deleteConsignment,
    ({ checkoutState: { data } }: CheckoutContextProps) => data.getConsignments(),
    (deleteConsignment, consignments) => async () => {
        if (!consignments || !consignments.length) {
            return;
        }

        const [{ data }] = await Promise.all(consignments.map(({ id }) => deleteConsignment(id)));

        return data.getShippingAddress();
    },
);

export function mapToShippingProps({
    checkoutService,
    checkoutState,
}: CheckoutContextProps): WithCheckoutShippingProps | null {
    const {
        data: {
            getCart,
            getCheckout,
            getConfig,
            getCustomer,
            getConsignments,
            getShippingAddress,
            getBillingAddress,
            getShippingAddressFields,
            getShippingCountries,
        },
        statuses: {
            isShippingStepPending,
            isSelectingShippingOption,
            isLoadingShippingOptions,
            isUpdatingConsignment,
            isCreatingConsignments,
            isCreatingCustomerAddress,
            isLoadingShippingCountries,
            isUpdatingBillingAddress,
            isUpdatingCheckout,
            isDeletingConsignment,
            isLoadingCheckout,
        },
    } = checkoutState;

    const checkout = getCheckout();
    const config = getConfig();
    const consignments = getConsignments() || [];
    const customer = getCustomer();
    const cart = getCart();

    if (!checkout || !config || !customer || !cart) {
        return null;
    }

    const {
        checkoutSettings: {
            enableOrderComments,
            hasMultiShippingEnabled,
            googleMapsApiKey,
        },
    } = config;

    const methodId = getShippingMethodId(checkout, config);
    const isLoading =
        isLoadingShippingOptions() ||
        isSelectingShippingOption() ||
        isUpdatingConsignment() ||
        isCreatingConsignments() ||
        isUpdatingBillingAddress() ||
        isUpdatingCheckout() ||
        isCreatingCustomerAddress() ||
        isDeletingConsignment() ||
        isLoadingCheckout();

    const shippableItemsCount = getShippableItemsCount(cart);
    const shouldShowMultiShipping =
        hasMultiShippingEnabled && !methodId && shippableItemsCount > 1;

    const countriesWithAutocomplete = ['US', 'CA', 'AU', 'NZ', 'GB'];

    const shippingAddress =
        !shouldShowMultiShipping && consignments.length > 1 ? undefined : getShippingAddress();

    const providerWithCustomCheckout = getProviderWithCustomCheckout(
        config.checkoutSettings.providerWithCustomCheckout,
    );

    return {
        assignItem: checkoutService.assignItemsToAddress,
        billingAddress: getBillingAddress(),
        cart,
        cartHasPromotionalItems: hasPromotionalItems(cart),
        consignments,
        countries: getShippingCountries() || EMPTY_ARRAY,
        countriesWithAutocomplete,
        customer,
        customerMessage: checkout.customerMessage,
        createCustomerAddress: checkoutService.createCustomerAddress,
        deinitializeShippingMethod: checkoutService.deinitializeShipping,
        deleteConsignments: deleteConsignmentsSelector({ checkoutService, checkoutState }),
        getFields: getShippingAddressFields,
        googleMapsApiKey,
        initializeShippingMethod: checkoutService.initializeShipping,
        isGuest: customer.isGuest,
        isInitializing: isLoadingShippingCountries() || isLoadingShippingOptions(),
        isLoading,
        isShippingStepPending: isShippingStepPending(),
        loadShippingAddressFields: checkoutService.loadShippingAddressFields,
        loadBillingAddressFields: checkoutService.loadBillingAddressFields,
        loadShippingOptions: checkoutService.loadShippingOptions,
        methodId,
        providerWithCustomCheckout,
        shippingAddress,
        shouldShowMultiShipping,
        shouldShowOrderComments: enableOrderComments,
        signOut: checkoutService.signOutCustomer,
        unassignItem: checkoutService.unassignItemsToAddress,
        updateBillingAddress: checkoutService.updateBillingAddress,
        updateCheckout: checkoutService.updateCheckout,
        updateShippingAddress: checkoutService.updateShippingAddress,
        updateConsignment: checkoutService.updateConsignment,
        // isStripeLinkEnabled: stripeUpeLinkEnabled,
        loadPaymentMethods: checkoutService.loadPaymentMethods,
        isFloatingLabelEnabled: isFloatingLabelEnabled(config.checkoutSettings),
        shouldRenderStripeForm: providerWithCustomCheckout === PaymentMethodId.StripeUPE && shouldUseStripeLinkByMinimumAmount(cart),
    };
}

export default withExtension(withCheckout(mapToShippingProps)(Shipping));
