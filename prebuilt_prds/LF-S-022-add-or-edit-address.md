# PRD: LF-S-022 - Add or Edit Address

## 1. Change Log


| Date | Change | Owner | Rationale |
| ---- | ------ | ----- | --------- |
| 2026-09-10 | Updated on Confluence | Nan Dong | Header Links: Confluence URLs for shared context and page template |
| 2026-09-09 | Updated on Confluence | Nan Dong | Overwrite Prebuilt PRDs folder from local catalog |
| 2026-08-31 | First publish to Confluence | Nan Dong | Initial publish to Prebuilt PRDs folder |


## 2. Header


| Field                | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| Feature              | Add or Edit Address                                                              |
| Channels             | App + Web                                                                        |
| Status (owning team) | PM — drafting                                                                    |
| Owner (PM)           | Nan Dong                                                                         |
| Contributors         | Nan Dong                                                                         |
| Created              | 2026-08-21                                                                       |
| Last updated         | 2026-09-11 |
| Figma                | N / A |
| Jira                 | —                                                                                |
| API Spec             | N / A                                                                            |
| Links (optional)     | page template: [Basic page template (LF-P-001)](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7676821534/PRD+LF-P-001+-+Basic+Page+Template)<br>shared context: [Shared general context](https://lotusflare.atlassian.net/wiki/spaces/AIDR/pages/7693467649/Shared+general+context+product-wide+rules) |


## 3. Central requirement + Scope

### a. Central requirement

The address screen is where the user enters or changes the delivery details for a Physical SIM.

### b. Goals

- Enter or change first name, last name, an address using the shared address format, and mobile number
- Enter email when the user is not logged in
- Set a saved address as the default address when the user is logged in
- Use the address on Checkout when the user is not logged in
- Save the address when the user is logged in
- Delete a saved address when the user is logged in

### c. Non-Goals

N / A

### d. Entry points

N / A

### e. Exit points

N / A

## 4. User Journey

N / A

## 5. Acceptance Criteria


| ID | Given | When | Then |
| --- | --- | --- | --- |
| AC-01 | The address screen is shown | The user views the screen | - Helper text "All fields with * are required." is shown<br>- **First Name** is shown and is required<br>- **Last Name** is shown and is required<br>- **Mobile Number** is shown and is required; the number uses the shared MSISDN format |
| AC-02 | The address screen is shown | The user views the address fields | - Shared address fields are shown in order: **Address line 1**, **Address line 2**, **City**, **Country**, **State / Province**, **Postal code**<br>- Required: **Address line 1**, **Country**, **State / Province**<br>- Optional: **Address line 2**, **City**, **Postal code**<br>- **Country** is a select field with options from the shared country list<br>- **State / Province** is a select field |
| AC-03 | The address screen is shown and the user is not logged in | The user views the fields | **Email** is shown and is required |
| AC-04 | The address screen is shown | The user enters a value in **Postal code** | Only numbers can be entered; non-number characters are not accepted |
| AC-05 | The address screen is shown and the user is logged in | The user views the fields | **Set as default address** is shown and can be selected |
| AC-06 | The address screen is shown, the user is not logged in, and the user selected **add your address** on Checkout (LF-S-021) | The user views the screen | - Page title "Add address" is shown<br>- **Use this address** is shown and can be selected |
| AC-07 | The address screen is shown, the user is not logged in, and the user selected **Edit** on **Deliver to** on Checkout (LF-S-021) | The user views the screen | - Page title "Edit address" is shown<br>- **Use this address** is shown and can be selected |
| AC-08 | The address screen is shown, the user is logged in, and the user selected **Add a new address** on Saved addresses (LF-S-023) | The user views the screen | - Page title "Add address" is shown<br>- **Save** is shown and can be selected |
| AC-09 | The address screen is shown, the user is logged in, and the user selected **Edit** on a saved address on Saved addresses (LF-S-023) | The user views the screen | - Page title "Edit address" is shown<br>- **Save** is shown and can be selected<br>- **Delete** is shown and can be selected |
| AC-10 | The address screen is shown to edit an address and the user is not logged in | The user views the screen | The shown **First Name**, **Last Name**, **Address line 1**, **Address line 2**, **City**, **Country**, **State / Province**, **Postal code**, **Email**, and **Mobile Number** fields are filled from that address. Optional fields that were empty stay empty. The user can change them |
| AC-11 | The address screen is shown to edit an address and the user is logged in | The user views the screen | - The shown **First Name**, **Last Name**, **Address line 1**, **Address line 2**, **City**, **Country**, **State / Province**, **Postal code**, and **Mobile Number** fields are filled from that address. Optional fields that were empty stay empty. The user can change them<br>- If that address is the default address, **Set as default address** is selected<br>- If that address is not the default address, **Set as default address** is not selected |
| AC-12 | The address screen is shown to add an address | The user views the screen | - The shown name, address, email, and mobile number fields are shown empty<br>- If the user is logged in, **Set as default address** is not selected |
| AC-13 | The address screen is shown and no **Country** is selected | The user views **State / Province** | The options list is empty; the field is not disabled |
| AC-14 | The address screen is shown | The user selects a **Country** | **State / Province** options are the ISO 3166-2 subdivisions for that country |
| AC-15 | The address screen is shown and a **State / Province** is selected | The user selects a different **Country** | The previous **State / Province** value is cleared; **State / Province** options update for the new **Country** |
| AC-16 | The address screen is shown, the user is not logged in, and all address validation has passed | The user selects **Use this address** | - Leading and trailing spaces on **First Name** and **Last Name** are trimmed silently<br>- The user is taken to Checkout (LF-S-021) |
| AC-17 | The address screen is shown, the user is logged in, and all address validation has passed | The user selects **Save** | - Leading and trailing spaces on **First Name** and **Last Name** are trimmed silently<br>- If **Set as default address** is selected, this address is saved as the default address on the account. If another saved address was the default, that address is no longer the default. The account has only one default address<br>- If **Set as default address** is not selected, this address is not the default address on the account<br>- The user is taken to Saved addresses (LF-S-023) |
| AC-18 | The address screen is shown, the user is logged in, and the user selected **Edit** on a saved address on Saved addresses (LF-S-023) | The user selects **Delete** | - A confirmation is shown with the message "Are you sure to delete this address?"<br>- The user can confirm or cancel |
| AC-19 | The delete-address confirmation is shown | The user confirms | - That saved address is deleted<br>- If that saved address was the default address, the account has no default address<br>- The user is taken to Saved addresses (LF-S-023) |
| AC-20 | The delete-address confirmation is shown | The user cancels | The confirmation closes. The user stays on the address screen. That saved address is not deleted |


## 6. Edge cases & error cases


| ID | Case (category) | Trigger / entry | Expected behavior (observable) | Exit / recovery |
| --- | --- | --- | --- | --- |
| EC-01 | Error — special characters in name | The user leaves **First Name** or **Last Name** with a value that, after trim, contains anything other than letters or spaces | - The inline message "Special characters are not allowed" is shown on the affected field<br>- If the user is not logged in, **Use this address** does not continue<br>- If the user is logged in, **Save** does not continue | The user corrects the name and can try again |
| EC-02 | Error — name exceeds maximum length | The user leaves **First Name** or **Last Name** with a value that, after trim, has more than 50 characters | - The inline message "The maximum length for this field is 50 characters" is shown on the affected field<br>- If the user is not logged in, **Use this address** does not continue<br>- If the user is logged in, **Save** does not continue | The user shortens the name and can try again |
| EC-03 | Error — incorrect email format | The user is not logged in and leaves **Email** with a value that is filled and not in a correct email format | - The inline message "Invalid email format" is shown on **Email**<br>- **Use this address** does not continue | The user corrects the email and can try again |
| EC-04 | Error — email exceeds maximum length | The user is not logged in and leaves **Email** with a value that has more than 254 characters | - The inline message "The maximum length for this field is 254 characters" is shown on **Email**<br>- **Use this address** does not continue | The user shortens the email and can try again |
| EC-05 | Error — saved address limit reached | The address screen is shown to add an address, the user is logged in, this account already has **10** saved addresses, and the user views the screen or selects **Save** | - Message "You can save up to 10 addresses only. Delete or edit an existing one to save a new address." is shown<br>- **Got it** is shown and can be selected<br>- **Save** does not continue | The user selects **Got it**. The message closes. The user stays on the address screen. If this account still has **10** saved addresses, selecting **Save** shows this message again |
| EC-06 | Edge — deleted address was selected on Checkout | The delete-address confirmation is shown, that saved address is selected on Checkout, and the user confirms | The selected address on Checkout is cleared | The user is taken to Saved addresses (LF-S-023) |
| EC-07 | Edge — default address turned off | The address screen is shown to edit the default address, **Set as default address** is not selected, and the user selects **Save** | - This address is not the default address on the account<br>- The selected address on Checkout is cleared | The user is taken to Saved addresses (LF-S-023) |
| EC-08 | Edge — return with entered values | The user has entered values on the address screen, left the screen, and returns to the address screen | The previously entered values are still shown | N / A |


## 7. Data Mapping

N / A
