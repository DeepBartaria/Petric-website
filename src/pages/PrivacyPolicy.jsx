import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import NewHomeNavbar from '../components/NewHomeNavbar';
export default function PrivacyPolicy() {
    useEffect(() => {
        if (!window.location.hash) {
            // let ScrollToTop handle it
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full flex flex-col min-h-screen bg-white">
          <NewHomeNavbar />
            {/* Header */}
            <div className="w-full bg-[#FFF2B8] py-12 px-4 text-center">
                <h1 className="text-4xl md:text-6xl text-black font-normal balsamiq-sans-bold tracking-tight mb-4">Privacy Policy</h1>
                <p className="text-black text-lg">Last Updated: 19 March 2026</p>
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 md:py-16 flex flex-col lg:flex-row gap-12">
                
                {/* Left Content */}
                <div className="flex-1 text-black font-medium text-base md:text-lg leading-relaxed space-y-6">
                    <p>
                      Petric ("we", "us", "our") is a Gurugram-based pet care platform committed to offering pet essential needs to you in minutes. This Privacy Policy explains how we collect, use, store, share, and protect your personal data when you interact with us through our website (www.petric.in), mobile app, WhatsApp channel, or phone.
                    </p>
                    <p>
                      We take your privacy seriously - not because the law requires it, but because we're real people building a brand built on trust. Your data helps us serve you better; nothing more.
                    </p>
                    <p>
                      This Policy applies to all users including registered customers, guest users, and anyone who contacts us via any channel. By using our platform, you consent to the practices described here.
                    </p>

                    <h2 id="personal-data-collected" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">1. What Personal Data We Collect</h2>
                    
                    <h3 className="text-xl font-bold mt-6 mb-2">1.1 Data You Provide Directly</h3>
                    <ul className="list-disc pl-6 space-y-2 font-normal">
                        <li><span className="font-bold">Identity data:</span> Name, email address, phone number</li>
                        <li><span className="font-bold">Delivery data:</span> Delivery address, location pin, landmark details</li>
                        <li><span className="font-bold">Pet data:</span> Pet name, breed, age, dietary preferences, health conditions (shared voluntarily for personalised recommendations)</li>
                        <li><span className="font-bold">Payment data:</span> UPI ID, card details (processed by third-party gateways - Petric does not store full card numbers)</li>
                        <li><span className="font-bold">Communication data:</span> Messages, queries, feedback shared via WhatsApp, call, email, or app chat</li>
                        <li><span className="font-bold">Account data:</span> Username, password (hashed), order history, saved addresses, preferences, and/or wishlist</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">1.2 Data Collected Automatically</h3>
                    <ul className="list-disc pl-6 space-y-2 font-normal">
                        <li><span className="font-bold">Device data:</span> Device type, operating system, browser type, unique device identifiers</li>
                        <li><span className="font-bold">Usage data:</span> Pages visited, products viewed, time spent, clicks, search queries on the Platform</li>
                        <li><span className="font-bold">Location data:</span> Approximate location (city/pin-code level) for delivery feasibility checks; precise GPS only with your explicit permission</li>
                        <li><span className="font-bold">Log data:</span> IP address, access timestamps, error logs</li>
                        <li><span className="font-bold">Cookies</span> and similar tracking technologies (see Section 8)</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">1.3 Data from Third Parties</h3>
                    <ul className="list-disc pl-6 space-y-2 font-normal">
                        <li><span className="font-bold">Payment processors:</span> Transaction status confirmation</li>
                        <li><span className="font-bold">Delivery partners:</span> Delivery status updates</li>
                        <li><span className="font-bold">Analytics providers:</span> Aggregated, anonymised usage insights</li>
                    </ul>

                    <h2 id="how-we-use-data" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">2. How We Use Your Data</h2>
                    
                    <div className="overflow-x-auto mt-6 mb-6 border rounded-lg font-normal">
                      <table className="w-full text-sm sm:text-base text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 font-semibold">Purpose</th>
                            <th className="border p-3 font-semibold">Data Used</th>
                            <th className="border p-3 font-semibold">Legal Basis</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-3">Process and fulfil your orders</td>
                            <td className="border p-3">Identity, delivery, payment, pet data</td>
                            <td className="border p-3">Contractual necessity</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Deliver in-minute orders to your address</td>
                            <td className="border p-3">Delivery address, location data</td>
                            <td className="border p-3">Contractual necessity</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Send order confirmations & updates</td>
                            <td className="border p-3">Phone, email, WhatsApp</td>
                            <td className="border p-3">Contractual necessity</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Personalised product recommendations</td>
                            <td className="border p-3">Pet data, order history</td>
                            <td className="border p-3">Legitimate interest / Consent</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Customer support & grievance handling</td>
                            <td className="border p-3">Identity, communication data</td>
                            <td className="border p-3">Legitimate interest</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Improve Platform features & UX</td>
                            <td className="border p-3">Usage data, device data (anonymised)</td>
                            <td className="border p-3">Legitimate interest</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Send promotional messages (opt-in only)</td>
                            <td className="border p-3">Phone, email</td>
                            <td className="border p-3">Consent</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Smart reorder reminders</td>
                            <td className="border p-3">Pet data, order history</td>
                            <td className="border p-3">Consent</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Fraud prevention & security</td>
                            <td className="border p-3">Identity, device, log data</td>
                            <td className="border p-3">Legitimate interest / Legal obligation</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Legal compliance & regulatory reporting</td>
                            <td className="border p-3">As required by applicable law</td>
                            <td className="border p-3">Legal obligation</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 font-normal">
                      We do not use your data for automated decision-making that has legal or significant effects on you, without providing a human review mechanism.
                    </p>

                    <h2 id="pet-data-note" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">3. A Note on Pet Data</h2>
                    <p className="font-normal">
                      You may voluntarily share information about your pet (name, breed, age, dietary needs, health conditions) to help us give you better recommendations. This is treated with the same care as your own personal data.
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Pet data is used only to personalise your experience and improve our product recommendations.</li>
                        <li>Pet data is never sold, rented, or shared with third parties for commercial purposes.</li>
                        <li>You may delete or update pet data at any time via your account settings or by contacting us.</li>
                    </ul>

                    <h2 id="sharing-data" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">4. How We Share Your Data</h2>
                    <p className="font-normal">
                      Petric does not sell your personal data. We share data only in the following limited circumstances:
                    </p>

                    <div className="overflow-x-auto mt-6 mb-6 border rounded-lg font-normal">
                      <table className="w-full text-sm sm:text-base text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 font-semibold">Recipient</th>
                            <th className="border p-3 font-semibold">Data Shared</th>
                            <th className="border p-3 font-semibold">Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-3">Delivery partners</td>
                            <td className="border p-3">Name, phone, delivery address, order details</td>
                            <td className="border p-3">To fulfil your order</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Payment gateways (e.g., Razorpay, PayU)</td>
                            <td className="border p-3">Transaction details (not stored by Petric)</td>
                            <td className="border p-3">Payment processing</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Cloud & infrastructure providers</td>
                            <td className="border p-3">Encrypted user data</td>
                            <td className="border p-3">Platform hosting & operations</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Analytics tools (anonymised)</td>
                            <td className="border p-3">Usage data, device data</td>
                            <td className="border p-3">Platform improvement</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Legal authorities</td>
                            <td className="border p-3">As required by law</td>
                            <td className="border p-3">Compliance with legal obligations</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <ul className="list-disc pl-6 space-y-2 font-normal">
                        <li>All third-party processors are bound by data processing agreements and are required to maintain confidentiality.</li>
                        <li>If Petric undergoes a business restructuring or acquisition, your data may be transferred as part of that transaction, and you will be notified in advance.</li>
                    </ul>

                    <h2 id="retention" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">5. How Long We Keep Your Data</h2>
                    <p className="font-normal">
                      We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law.
                    </p>

                    <div className="overflow-x-auto mt-6 mb-6 border rounded-lg font-normal">
                      <table className="w-full text-sm sm:text-base text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 font-semibold">Data Type</th>
                            <th className="border p-3 font-semibold">Retention Period</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-3">Order & transaction records</td>
                            <td className="border p-3">7 years (as required under applicable tax and accounting laws)</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Account data (active accounts)</td>
                            <td className="border p-3">Duration of account + 2 years post-closure</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Communication data (support queries)</td>
                            <td className="border p-3">2 years from last interaction</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Payment processing logs</td>
                            <td className="border p-3">As required by payment gateway & RBI guidelines</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Marketing preferences (opt-in data)</td>
                            <td className="border p-3">Until you withdraw consent</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Anonymised analytics data</td>
                            <td className="border p-3">Indefinitely (cannot be linked back to you)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <p className="mt-4 font-normal">
                      When retention periods expire, data is securely deleted or anonymised.
                    </p>

                    <h2 id="your-rights" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">6. Your Rights Under DPDPA & Applicable Law</h2>
                    <p className="font-normal">
                      Under the Digital Personal Data Protection Act, 2023 (DPDPA) and applicable Indian law, you have the following rights with respect to your personal data:
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li><span className="font-bold">Right to Access:</span> Request a copy of the personal data we hold about you.</li>
                        <li><span className="font-bold">Right to Correction:</span> Request correction of inaccurate or incomplete personal data.</li>
                        <li><span className="font-bold">Right to Erasure:</span> Request deletion of your personal data, subject to legal retention obligations.</li>
                        <li><span className="font-bold">Right to Withdraw Consent:</span> Withdraw consent for data processing at any time, without affecting the lawfulness of processing prior to withdrawal.</li>
                        <li><span className="font-bold">Right to Grievance Redressal:</span> Lodge a complaint with Petric's Grievance Officer (see Section 11).</li>
                        <li><span className="font-bold">Right to Nominate:</span> Under DPDPA, you may nominate an individual to exercise your rights in the event of your death or incapacity.</li>
                    </ul>
                    <p className="mt-4 font-normal">
                      To exercise any of these rights, contact us at <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a>. We will respond within 30 days of receiving your request.
                    </p>
                    <p className="mt-4 font-normal">
                      You may also file a complaint with the Data Protection Board of India (once constituted) if your grievance is not resolved satisfactorily by Petric.
                    </p>

                    <h2 id="protection" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">7. How We Protect Your Data</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>All data transmitted to and from the Platform is encrypted using TLS (Transport Layer Security).</li>
                        <li>Payment data is processed exclusively through PCI-DSS compliant third-party gateways. Petric does not store full card numbers or CVVs.</li>
                        <li>Account passwords are stored in hashed form (not in plain text).</li>
                        <li>Access to personal data within Petric is restricted on a need-to-know basis.</li>
                        <li>We conduct periodic security reviews and vulnerability assessments of our Platform.</li>
                    </ul>
                    <p className="mt-4 font-normal">
                      Despite these measures, no system is completely immune to security breaches. In the event of a data breach that is likely to cause harm to you, we will notify you as required by applicable law.
                    </p>

                    <h2 id="cookies" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">8. Cookies & Tracking Technologies</h2>
                    
                    <h3 className="text-xl font-bold mt-6 mb-2">8.1 What Are Cookies</h3>
                    <p className="font-normal">
                      Cookies are small text files placed on your device when you visit the Platform. We also use similar technologies like web beacons and local storage.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-2">8.2 Types of Cookies We Use</h3>
                    <div className="overflow-x-auto mt-6 mb-6 border rounded-lg font-normal">
                      <table className="w-full text-sm sm:text-base text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 font-semibold">Cookie Type</th>
                            <th className="border p-3 font-semibold">Purpose</th>
                            <th className="border p-3 font-semibold">Can You Opt Out?</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-3">Essential / Functional</td>
                            <td className="border p-3">Login sessions, cart, delivery address</td>
                            <td className="border p-3">No: required for Platform to work</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Analytics</td>
                            <td className="border p-3">Understand how users interact with the Platform (anonymised)</td>
                            <td className="border p-3">Yes: via browser settings</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Preference</td>
                            <td className="border p-3">Remember your pet data, language, and display settings</td>
                            <td className="border p-3">Yes: via account settings</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Marketing (opt-in)</td>
                            <td className="border p-3">Personalised ads and retargeting (only with consent)</td>
                            <td className="border p-3">Yes: withdraw consent anytime</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="font-normal">
                      You can manage or delete cookies via your browser settings. Note that disabling essential cookies may affect Platform functionality.
                    </p>
                    <p className="mt-4 font-normal">
                      We do not use cookies to track you across third-party websites without your consent.
                    </p>

                    <h2 id="communication" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">9. WhatsApp, Phone & Communication Channels</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>When you contact us via WhatsApp or phone, conversations may be retained for customer support quality and training purposes.</li>
                        <li>WhatsApp communications are additionally subject to Meta's Privacy Policy. Petric is responsible only for data it directly controls.</li>
                        <li>Petric will only send you promotional WhatsApp messages if you have explicitly opted in. The maximum broadcast frequency is limited (typically no more than 2 messages per week).</li>
                        <li>To opt out of promotional communications, reply STOP to any WhatsApp message or contact <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a>.</li>
                        <li>Transactional messages (order confirmation, delivery updates) cannot be opted out of as they are necessary to fulfil your order.</li>
                    </ul>

                    <h2 id="children-privacy" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">10. Children's Privacy</h2>
                    <p className="font-normal">
                      The Platform is not directed at children under the age of 18. We do not knowingly collect personal data from anyone under 18. If you believe a minor has provided personal data to us without parental consent, please contact us at <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a> and we will delete it promptly.
                    </p>

                    <h2 id="grievance" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">11. Grievance Officer</h2>
                    <p className="font-normal">
                      In accordance with the Information Technology Act, 2000 and the Consumer Protection Act, 2019, Petric has designated a Grievance Officer for privacy-related concerns:
                    </p>
                    <p className="mt-4 font-semibold">Petric's Grievance Officer for consumer complaints:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li><span className="font-bold">Grievance Officer:</span> Petric Team</li>
                        <li><span className="font-bold">Email:</span> <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a></li>
                        <li><span className="font-bold">Response Time:</span> Acknowledgement within 48 hours; resolution within 15 business days</li>
                    </ul>
                    <p className="mt-4 font-normal">
                      If your complaint is not resolved within 30 days, you may escalate to the Data Protection Board of India (once constituted under DPDPA 2023) or the Consumer Disputes Redressal Commission.
                    </p>

                    <h2 id="changes" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">12. Changes to This Privacy Policy</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Petric may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or Platform features.</li>
                        <li>Material changes will be communicated via email, app notification, or a prominent notice on the Platform, at least 7 days before they take effect.</li>
                        <li>Your continued use of the Platform after the effective date of any changes constitutes acceptance of the updated Policy.</li>
                        <li>The "Last Updated" date at the top of this Policy reflects the most recent revision.</li>
                    </ul>

                    <h2 id="contact-us" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">13. Contact Us</h2>
                    <p className="font-normal">
                      We are always here for you. If you have any questions, concerns, or feedback about these Terms or any Order, please reach out:
                    </p>
                    <address className="not-italic text-sm sm:text-base mt-4 font-normal">
                        <p className="font-semibold">Petric</p>
                        <p><a href="tel:+918295756962" className="text-blue-600 underline">+91-8295756962</a></p>
                        <p>U-26/7, DLF Phase 3, Sector 24,</p>
                        <p>Gurugram, Haryana 122002</p>
                        <p><a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a></p>
                    </address>
                </div>

                {/* Right Content: Table of Contents */}
                <div className="lg:w-1/3 flex flex-col gap-8">
                    <div className="sticky top-28">
                        <h2 className="text-2xl font-bold text-black mb-6">Table of Contents</h2>
                        <ul className="flex flex-col gap-4 text-black text-base md:text-lg underline decoration-1 underline-offset-4">
                            <li><a href="#personal-data-collected" className="hover:text-blue-600 transition-colors">1. What Personal Data We Collect</a></li>
                            <li><a href="#how-we-use-data" className="hover:text-blue-600 transition-colors">2. How We Use Your Data</a></li>
                            <li><a href="#pet-data-note" className="hover:text-blue-600 transition-colors">3. A Note on Pet Data</a></li>
                            <li><a href="#sharing-data" className="hover:text-blue-600 transition-colors">4. How We Share Your Data</a></li>
                            <li><a href="#retention" className="hover:text-blue-600 transition-colors">5. How Long We Keep Your Data</a></li>
                            <li><a href="#your-rights" className="hover:text-blue-600 transition-colors">6. Your Rights Under DPDPA & Applicable Law</a></li>
                            <li><a href="#protection" className="hover:text-blue-600 transition-colors">7. How We Protect Your Data</a></li>
                            <li><a href="#cookies" className="hover:text-blue-600 transition-colors">8. Cookies & Tracking Technologies</a></li>
                            <li><a href="#communication" className="hover:text-blue-600 transition-colors">9. WhatsApp, Phone & Communication Channels</a></li>
                            <li><a href="#children-privacy" className="hover:text-blue-600 transition-colors">10. Children's Privacy</a></li>
                            <li><a href="#grievance" className="hover:text-blue-600 transition-colors">11. Grievance Officer</a></li>
                            <li><a href="#changes" className="hover:text-blue-600 transition-colors">12. Changes to This Privacy Policy</a></li>
                            <li><a href="#contact-us" className="hover:text-blue-600 transition-colors">13. Contact Us</a></li>
                        </ul>
                        <button 
                            onClick={scrollToTop}
                            className="mt-10 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors w-fit flex items-center gap-2"
                        >
                            Back to top <span>↑</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}