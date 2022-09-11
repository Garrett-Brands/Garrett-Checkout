import React, { useEffect, useState } from "react";
import { Fieldset, Legend } from "../../../ui/form";
import GiftOptions from "./GiftOptions";
import GiftMessageToggle from "./GiftMessageToggle";
import GiftOrderForm from "./GiftOrderForm";
import GiftMessageForm from "./GiftMessageForm";

const GiftMessage = (props: any) => {

    const { giftMessage, setGiftMessage } = props
    const [isGiftOrder, setIsGiftOrder] = useState(false)
    const [giftMessageToggle, setGiftMessageToggle] = useState(false)
    const [giftMessageIncluded, setGiftMessageIncluded] = useState(Boolean)
    
    useEffect(() => {
        setGiftMessageToggle(giftMessage.length > 0)
    }, [])

    useEffect(() => {
        setGiftMessageIncluded(giftMessage.length > 0)
    }, [giftMessage])

    useEffect(() => {
        console.log('Gift Message Included? => ', giftMessageIncluded)
        console.log('Gift Message Toggled? => ', giftMessageToggle )
        console.log('Gift Message => ', giftMessage)
        console.log('Is Gift Order? => ', isGiftOrder)
    }, [giftMessage, giftMessageIncluded, giftMessageToggle, isGiftOrder])

    // var checkoutId = props.id
    // var giftMessageConsignmentID = `field_32`
    // const address = props.consignments[0].address
    // const { firstName, lastName, email, company, address1, address2, city, stateOrProvince, stateOrProvinceCode, countryCode, postalCode, phone, shouldSaveAddress } = address

    // var reqBody = [
    //     {
    //       "address": {
    //         "firstName": firstName,
    //         "lastName": lastName,
    //         "email": email,
    //         "company": company,
    //         "address1": address1,
    //         "address2": address2,
    //         "city": city,
    //         "stateOrProvince": stateOrProvince,
    //         "stateOrProvinceCode": stateOrProvinceCode,
    //         "countryCode": countryCode,
    //         "postalCode": postalCode,
    //         "phone": phone,
    //         "customFields": [
    //           {
    //             "fieldId": giftMessageConsignmentID,
    //             "fieldValue": "Hi I'm testing adding a gift message!"
    //           }
    //         ],
    //         "shouldSaveAddress": shouldSaveAddress
    //       },
    //       "lineItems": [
    //         {
    //           "itemId": "bc86373a-4799-42b0-8e13-12e4c920fea4",
    //           "quantity": 2
    //         }
    //       ]
    //     }
    //   ]

    // var reqObj = {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "application/json",
    //       "X-Auth-Client": "e7cg7imo0dzsaanp1p4nd5eex92e43b",
    //       "X-Auth-Token": "3n66or96s8h3yfrmwif209l225mh74"
    //     },
    //     "body": JSON.stringify(reqBody)
    // };
    
    // const createGiftMessage = () => fetch(`https://api.bigcommerce.com/stores/b9domrfuy0/v3/checkouts/${checkoutId}/consignments?includes=consignments.availableShippingOptions`, reqObj)

    // createGiftMessage()
    // .then(resp => resp.json())
    // .then(shipments => {
    //     debugger
    //     console.log(shipments)
    // })
    // .catch(error => {
    //     console.log(error)
    // })

    const handleToggle = () => {
        setGiftMessageToggle(!giftMessageToggle)
    }

    const handleClear = () => {
        setGiftMessage('')
        setGiftMessageToggle(true)
    }

    return(
        <Fieldset id='gift-message'>
            <Legend testId="gift-message-form-heading"><span>Gift Options</span></Legend>
            <GiftOptions>
                <GiftOrderForm 
                    setIsGiftOrder={ setIsGiftOrder }
                    additionalClassName='form-isGiftOrder' />
                        <GiftMessageToggle 
                            toggleGiftMessage={ handleToggle } 
                            giftMessageToggle={ giftMessageToggle }
                            giftMessageLength={ giftMessage.length }
                            clearGiftMessage={ handleClear } />

                        { giftMessageToggle && 
                        <GiftMessageForm 
                            setGiftMessage={ setGiftMessage }
                            giftMessage={ giftMessage } /> }
            </GiftOptions>
        </Fieldset>
    )
}

export default GiftMessage