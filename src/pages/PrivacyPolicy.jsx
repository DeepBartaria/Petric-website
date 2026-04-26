import React from 'react';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <div className="mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10 text-black max-w-5xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">Privacy Policy</h1>
                <div className="text-center text-xs sm:text-sm mb-6 sm:mb-8 text-gray-500">Last Updated: 19 March 2026</div>
                
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  Petric ("we", "us", "our") is a Gurugram-based pet care platform committed to offering pet essential needs to you in minutes. This Privacy Policy explains how we collect, use, store, share, and protect your personal data when you interact with us through our website (www.petric.in), mobile app, WhatsApp channel, or phone.
                </p>
                
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  We take your privacy seriously - not because the law requires it, but because we're real people building a brand built on trust. Your data helps us serve you better; nothing more.
                </p>
                
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  This Policy applies to all users including registered customers, guest users, and anyone who contacts us via any channel. By using our platform, you consent to the practices described here.
                </p>

                <hr className="my-4 sm:my-6" />
                
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">1. What Personal Data We Collect</h2>
                
                <h3 className="text-lg sm:text-xl font-medium mb-2 mt-4">1.1 Data You Provide Directly</h3>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
                    <li><span className="font-semibold">Identity data:</span> Name, email address, phone number</li>
                    <li><span className="font-semibold">Delivery data:</span> Delivery address, location pin, landmark details</li>
                    <li><span className="font-semibold">Pet data:</span> Pet name, breed, age, dietary preferences, health conditions (shared voluntarily for personalised recommendations)</li>
                    <li><span className="font-semibold">Payment data:</span> UPI ID, card details (processed by third-party gateways - Petric does not store full card numbers)</li>
                    <li><span className="font-semibold">Communication data:</span> Messages, queries, feedback shared via WhatsApp, call, email, or app chat</li>
                    <li><span className="font-semibold">Account data:</span> Username, password (hashed), order history, saved addresses, preferences, and/or wishlist</li>
                </ul>

                <h3 className="text-lg sm:text-xl font-medium mb-2 mt-4">1.2 Data Collected Automatically</h3>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
                    <li><span className="font-semibold">Device data:</span> Device type, operating system, browser type, unique device identifiers</li>
                    <li><span className="font-semibold">Usage data:</span> Pages visited, products viewed, time spent, clicks, search queries on the Platform</li>
                    <li><span className="font-semibold">Location data:</span> Approximate location (city/pin-code level) for delivery feasibility checks; precise GPS only with your explicit permission</li>
                    <li><span className="font-semibold">Log data:</span> IP address, access timestamps, error logs</li>
                    <li><span className="font-semibold">Cookies</span> and similar tracking technologies (see Section 8)</li>
                </ul>

                <h3 className="text-lg sm:text-xl font-medium mb-2 mt-4">1.3 Data from Third Parties</h3>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
                    <li><span className="font-semibold">Payment processors:</span> Transaction status confirmation</li>
                    <li><span className="font-semibold">Delivery partners:</span> Delivery status updates</li>
                    <li><span className="font-semibold">Analytics providers:</span> Aggregated, anonymised usage insights</li>
                </ul>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5">2. How We Use Your Data</h2>
                
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm sm:text-base text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 font-semibold">Purpose</th>
                        <th className="border p-2 font-semibold">Data Used</th>
                        <th className="border p-2 font-semibold">Legal Basis</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Process and fulfil your orders</td>
                        <td className="border p-2">Identity, delivery, payment, pet data</td>
                        <td className="border p-2">Contractual necessity</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Deliver in-minute orders to your address</td>
                        <td className="border p-2">Delivery address, location data</td>
                        <td className="border p-2">Contractual necessity</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Send order confirmations & updates</td>
                        <td className="border p-2">Phone, email, WhatsApp</td>
                        <td className="border p-2">Contractual necessity</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Personalised product recommendations</td>
                        <td className="border p-2">Pet data, order history</td>
                        <td className="border p-2">Legitimate interest / Consent</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Customer support & grievance handling</td>
                        <td className="border p-2">Identity, communication data</td>
                        <td className="border p-2">Legitimate interest</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Improve Platform features & UX</td>
                        <td className="border p-2">Usage data, device data (anonymised)</td>
                        <td className="border p-2">Legitimate interest</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Send promotional messages (opt-in only)</td>
                        <td className="border p-2">Phone, email</td>
                        <td className="border p-2">Consent</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Smart reorder reminders</td>
                        <td className="border p-2">Pet data, order history</td>
                        <td className="border p-2">Consent</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Fraud prevention & security</td>
                        <td className="border p-2">Identity, device, log data</td>
                        <td className="border p-2">Legitimate interest / Legal obligation</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Legal compliance & regulatory reporting</td>
                        <td className="border p-2">As required by applicable law</td>
                        <td className="border p-2">Legal obligation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-4 sm:mb-6 text-sm sm:text-base font-medium">
                  We do not use your data for automated decision-making that has legal or significant effects on you, without providing a human review mechanism.
                </p>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">3. A Note on Pet Data</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  You may voluntarily share information about your pet (name, breed, age, dietary needs, health conditions) to help us give you better recommendations. This is treated with the same care as your own personal data.
                </p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
                    <li>Pet data is used only to personalise your experience and improve our product recommendations.</li>
                    <li>Pet data is never sold, rented, or shared with third parties for commercial purposes.</li>
                    <li>You may delete or update pet data at any time via your account settings or by contacting us.</li>
                </ul>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">4. How We Share Your Data</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  Petric does not sell your personal data. We share data only in the following limited circumstances:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm sm:text-base text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 font-semibold">Recipient</th>
                        <th className="border p-2 font-semibold">Data Shared</th>
                        <th className="border p-2 font-semibold">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Delivery partners</td>
                        <td className="border p-2">Name, phone, delivery address, order details</td>
                        <td className="border p-2">To fulfil your order</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Payment gateways (e.g., Razorpay, PayU)</td>
                        <td className="border p-2">Transaction details (not stored by Petric)</td>
                        <td className="border p-2">Payment processing</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Cloud & infrastructure providers</td>
                        <td className="border p-2">Encrypted user data</td>
                        <td className="border p-2">Platform hosting & operations</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Analytics tools (anonymised)</td>
                        <td className="border p-2">Usage data, device data</td>
                        <td className="border p-2">Platform improvement</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Legal authorities</td>
                        <td className="border p-2">As required by law</td>
                        <td className="border p-2">Compliance with legal obligations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
                    <li>All third-party processors are bound by data processing agreements and are required to maintain confidentiality.</li>
                    <li>If Petric undergoes a business restructuring or acquisition, your data may be transferred as part of that transaction, and you will be notified in advance.</li>
                </ul>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">5. How Long We Keep Your Data</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law.
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm sm:text-base text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 font-semibold">Data Type</th>
                        <th className="border p-2 font-semibold">Retention Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Order & transaction records</td>
                        <td className="border p-2">7 years (as required under applicable tax and accounting laws)</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Account data (active accounts)</td>
                        <td className="border p-2">Duration of account + 2 years post-closure</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Communication data (support queries)</td>
                        <td className="border p-2">2 years from last interaction</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Payment processing logs</td>
                        <td className="border p-2">As required by payment gateway & RBI guidelines</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Marketing preferences (opt-in data)</td>
                        <td className="border p-2">Until you withdraw consent</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Anonymised analytics data</td>
                        <td className="border p-2">Indefinitely (cannot be linked back to you)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  When retention periods expire, data is securely deleted or anonymised.
                </p>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">6. Your Rights Under DPDPA & Applicable Law</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  Under the Digital Personal Data Protection Act, 2023 (DPDPA) and applicable Indian law, you have the following rights with respect to your personal data:
                </p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
                    <li><span className="font-semibold">Right to Access:</span> Request a copy of the personal data we hold about you.</li>
                    <li><span className="font-semibold">Right to Correction:</span> Request correction of inaccurate or incomplete personal data.</li>
                    <li><span className="font-semibold">Right to Erasure:</span> Request deletion of your personal data, subject to legal retention obligations.</li>
                    <li><span className="font-semibold">Right to Withdraw Consent:</span> Withdraw consent for data processing at any time, without affecting the lawfulness of processing prior to withdrawal.</li>
                    <li><span className="font-semibold">Right to Grievance Redressal:</span> Lodge a complaint with Petric's Grievance Officer (see Section 11).</li>
                    <li><span className="font-semibold">Right to Nominate:</span> Under DPDPA, you may nominate an individual to exercise your rights in the event of your death or incapacity.</li>
                </ul>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  To exercise any of these rights, contact us at <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a>. We will respond within 30 days of receiving your request.
                </p>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  You may also file a complaint with the Data Protection Board of India (once constituted) if your grievance is not resolved satisfactorily by Petric.
                </p>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">7. How We Protect Your Data</h2>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
                    <li>All data transmitted to and from the Platform is encrypted using TLS (Transport Layer Security).</li>
                    <li>Payment data is processed exclusively through PCI-DSS compliant third-party gateways. Petric does not store full card numbers or CVVs.</li>
                    <li>Account passwords are stored in hashed form (not in plain text).</li>
                    <li>Access to personal data within Petric is restricted on a need-to-know basis.</li>
                    <li>We conduct periodic security reviews and vulnerability assessments of our Platform.</li>
                </ul>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  Despite these measures, no system is completely immune to security breaches. In the event of a data breach that is likely to cause harm to you, we will notify you as required by applicable law.
                </p>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">8. Cookies & Tracking Technologies</h2>
                
                <h3 className="text-lg sm:text-xl font-medium mb-2 mt-4">8.1 What Are Cookies</h3>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  Cookies are small text files placed on your device when you visit the Platform. We also use similar technologies like web beacons and local storage.
                </p>
                
                <h3 className="text-lg sm:text-xl font-medium mb-2 mt-4">8.2 Types of Cookies We Use</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm sm:text-base text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 font-semibold">Cookie Type</th>
                        <th className="border p-2 font-semibold">Purpose</th>
                        <th className="border p-2 font-semibold">Can You Opt Out?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Essential / Functional</td>
                        <td className="border p-2">Login sessions, cart, delivery address</td>
                        <td className="border p-2">No: required for Platform to work</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Analytics</td>
                        <td className="border p-2">Understand how users interact with the Platform (anonymised)</td>
                        <td className="border p-2">Yes: via browser settings</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Preference</td>
                        <td className="border p-2">Remember your pet data, language, and display settings</td>
                        <td className="border p-2">Yes: via account settings</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Marketing (opt-in)</td>
                        <td className="border p-2">Personalised ads and retargeting (only with consent)</td>
                        <td className="border p-2">Yes: withdraw consent anytime</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  You can manage or delete cookies via your browser settings. Note that disabling essential cookies may affect Platform functionality.
                </p>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  We do not use cookies to track you across third-party websites without your consent.
                </p>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">9. WhatsApp, Phone & Communication Channels</h2>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
                    <li>When you contact us via WhatsApp or phone, conversations may be retained for customer support quality and training purposes.</li>
                    <li>WhatsApp communications are additionally subject to Meta's Privacy Policy. Petric is responsible only for data it directly controls.</li>
                    <li>Petric will only send you promotional WhatsApp messages if you have explicitly opted in. The maximum broadcast frequency is limited (typically no more than 2 messages per week).</li>
                    <li>To opt out of promotional communications, reply STOP to any WhatsApp message or contact <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a>.</li>
                    <li>Transactional messages (order confirmation, delivery updates) cannot be opted out of as they are necessary to fulfil your order.</li>
                </ul>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">10. Children's Privacy</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  The Platform is not directed at children under the age of 18. We do not knowingly collect personal data from anyone under 18. If you believe a minor has provided personal data to us without parental consent, please contact us at <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a> and we will delete it promptly.
                </p>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">11. Grievance Officer</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  In accordance with the Information Technology Act, 2000 and the Consumer Protection Act, 2019, Petric has designated a Grievance Officer for privacy-related concerns:
                </p>
                <p className="mb-2 text-sm sm:text-base font-semibold">Petric's Grievance Officer for consumer complaints:</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
                    <li><span className="font-semibold">Grievance Officer:</span> Petric Team</li>
                    <li><span className="font-semibold">Email:</span> <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a></li>
                    <li><span className="font-semibold">Response Time:</span> Acknowledgement within 48 hours; resolution within 15 business days</li>
                </ul>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  If your complaint is not resolved within 30 days, you may escalate to the Data Protection Board of India (once constituted under DPDPA 2023) or the Consumer Disputes Redressal Commission.
                </p>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">12. Changes to This Privacy Policy</h2>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-1">
                    <li>Petric may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or Platform features.</li>
                    <li>Material changes will be communicated via email, app notification, or a prominent notice on the Platform, at least 7 days before they take effect.</li>
                    <li>Your continued use of the Platform after the effective date of any changes constitutes acceptance of the updated Policy.</li>
                    <li>The "Last Updated" date at the top of this Policy reflects the most recent revision.</li>
                </ul>

                <hr className="my-4 sm:my-6" />

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">13. Contact Us</h2>
                <p className="mb-2 text-sm sm:text-base">
                  We are always here for you. If you have any questions, concerns, or feedback about these Terms or any Order, please reach out:
                </p>
                <address className="not-italic text-sm sm:text-base mb-8">
                    <p className="font-semibold">Petric</p>
                    <p><a href="tel:+918295756962" className="text-blue-600 underline">+91-8295756962</a></p>
                    <p>U-26/7, DLF Phase 3, Sector 24,</p>
                    <p>Gurugram, Haryana 122002</p>
                    <p><a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a></p>
                </address>

            </div>
            <Footer />
        </>
    );
}