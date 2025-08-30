<<<<<<< HEAD
import React, { PureComponent, ReactNode } from 'react';
import { Consignment, Cart } from '@bigcommerce/checkout-sdk';
=======
import { ExtensionRegion } from '@bigcommerce/checkout-sdk';
import React, { type FunctionComponent } from 'react';

import { Extension } from '@bigcommerce/checkout/checkout-extension';
import { TranslatedString } from '@bigcommerce/checkout/locale';
import { useThemeContext } from '@bigcommerce/checkout/ui';
>>>>>>> staging

import { OrderComments } from '../orderComments';
import { Alert, AlertType } from '../ui/alert';
import { Button, ButtonVariant } from '../ui/button';
import { Fieldset, Legend } from '../ui/form';
import ShipDate from './customComponents/shipDate/ShipDate';
import ShipDateDisabled from './customComponents/shipDate/ShipDateDisabled';
import GiftMessage from './customComponents/giftOptions/GiftMessage';
import GiftMessageDisabled from './customComponents/giftOptions/GiftMessageDisabled';
import ShippingBanner from './customComponents/shipDate/ShippingBanner';

import { ShippingOptions } from './shippingOption';
import GiftMessageMulti from './customComponents/giftOptions/GiftMessageMulti';
import ShippingAcknowledgment from './customComponents/shippingAcknowledgement/ShippingAcknowledgement';

export interface ShippingFormFooterProps {
    cart: Cart;
    cartHasChanged: boolean;
    isMultiShippingMode: boolean;
    shouldShowOrderComments: boolean;
    shouldShowShippingOptions?: boolean;
    shouldDisableSubmit: boolean;
    isInitialValueLoaded: boolean;
    isLoading: boolean;
<<<<<<< HEAD
    consignments: Consignment[];
    shipDate: Date;
    setShipDate: Function;
    arrivalDate: Date;
    setArrivalDate: Function;
    giftMessage: String;
    setGiftMessage: Function;
    giftMessages: Array<any>;
    setGiftMessages: Function;
}

interface ShippingFormFooterState {
    unavailableItems: Array<any>;
    itemsUnavailableToShip: Array<any>;
    shippingAcknowledged: boolean;
}

class ShippingFormFooter extends PureComponent<ShippingFormFooterProps, ShippingFormFooterState> {
    constructor(props: ShippingFormFooterProps) {
        super(props);
        this.state = {
            unavailableItems: [],
            itemsUnavailableToShip: [],
            shippingAcknowledged: true
        };
    }

    render(): ReactNode {
        const {
            cart,
            cartHasChanged,
            isMultiShippingMode,
            shouldShowOrderComments,
            shouldShowShippingOptions = true,
            shouldDisableSubmit,
            isLoading,
            consignments,
            shipDate,
            setShipDate,
            arrivalDate,
            setArrivalDate,
            giftMessage,
            setGiftMessage,
        } = this.props;

        if (cart && consignments[0]) {
            var isActiveCart
            var savedCartID
            savedCartID = consignments[0].shippingAddress.customFields.find((customField: { fieldId: string; }) => customField.fieldId === 'field_36')
            isActiveCart = cart.id === savedCartID?.fieldValue
        }

        const { unavailableItems, itemsUnavailableToShip, shippingAcknowledged } = this.state;

        const setUnavailableItems = (unavailableItems: Array<any>) => {
            this.setState({unavailableItems: unavailableItems})
        }

        const setItemsUnavailableToShip = (unavailableItems: Array<any>) => {
            this.setState({itemsUnavailableToShip: unavailableItems})
        }

        const setShippingAcknowledged = (shippingAcknowledged: boolean) => {
            this.setState({shippingAcknowledged: shippingAcknowledged})
        }

        const renderItemAvailabilityMessage = (type: string) => {
            var message = ['no longer available. Please update your cart to complete checkout.']
            var products = new Array
            unavailableItems.map((item: { name: string, options: any }) => {
                var options = new Array
                if (item.options.length > 0) {
                    item.options.map((option: any) => options.push(option.value))
                }
                options.unshift(item.name)
                var productDetails = { message: options.join(' - ') }
                products.push(productDetails)
            })
            message.unshift(products.length > 1 ? ' products are ' : ' product is ')
            message.unshift(products.length.toString())
            return type === 'main'
            ? message
            : products
        }

        const includesFrangoItems = () => {
            var includesFrangoItems = false
            cart.lineItems.physicalItems.map(item => { if (item.categoryNames?.includes('Frango Chocolate')) includesFrangoItems = true })
            return includesFrangoItems
        }

        
        const shippingSurchargeMessage = 'UPS increased their shipping prices, resulting in a holiday surcharge per item.'
        const surchargeIsActive = false
        
        const shouldDisableContinue = () => {
            // Disable shipping continue if there are unavailable items, items unavailable to ship, or Frango and fan hasn't acknowledged warm shipping.
            return unavailableItems.length > 0 || itemsUnavailableToShip.length > 0 || shippingAcknowledged === false
        };

        return (
            <>
                <Fieldset
                    id="checkout-shipping-options"
                    legend={
                        <>
                            <Legend>
                                <TranslatedString id="shipping.shipping_method_label" />
                            </Legend>
=======
    shippingFormRenderTimestamp?: number;
}

const ShippingFormFooter: FunctionComponent<ShippingFormFooterProps> = ({
    cartHasChanged,
    isMultiShippingMode,
    shouldShowOrderComments,
    shouldShowShippingOptions = true,
    shouldDisableSubmit,
    isInitialValueLoaded,
    isLoading,
    shippingFormRenderTimestamp,
}) => {
    const { themeV2 } = useThemeContext();

    return (
        <>
            <Extension region={ExtensionRegion.ShippingShippingAddressFormAfter} />
            <Fieldset
                id="checkout-shipping-options"
                legend={
                    <>
                        <Legend themeV2={themeV2}>
                            <TranslatedString id="shipping.shipping_method_label" />
                        </Legend>
>>>>>>> staging

                        {cartHasChanged && (
                            <Alert type={AlertType.Error}>
                                <strong>
                                    <TranslatedString id="shipping.cart_change_error" />
                                </strong>
                            </Alert>
                        )}
                    </>
                }
            >
                <ShippingOptions
                    isInitialValueLoaded={isInitialValueLoaded}
                    isMultiShippingMode={isMultiShippingMode}
                    isUpdatingAddress={isLoading}
                    shippingFormRenderTimestamp={shippingFormRenderTimestamp}
                    shouldShowShippingOptions={shouldShowShippingOptions}
                />
            </Fieldset>

            {shouldShowOrderComments && <OrderComments />}

            <div className="form-actions">
                <Button
                    className={themeV2 ? 'body-bold' : ''}
                    disabled={shouldDisableSubmit}
                    id="checkout-shipping-continue"
                    isLoading={isLoading}
                    type="submit"
                    variant={ButtonVariant.Primary}
                >
<<<<<<< HEAD
                    { surchargeIsActive &&
                        <ShippingBanner
                            className='shipping-surcharge-banner'
                            mainMessage='?'
                            secondMessage={shippingSurchargeMessage}
                        />
                    }
                    <ShippingOptions
                        isMultiShippingMode={isMultiShippingMode}
                        isUpdatingAddress={isLoading}
                        shouldShowShippingOptions={shouldShowShippingOptions}
                    />
                    { includesFrangoItems() && <ShippingAcknowledgment 
                                                    setShippingAcknowledged={setShippingAcknowledged}
                                                    shippingAcknowledged={shippingAcknowledged} /> }
                </Fieldset>

            { shouldShowShippingOptions && unavailableItems.length === 0
            ?   <ShipDate
                    cart={ cart }
                    isMultiShippingMode={ isMultiShippingMode }
                    consignments={ consignments }
                    shipDate={ shipDate }
                    setShipDate={ setShipDate }
                    arrivalDate={ arrivalDate }
                    setArrivalDate={ setArrivalDate }
                    isActiveCart={ isActiveCart }
                    itemsUnavailableToShip={ itemsUnavailableToShip }
                    setItemsUnavailableToShip={ setItemsUnavailableToShip }
                    unavailableItems={ unavailableItems }
                    setUnavailableItems={ setUnavailableItems } /> 
            : <ShipDateDisabled /> }

            { unavailableItems.length > 0 &&
                <ShippingBanner
                    className='unavailable-items-alert-banner'
                    mainMessage={renderItemAvailabilityMessage('main')}
                    listItems={renderItemAvailabilityMessage('second')} />
            }

            { shouldShowShippingOptions 
            && unavailableItems.length === 0 
            && itemsUnavailableToShip.length === 0
            && !isMultiShippingMode
            ?   <GiftMessage
                    consignments={ consignments }
                    giftMessage={ giftMessage }
                    setGiftMessage={ setGiftMessage }
                    isActiveCart={ isActiveCart } />
            : ( isMultiShippingMode
            ? <>
                <Fieldset id='gift-message'>
                    <Legend testId="gift-message-form-heading"><span>Gift Options</span></Legend>
                </Fieldset>
                    {consignments.map((consignment, index) => this.renderGiftMessageMulti(consignment, index))}
              </>
            : <GiftMessageDisabled /> ) }

                {shouldShowOrderComments && <OrderComments />}

                <div className="form-actions">
                    <Button
                        disabled={ shouldDisableSubmit || unavailableItems.length > 0 || itemsUnavailableToShip.length > 0 || shouldDisableContinue() }
                        id="checkout-shipping-continue"
                        isLoading={isLoading}
                        type="submit"
                        variant={ButtonVariant.Primary}
                    >
                        <TranslatedString id="common.continue_action" />
                    </Button>
                </div>
            </>
        );
    }

    private renderGiftMessageMulti(consignment: Consignment, index: number): ReactNode {
        const { 
            cart,
            giftMessages,
            setGiftMessages
        } = this.props;

        if (cart && consignment) {
            var isActiveCart
            var savedCartID
            savedCartID = consignment.shippingAddress.customFields.find((customField: { fieldId: string; }) => customField.fieldId === 'field_36')
            isActiveCart = cart.id === savedCartID?.fieldValue
        }

        return (
            <GiftMessageMulti
                key={index}
                consignment={ consignment }
                isActiveCart={ isActiveCart }
                giftMessages={ giftMessages }
                setGiftMessages={ setGiftMessages } />
        );
    }
}
=======
                    <TranslatedString id="common.continue_action" />
                </Button>
            </div>
        </>
    );
};
>>>>>>> staging

export default ShippingFormFooter;
