# Pending PRD links

**Author/agent reminder only** — do **not** paste this file or “Pending destinations” into any PRD Header → Links cell.

Track hand-offs whose destination PRDs are **not written yet**. When those PRDs exist, update cross-references in the PRD body and optionally add Header **Links** / `relate-prds` on both sides. In PRDs, always name destinations with a **PRD ID** or `(PRD TBD)`.

| Source PRD | On-page control | Intended destination | Destination status | Link when ready |
|------------|-----------------|----------------------|--------------------|-----------------|
| LF-S-001 | **Log in** | Login (LF-S-016) | Exists | Optional Header Links / `relate-prds` |
| LF-S-001 | **Activate your SIM** | Activation — enter number (LF-S-005) | Exists | Optional Header Links / `relate-prds` |
| LF-S-001 | **Shop now** | Offer list (LF-S-017) for SIM offers | Exists | Optional Header Links / `relate-prds` |
| LF-S-002 | Confirm **Log out** | Welcome (LF-S-001) | Exists | Optional Header Links / `relate-prds` |
| LF-S-005 | **Get a SIM** (expired-SIM message) | Offer list (LF-S-017) for SIM offers | Exists | Optional Header Links / `relate-prds` |
| LF-S-005 | **Log in** (already-activated message) | Login (LF-S-016) | Exists | Optional Header Links / `relate-prds` |
| LF-S-005 | **Next** (valid number) | OTP verification (LF-S-004) | Exists | Optional Header Links / `relate-prds` |
| LF-S-004 | Correct OTP + **Next** (create account) | PIN Entering (LF-S-006) | Exists | Optional Header Links / `relate-prds` |
| LF-S-004 | **Not your number?** (create account) | Activation — enter number (LF-S-005) | Exists | Already noted in LF-S-004 |
| LF-J-001 | Matching strong PIN + **Next** on PIN Entering (LF-S-006) | Activation — Account Details (LF-S-007) | Exists | Already in LF-J-001 mermaid |
| LF-J-007 | Matching strong PIN + **Next** on PIN Entering (LF-S-006) | PIN Successfully Updated (LF-S-031) | Exists | Already in LF-J-007 mermaid |
| LF-J-007 | **Log in** on PIN Successfully Updated (LF-S-031) | Login (LF-S-016) | Exists | Same success screen as Forgot PIN |
| LF-J-006 | Matching strong PIN + **Next** on PIN Entering (LF-S-006) | PIN Successfully Updated (LF-S-031) | Exists | Already in LF-J-006 mermaid |
| LF-J-001 | Journey end **Next** on success | Email verification (LF-J-002) at Verify email (LF-S-013) | Exists | Optional Header Links / `relate-prds` |
| LF-S-007 | **Next** (account details filled) | Activation — account address (LF-S-008) | Exists | Optional Header Links / `relate-prds` |
| LF-S-008 | **Next** (Address line 1, Country, State / Province filled) | Activation — ID upload (LF-S-009) | Exists | Optional Header Links / `relate-prds` |
| LF-S-008 | **Previous** | Activation — account details (LF-S-007) | Exists | Optional Header Links / `relate-prds` |
| LF-S-009 | **Next** (valid ID file selected) | Activation — take selfie (LF-S-010) | Exists | Optional Header Links / `relate-prds` |
| LF-S-009 | **Previous** | Activation — account address (LF-S-008) | Exists | Optional Header Links / `relate-prds` |
| LF-S-010 | **Next** (selfie captured) | Activation — registration review (LF-S-011) | Exists | Optional Header Links / `relate-prds` |
| LF-S-010 | **Previous** | Activation — ID upload (LF-S-009) | Exists | Optional Header Links / `relate-prds` |
| LF-S-011 | **Create account** | Activation — success (LF-S-012) | Exists | Optional Header Links / `relate-prds` |
| LF-S-012 | **Next** | Email verification (LF-J-002) at Verify email (LF-S-013) | Exists | Optional Header Links / `relate-prds` |
| LF-J-002 | **Next** on Activation — success (LF-S-012) | Verify email (LF-S-013) | Exists | Journey entry |
| LF-S-013 | **Not your email?** | OTP verification (LF-S-004) | Exists | Then Edit email (LF-S-014) on correct OTP |
| LF-S-004 | Correct OTP + **Next** (email verification) | Edit email (LF-S-014) | Exists | From **Not your email?** on LF-S-013 |
| LF-S-014 | **Save** (verification email can be sent) | Verify email (LF-S-013) | Exists | Optional Header Links / `relate-prds` |
| LF-S-014 | **Cancel** | Verify email (LF-S-013) | Exists | Screen before OTP in LF-J-002 |
| LF-S-013 | **Log in** | Login (LF-S-016) | Exists | Optional Header Links / `relate-prds` |
| LF-S-013 | Valid / expired / already-verified / failed verification link (email) | Email verification result (LF-S-015) | Exists | One page; state depends on link outcome |
| LF-S-015 | **Log in** (success) | Login (LF-S-016) | Exists | Optional Header Links / `relate-prds` |
| LF-S-015 | **Resend verification link** (expired, when allowed) | Verify email (LF-S-013) | Exists | Sends new link; same 5 min / 3× limit as LF-S-013 / LF-S-014 |
| LF-S-015 | **Back to Home** (already verified or failed) | Welcome (LF-S-001) | Exists | Optional Header Links / `relate-prds` |
| LF-J-002 | **Log in** on LF-S-015 (success) | Login (LF-S-016) | Exists | Optional Header Links / `relate-prds` |
| LF-S-016 | **Log in** (verified) | Dashboard (LF-S-033) | Exists | Optional Header Links / `relate-prds` |
| LF-S-033 | **Buy add-ons** | Offer list (LF-S-017) for data offers | Exists | Optional Header Links / `relate-prds` |
| LF-S-033 | **Transfer balance** | Line Management (LF-S-045) | Exists | Starts Balance Transfer (LF-J-013) |
| LF-S-033 | **My Plan** | My Plan (LF-S-034) | Exists | Optional Header Links / `relate-prds` |
| LF-S-033 | **Referral** | Referral (LF-S-036) | Exists | Optional Header Links / `relate-prds` |
| LF-S-033 | **Usage history** | Usage History (LF-S-037) | Exists | Optional Header Links / `relate-prds` |
| LF-S-033 | **My Vouchers** | My Vouchers (LF-S-038) | Exists | Optional Header Links / `relate-prds` |
| LF-S-038 | Select a voucher | Voucher Detail (LF-S-039) | Exists | Optional Header Links / `relate-prds` |
| LF-S-038 | **Redeem a voucher** | Redeem a Voucher (LF-S-040) | Exists | Optional Header Links / `relate-prds` |
| LF-S-040 | **Redeem** when the voucher code can be redeemed | Redemption Success (LF-S-041) | Exists | Optional Header Links / `relate-prds` |
| LF-S-041 | **Redeem another one** | Redeem a Voucher (LF-S-040) | Exists | Optional Header Links / `relate-prds` |
| LF-J-008 | User selects **My Vouchers** on Dashboard (LF-S-033) | My Vouchers (LF-S-038) | Exists | Journey entry for Voucher Management |
| LF-S-033 | **Line management** | Line Management (LF-S-045) | Exists | Optional Header Links / `relate-prds` |
| LF-S-033 | **Inbox** | Inbox (LF-S-042) | Exists | Optional Header Links / `relate-prds` |
| LF-S-042 | Select a message | Inbox Message Detail (LF-S-043) | Exists | Optional Header Links / `relate-prds` |
| LF-S-042 | Search control | Inbox Search (LF-S-044) | Exists | Optional Header Links / `relate-prds` |
| LF-S-044 | Select a message | Inbox Message Detail (LF-S-043) | Exists | Optional Header Links / `relate-prds` |
| LF-J-009 | User selects **Inbox** on Dashboard (LF-S-033) | Inbox (LF-S-042) | Exists | Journey entry for Inbox Management |
| LF-S-033 | **Wallet** | Wallet (LF-S-050) | Exists | Optional Header Links / `relate-prds` |
| LF-S-050 | **Transfer** | Line Management (LF-S-045) | Exists | Starts Balance Transfer (LF-J-013) |
| LF-S-050 | **Recharge** | Recharge (LF-S-051) | Exists | Optional Header Links / `relate-prds` |
| LF-S-051 | **Recharge** | Payment (LF-J-014) | Exists | Starts at Payment method (LF-S-026) |
| LF-J-012 | User selects **Wallet** on Dashboard (LF-S-033) | Wallet (LF-S-050) | Exists | Journey entry for Wallet Recharge |
| LF-J-014 | User is taken to Payment method | Payment method (LF-S-026) | Exists | Journey entry for Payment |
| LF-J-014 | **Pay** from Shop Purchase (LF-J-003) | Payment result (LF-S-027) | Exists | Optional Header Links / `relate-prds` |
| LF-J-014 | **Pay** from Wallet Recharge (LF-J-012) | Recharge Status (LF-S-052) | Exists | Optional Header Links / `relate-prds` |
| LF-S-052 | **Back to Home** | Dashboard (LF-S-033) | Exists | Recharge succeeded |
| LF-S-052 | **Try again** | Recharge (LF-S-051) | Exists | Recharge failed |
| LF-S-016 | **Forgot PIN?** | OTP verification (LF-S-004) | Exists | Starts Forgot PIN (LF-J-006); OTP sent to the mobile number entered on Login |
| LF-J-006 | User clicks **Forgot PIN?** on Login (LF-S-016) | OTP verification (LF-S-004) | Exists | Journey entry |
| LF-J-006 | User clicks **Forgot PIN?** on Enter Existing PIN (LF-S-032) | OTP verification (LF-S-004) | Exists | Journey entry from Reset PIN (LF-J-007) |
| LF-J-006 | Correct OTP + **Next** | PIN Entering (LF-S-006) | Exists | Already in LF-J-006 mermaid |
| LF-J-006 | **Log in** on PIN Successfully Updated (LF-S-031) | Login (LF-S-016) | Exists | Journey exit |
| LF-S-031 | **Log in** | Login (LF-S-016) | Exists | Optional Header Links / `relate-prds` |
| LF-S-016 | **Got it** (not yet verified) | Email verification (LF-J-002) at Verify email (LF-S-013) | Exists | Optional Header Links / `relate-prds` |
| LF-S-016 | **Create an account** | Create account (LF-J-001) at Activation — enter number (LF-S-005) | Exists | Optional Header Links / `relate-prds` |
| LF-S-016 | Back | Welcome (LF-S-001) | Exists | Optional Header Links / `relate-prds` |
| LF-S-017 | Search | Offer search (LF-S-018) | Exists | Optional Header Links / `relate-prds` |
| LF-S-002 | Cart icon | Shopping Cart (LF-S-020) | Exists | Optional Header Links / `relate-prds` |
| LF-S-002 | **Line management** | Line Management (LF-S-045) | Exists | Optional Header Links / `relate-prds` |
| LF-J-011 | User selects **Line management** on Dashboard (LF-S-033) | Line Management (LF-S-045) | Exists | Journey entry for Line Management |
| LF-J-011 | User selects **Line management** in Header (LF-S-002) | Line Management (LF-S-045) | Exists | Journey entry for Line Management |
| LF-S-045 | **Add a new line** when the user is the group admin | Add a New Line (LF-S-046) | Exists | Optional Header Links / `relate-prds` |
| LF-S-045 | Select a line when the user is the group admin and the invitation has been accepted | Line Details (LF-S-047) | Exists | Optional Header Links / `relate-prds` |
| LF-S-045 | Select a line when the invitation has been accepted, after **Transfer balance** on Dashboard (LF-S-033) | Balance Transfer (LF-S-053) | Exists | Starts Balance Transfer (LF-J-013) |
| LF-J-013 | User selects **Transfer balance** on Dashboard (LF-S-033) | Line Management (LF-S-045) | Exists | Journey entry for Balance Transfer |
| LF-J-013 | User selects **Transfer** on Wallet (LF-S-050) | Line Management (LF-S-045) | Exists | Journey entry for Balance Transfer |
| LF-S-053 | **Confirm** | Transfer Result (LF-S-054) | Exists | Optional Header Links / `relate-prds` |
| LF-S-054 | **Back to Home** | Dashboard (LF-S-033) | Exists | Optional Header Links / `relate-prds` |
| LF-S-047 | **Buy add-ons** | Offer list (LF-S-017) for data offers | Exists | Starts Shop Purchase (LF-J-003) |
| LF-S-047 | **Change plan** | Base Plans (LF-S-035) | Exists | Starts Base Plan Management (LF-J-010) |
| LF-S-034 | **Change plan** | Base Plans (LF-S-035) | Exists | Optional Header Links / `relate-prds` |
| LF-J-010 | User selects **My Plan** on Dashboard (LF-S-033) | My Plan (LF-S-034) | Exists | Journey entry for Base Plan Management |
| LF-J-010 | User selects **Change plan** on Line Details (LF-S-047) | Base Plans (LF-S-035) | Exists | Journey entry for Base Plan Management |
| LF-S-035 | **Select** | Checkout (LF-S-021) | Exists | Optional Header Links / `relate-prds` |
| LF-S-046 | **Add** when the number can be added | Line Management (LF-S-045) | Exists | Optional Header Links / `relate-prds` |
| LF-S-046 | **Confirm** send invitation again | Line Management (LF-S-045) | Exists | Optional Header Links / `relate-prds` |
| LF-S-002 | **Reset PIN** in **My Account** | Enter Existing PIN (LF-S-032) | Exists | Starts Reset PIN (LF-J-007) |
| LF-J-007 | User selects **Reset PIN** in My Account menu | Enter Existing PIN (LF-S-032) | Exists | Journey entry |
| LF-J-007 | **Forgot PIN?** on Enter Existing PIN (LF-S-032) | Forgot PIN (LF-J-006) | Exists | Already in LF-J-007 mermaid |
| LF-J-007 | Correct existing PIN on Enter Existing PIN (LF-S-032) | PIN Entering (LF-S-006) | Exists | Already in LF-J-007 mermaid |
| LF-S-032 | Correct existing PIN | PIN Entering (LF-S-006) | Exists | Reset PIN (LF-J-007) |
| LF-S-032 | **Forgot PIN?** | Forgot PIN (LF-J-006) | Exists | Hand-off only; Forgot PIN journey owns the steps |
| LF-J-003 | Guest **Shop now** | Offer list (LF-S-017) for SIM offers | Exists | Journey entry — guest SIM purchase only |
| LF-J-003 | Logged-in **Shop Plans** | Shop landing page (LF-S-028) | Exists | Journey entry — all offer categories |
| LF-J-003 | User selects **Buy add-ons** on Line Details (LF-S-047) | Offer list (LF-S-017) for data offers | Exists | Journey entry — data offers |
| LF-J-003 | Logged-in Physical SIM — Edit or add your address | Saved address management (LF-J-004) | Exists | Opens saved addresses; returns to Checkout on select |
| LF-J-003 | Offer detail **Buy now** — app, logged in, eSIM | eSIM capability check (LF-S-025) | Exists | Same gate as Cart Checkout |
| LF-J-003 | Offer detail **Buy now** — otherwise | Checkout (LF-S-021) | Exists | Skips Shopping Cart |
| LF-J-004 | Logged-in user opens saved addresses | Saved addresses (LF-S-023) | Exists | Journey entry |
| LF-S-017 | Select offer / open offer | Offer detail (LF-S-019) | Exists | Optional Header Links / `relate-prds` |
| LF-S-018 | Select offer / open offer | Offer detail (LF-S-019) | Exists | Optional Header Links / `relate-prds` |
| LF-S-018 | Back | Offer list (LF-S-017) | Exists | Optional Header Links / `relate-prds` |
| LF-S-019 | **Buy now** | eSIM capability check (LF-S-025) | Exists | App, logged in, and this offer is an eSIM at quantity **1** |
| LF-S-019 | **Buy now** | Checkout (LF-S-021) | Exists | Web, or this offer is not an eSIM, or the user is not logged in |
| LF-S-020 | **Checkout** | eSIM capability check (LF-S-025) | Exists | App, logged in, and this purchase is for an eSIM offer |
| LF-S-020 | **Checkout** | Checkout (LF-S-021) | Exists | Web, or this purchase is not for an eSIM offer, or the user is not logged in |
| LF-S-025 | **Next** | Checkout (LF-S-021) | Exists | Optional Header Links / `relate-prds` |
| LF-S-020 | **Go to shop** (empty cart, logged in) | Shop landing page (LF-S-028) | Exists | Optional Header Links / `relate-prds` |
| LF-S-020 | **Go to shop** (empty cart, guest) | Offer list (LF-S-017) for SIM offers | Exists | Optional Header Links / `relate-prds` |
| LF-S-019 | **Log in to purchase** | Login (LF-S-016) | Exists | Optional Header Links / `relate-prds` |
| LF-S-021 | **Proceed to payment** | Payment (LF-J-014) | Exists | Starts at Payment method (LF-S-026) |
| LF-S-027 | **Back to Shop** (logged in) | Shop landing page (LF-S-028) | Exists | Optional Header Links / `relate-prds` |
| LF-S-027 | Download eSIM — activation code and ICCID returned within **10** seconds | Install eSIM (LF-S-029) | Exists | App, logged in, **Download eSIM to this device** |
| LF-J-003 | Download eSIM to this device — activation code and ICCID returned within **10** seconds | eSIM installation (LF-J-005) | Exists | Starts at Install eSIM (LF-S-029) |
| LF-J-003 | **Log out & activate your new SIM** after eSIM installation | Activation — Enter Number (LF-S-005) | Exists | Shop purchase CTAs after LF-J-005 |
| LF-J-003 | **Back to Shop** after eSIM installation | Shop landing page (LF-S-028) | Exists | Shop purchase CTAs after LF-J-005 |
| LF-J-005 | User is taken to Install eSIM | Install eSIM (LF-S-029) | Exists | Journey entry |
| LF-J-005 | Native system eSIM installation flow has ended | eSIM Installation Result (LF-S-030) | Exists | Success and failed set-up |
| LF-S-029 | Native system eSIM installation flow has ended | eSIM Installation Result (LF-S-030) | Exists | Success and failed set-up are shown on LF-S-030 |
| LF-S-030 | **Log out & activate your new SIM** | Activation — Enter Number (LF-S-005) | Exists | Shop purchase (LF-J-003) only; user is logged out first |
| LF-S-030 | **Back to Shop** | Shop landing page (LF-S-028) | Exists | Shop purchase (LF-J-003) success and failed set-up |
| LF-S-030 | CTAs — eSIM port-in | TBD — confirm with PM | Not written yet | Port-in journey PRD TBD |
| LF-S-030 | CTAs — eSIM swap | TBD — confirm with PM | Not written yet | Swap journey PRD TBD |
| LF-S-027 | **Back to Shop** (guest) | Offer list (LF-S-017) for SIM offers | Exists | Optional Header Links / `relate-prds` |
| LF-S-027 | **Try again** | Payment method (LF-S-026) | Exists | Payment failed |
| LF-S-027 | **Chat with us** | Chat with us (PRD TBD) | Not written yet | Offer provisioning failed; add PRD ID + Links on LF-S-027 and destination |
| LF-S-024 | **Next** | OTP verification (LF-S-004) | Exists | OTP sent to the email entered on LF-S-024 |
| LF-S-004 | Correct OTP + **Next** (eSIM purchase fill info) | Checkout (LF-S-021) | Exists | From LF-S-024 **Next**; optional Header Links / `relate-prds` |
| LF-S-004 | **Not your email?** (eSIM purchase) | eSIM purchase fill info (LF-S-024) | Exists | When OTP was sent to email from LF-S-024 |
| LF-S-022 | **Use this address** | Checkout (LF-S-021) | Exists | Guest add or edit from Checkout |
| LF-S-022 | **Save** | Saved addresses (LF-S-023) | Exists | Logged-in add or edit |
| LF-S-022 | Confirm delete | Saved addresses (LF-S-023) | Exists | Logged-in edit of a saved address |
| LF-S-023 | **Edit** on a saved address | Add or edit address (LF-S-022) | Exists | Optional Header Links / `relate-prds` |
| LF-S-023 | Select a saved address | Checkout (LF-S-021) | Exists | Logged-in choose delivery from Saved addresses |
| LF-S-023 | **Add a new address** | Add or edit address (LF-S-022) | Exists | Optional Header Links / `relate-prds` |
| LF-S-011 | **Edit** Personal info | Activation — account details (LF-S-007) | Exists | Continue flow from that step |
| LF-S-011 | **Edit** Address | Activation — account address (LF-S-008) | Exists | Continue flow from that step |
| LF-S-011 | **Edit** ID upload | Activation — ID upload (LF-S-009) | Exists | Continue flow from that step |
| LF-S-011 | **Edit** Selfie | Activation — take selfie (LF-S-010) | Exists | Continue flow from that step |
| LF-S-005 | Back | Welcome (LF-S-001) | Exists | Already noted in §3e; optional Header Links later |
| LF-S-004 | **Not your number?** | Previous screen (e.g. LF-S-005 from activation) | Depends on calling flow | Keep generic + example ID when known |
| LF-S-055 | **User Profile** | User Profile (PRD TBD) | Not written yet | Add PRD ID in LF-S-055 when written |
| LF-S-055 | **Transaction History** | Transaction History (LF-J-015) | Exists | Optional Header Links / `relate-prds` |
| LF-J-015 | User selects **Transaction History** on My Account Home (LF-S-055) | Transaction History (LF-S-056) | Exists | Journey entry |
| LF-S-056 | Select a transaction | Order Details (LF-S-057) | Exists | Optional Header Links / `relate-prds` |
| LF-S-055 | **SIM Swap** | SIM Swap (PRD TBD) | Not written yet | Swap journey PRD TBD |
| LF-S-055 | **Port in** | Port in (PRD TBD) | Not written yet | Port-in journey PRD TBD |

**How to clear a row:** write the destination PRD → name that ID in the source PRD §5–6 → update this table. Do **not** add destination PRDs to Header **Links** unless the user asks. Header Links stay page-template only.

**If a PRD ID is renamed:** search `prebuilt_prds/` for the old ID and update every cross-reference (including this file).
