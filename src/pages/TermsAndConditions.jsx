import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import NewHomeNavbar from '../components/NewHomeNavbar';
export default function TermsAndConditions() {
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
                <h1 className="text-4xl md:text-6xl text-black font-normal balsamiq-sans-bold tracking-tight mb-4">Terms & Conditions</h1>
                <p className="text-black text-lg">Last Updated: 10 March 2026</p>
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 md:py-16 flex flex-col lg:flex-row gap-12">
                
                {/* Left Content */}
                <div className="flex-1 text-black font-medium text-base md:text-lg leading-relaxed space-y-6">
                    <p>
                      Welcome to Petric - your trusted partner for in-minute pet care delivery across Gurugram. These Terms and Conditions ("Terms") govern your access to and use of the Petric website (www.petric.in), mobile application, WhatsApp ordering channel, and any related services (collectively, the "Platform").
                    </p>

                    <p>
                      By accessing or placing an order through the Platform, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, please discontinue use of the Platform immediately.
                    </p>

                    <p>
                      These Terms apply to all users including registered customers, guest users, and anyone browsing the Platform.
                    </p>

                    <h2 id="key-definitions" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">Key Definitions</h2>
                    <p className="font-normal">For the purposes of these Terms, the following definitions apply:</p>
                    <ul className="list-disc pl-6 space-y-2 font-normal">
                        <li><span className="font-bold">"Platform"</span> - Petric's website, mobile app, WhatsApp ordering channel, and phone ordering service, collectively.</li>
                        <li><span className="font-bold">"User" / "You"</span> - Any individual who accesses or uses the Platform for any purpose.</li>
                        <li><span className="font-bold">"Order"</span> - A confirmed purchase request placed by a User for one or more Products.</li>
                        <li><span className="font-bold">"Products"</span> - Pet food, treats, accessories, toys, medicines, supplements, and other items listed on the Platform.</li>
                        <li><span className="font-bold">"Delivery Promise"</span> - Petric's in-minute delivery commitment as displayed at the time of ordering, subject to these Terms.</li>
                        <li><span className="font-bold">"Service Area"</span> - Geographic zones in Gurugram (and nearby areas) where Petric currently offers delivery, as updated on the Platform from time to time.</li>
                    </ul>

                    <h2 id="eligibility" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">1. Eligibility & Account Registration</h2>

                    <h3 className="text-xl font-bold mt-6 mb-2">1.1 Age & Legal Capacity</h3>
                    <p className="font-normal">
                      The Platform is intended for users who are 18 years of age or older. By using the Platform, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a binding contract under applicable Indian law.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-2">1.2 Account Creation</h3>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>You would be required to register an account to place orders or access certain features of the Platform.</li>
                        <li>You agree to provide accurate, current, and complete information during registration and to keep this information up to date.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
                        <li>Petric reserves the right to suspend or terminate accounts that violate these Terms or are suspected of fraudulent activity.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">1.3 WhatsApp & Phone Orders</h3>
                    <p className="font-normal">
                      When placing orders via WhatsApp or phone, you confirm that you are the authorised user of the contact number provided, and you accept these Terms as a condition of your order.
                    </p>

                    <h2 id="orders-pricing" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">2. Orders, Pricing & Delivery</h2>

                    <h3 className="text-xl font-bold mt-6 mb-2">2.1 Placing an Order</h3>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>All orders are subject to availability of Products and confirmation by Petric.</li>
                        <li>An Order is confirmed only upon receipt of a confirmation message from Petric via the Platform, SMS, WhatsApp, or email.</li>
                        <li>Petric reserves the right to refuse or cancel any Order at its sole discretion - including in cases of pricing errors, suspected fraud, unavailability of stock, or delivery restrictions.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">2.2 Pricing</h3>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>All prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</li>
                        <li>Petric reserves the right to change prices at any time without prior notice. The price applicable to your Order is the price at the time of Order confirmation.</li>
                        <li>Delivery charges, if any, will be clearly communicated before Order confirmation.</li>
                        <li>Petric does not engage in deceptive or misleading pricing practices. In case of a pricing error, Petric will notify you before processing your Order.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">2.3 Delivery Promise</h3>
                    <p className="font-normal">Petric's hallmark is our in-minute delivery commitment. However, please note the following:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Delivery timelines are estimates and depend on factors including distance, traffic conditions, weather, order volume, and product availability.</li>
                        <li>The "in-minutes" promise applies to orders placed within the active Service Area and during operational hours as updated on the Platform.</li>
                        <li>Petric will not be held liable for delays caused by circumstances beyond our reasonable control, including natural disasters, government restrictions, or force majeure events.</li>
                        <li>In the event of a significant delay, Petric will proactively communicate with you and offer a resolution, which may include a refund or a goodwill gesture at Petric's discretion.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">2.4 Service Area</h3>
                    <p className="font-normal">
                      Delivery is currently available in Gurugram and selected nearby areas. The active Service Area is displayed on the Platform and may be updated without prior notice. Orders placed outside the active Service Area will not be processed.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-2">2.5 Failed Delivery</h3>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>If delivery fails due to an incorrect address, unavailability of the recipient, or refusal to accept, Petric will make reasonable attempts to contact you.</li>
                        <li>Petric is not responsible for Orders lost or undelivered due to incorrect address information provided by you.</li>
                        <li>Perishable Products (e.g., fresh or refrigerated items) may be disposed of if delivery cannot be completed after reasonable attempts.</li>
                    </ul>

                    <h2 id="payment-terms" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">3. Payment Terms</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Petric accepts payments via UPI, credit/debit cards, net banking, digital wallets, and cash on delivery (where available), as listed on the Platform.</li>
                        <li>All transactions are processed through secure, PCI-DSS compliant payment gateways. Petric does not store your full card details.</li>
                        <li>In case of a failed transaction where your bank account is debited, please contact us at <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a>. Refunds for failed transactions will be processed within 5–7 business days, subject to your bank's processing time.</li>
                        <li>You represent that you are authorised to use the payment method provided.</li>
                        <li>Petric is not responsible for any additional charges levied by your bank or payment provider.</li>
                    </ul>

                    <h2 id="cancellations-returns" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">4. Cancellations, Returns & Refunds</h2>

                    <h3 className="text-xl font-bold mt-6 mb-2">4.1 Cancellations</h3>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>You may cancel an Order before it is dispatched for delivery. Once dispatched, cancellation may not be possible.</li>
                        <li>To cancel, contact Petric immediately via WhatsApp, call, or the Platform.</li>
                        <li>Petric reserves the right to cancel an Order at any time for operational reasons, in which case a full refund will be issued.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">4.2 Refunds</h3>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Approved refunds will be processed to the original payment method within 5–7 business days.</li>
                        <li>For Cash on Delivery orders, refunds will be processed via UPI/bank transfer upon receipt of your bank details.</li>
                        <li>Delivery charges are non-refundable unless the Order was cancelled or returned due to Petric's fault.</li>
                        <li>Petric's refund policy is subject to the Consumer Protection Act, 2019, and applicable regulations.</li>
                    </ul>

                    <h2 id="product-info" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">5. Products & Product Information</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Petric makes reasonable efforts to ensure that product descriptions, images, and information are accurate. However, product packaging, formulations, and details are subject to change by manufacturers.</li>
                        <li>Products listed as 'vet-approved' or 'vet-recommended' reflect general guidance and are not a substitute for personalised veterinary advice for your specific pet.</li>
                        <li>It is your responsibility to check product ingredients, suitability for your pet's breed, age, weight, and health condition before purchase. Petric recommends consulting your veterinarian for specific dietary or medical requirements.</li>
                        <li>Petric does not accept liability for adverse reactions resulting from misuse, incorrect dosage, or use of products against veterinary advice.</li>
                        <li>For prescription medications, Petric may require a valid prescription from a registered veterinarian before fulfilment.</li>
                    </ul>

                    <h2 id="user-conduct" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">6. User Conduct & Prohibited Activities</h2>
                    <p className="font-normal">By using the Platform, you agree not to:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Provide false, misleading, or fraudulent information to Petric.</li>
                        <li>Place fraudulent orders or engage in any conduct intended to deceive Petric or other users.</li>
                        <li>Use the Platform for any unlawful purpose or in violation of applicable Indian law.</li>
                        <li>Attempt to gain unauthorised access to the Platform, its systems, or other user accounts.</li>
                        <li>Use automated bots, scrapers, or similar tools to access or harvest data from the Platform.</li>
                        <li>Post, share, or transmit any content that is defamatory, obscene, or infringes upon third-party intellectual property rights.</li>
                        <li>Abuse, harass, or threaten Petric's staff, delivery partners, or other users.</li>
                    </ul>
                    <p className="mt-4 font-normal">
                      Petric reserves the right to suspend or terminate access for users who violate these provisions without prior notice.
                    </p>

                    <h2 id="intellectual-property" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">7. Intellectual Property</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>All content on the Platform - including text, graphics, logos, images, product listings, and software - is the exclusive property of Petric or its licensors and is protected under applicable intellectual property laws.</li>
                        <li>You are granted a limited, non-exclusive, non-transferable licence to access and use the Platform solely for personal, non-commercial purposes.</li>
                        <li>You may not reproduce, distribute, modify, or create derivative works from any content on the Platform without Petric's prior written consent.</li>
                        <li>The Petric name, logo, and tagline "Pet Care in Minutes!" are trademarks of Petric. Unauthorised use is strictly prohibited.</li>
                    </ul>

                    <h2 id="privacy-protection" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">8. Privacy & Data Protection</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Petric collects and processes your personal data (name, contact number, address, order history, payment details) in accordance with our Privacy Policy available at www.petric.in/privacy-policy.</li>
                        <li>Your data is used to process orders, personalise your experience, send order updates, and (where you have opted in) send promotional communications.</li>
                        <li>Petric complies with the Information Technology Act, 2000, the IT (Amendment) Act 2008, and the Digital Personal Data Protection Act, 2023 (DPDPA), as applicable.</li>
                        <li>You have the right to access, correct, or request deletion of your personal data by contacting <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a>.</li>
                        <li>Petric does not sell your personal data to third parties. Data may be shared with trusted delivery partners and payment processors solely to fulfil your orders.</li>
                        <li>WhatsApp communications are subject to Meta's privacy policy. Petric uses WhatsApp solely for order communication and support, not for unsolicited marketing.</li>
                    </ul>

                    <h2 id="third-party" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">9. Third-Party Services & Links</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>The Platform may contain links to third-party websites or reference third-party services (e.g., payment gateways, delivery tracking tools). Petric is not responsible for the content, accuracy, or practices of third-party services.</li>
                        <li>Your use of third-party services is governed by those services' respective terms and privacy policies.</li>
                        <li>Petric does not endorse any third-party content linked from the Platform.</li>
                    </ul>

                    <h2 id="liability" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">10. Limitation of Liability</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>To the maximum extent permitted by applicable Indian law, Petric's liability to you for any claim arising out of or relating to these Terms or your use of the Platform shall not exceed the total amount paid by you for the specific Order giving rise to the claim.</li>
                        <li>Petric is not liable for: (a) indirect, incidental, or consequential damages; (b) loss of data or business; (c) damages arising from your reliance on product information without independent veterinary consultation; or (d) delays or failures caused by force majeure events.</li>
                        <li>Nothing in these Terms limits Petric's liability for death or personal injury caused by its negligence, fraud, or any liability that cannot be excluded by law under the Consumer Protection Act, 2019.</li>
                    </ul>

                    <h2 id="disclaimers" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">11. Disclaimers</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>The Platform and its services are provided on an "as is" and "as available" basis. Petric does not warrant uninterrupted, error-free, or virus-free access to the Platform.</li>
                        <li>Product availability is subject to change without notice. Listing a product on the Platform does not guarantee its availability for your specific Order.</li>
                        <li>Petric's in-minute delivery is a commitment, not an absolute guarantee. Timelines may vary based on operational conditions.</li>
                        <li>Any advice, guidance, or recommendations provided by Petric's customer support are informational and do not constitute professional veterinary advice.</li>
                    </ul>

                    <h2 id="consumer-rights" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">12. Consumer Rights (India)</h2>
                    <p className="font-normal">
                      As a consumer in India, you are protected by the Consumer Protection Act, 2019. These Terms do not limit your statutory rights. In particular:
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>You have the right to receive goods that are safe, of merchantable quality, and as described.</li>
                        <li>You are entitled to a refund or replacement for defective goods.</li>
                        <li>You may file a complaint with the Consumer Disputes Redressal Commission if your grievance is not resolved by Petric.</li>
                        <li>For e-commerce purchases, your rights are further protected under the Consumer Protection (E-Commerce) Rules, 2020.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">Petric's Grievance Officer for consumer complaints:</h3>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li><span className="font-bold">Grievance Officer:</span> Petric Team</li>
                        <li><span className="font-bold">Email:</span> <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a></li>
                        <li><span className="font-bold">Response Time:</span> Acknowledgement within 48 hours; resolution within 15 business days</li>
                    </ul>

                    <h2 id="dispute-resolution" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">13. Governing Law & Dispute Resolution</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>These Terms are governed by and construed in accordance with the laws of India.</li>
                        <li>Any dispute arising from or relating to these Terms, the Platform, or any Order shall first be attempted to be resolved amicably through Petric's customer support.</li>
                        <li>If not resolved within 30 days, disputes shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana, India.</li>
                        <li>Nothing in this clause prevents you from filing a complaint with the appropriate Consumer Disputes Redressal Forum under the Consumer Protection Act, 2019.</li>
                    </ul>

                    <h2 id="amendments" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">14. Amendments to These Terms</h2>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Petric reserves the right to update or modify these Terms at any time. Updated Terms will be posted on the Platform with a revised "Last Updated" date.</li>
                        <li>Your continued use of the Platform after the posting of updated Terms constitutes your acceptance of those changes.</li>
                        <li>We encourage you to review these Terms periodically to stay informed of any changes.</li>
                    </ul>

                    <h2 id="contact-us" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">15. Contact Us</h2>
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
                            <li><a href="#key-definitions" className="hover:text-blue-600 transition-colors">Key Definitions</a></li>
                            <li><a href="#eligibility" className="hover:text-blue-600 transition-colors">1. Eligibility & Account Registration</a></li>
                            <li><a href="#orders-pricing" className="hover:text-blue-600 transition-colors">2. Orders, Pricing & Delivery</a></li>
                            <li><a href="#payment-terms" className="hover:text-blue-600 transition-colors">3. Payment Terms</a></li>
                            <li><a href="#cancellations-returns" className="hover:text-blue-600 transition-colors">4. Cancellations, Returns & Refunds</a></li>
                            <li><a href="#product-info" className="hover:text-blue-600 transition-colors">5. Products & Product Information</a></li>
                            <li><a href="#user-conduct" className="hover:text-blue-600 transition-colors">6. User Conduct & Prohibited Activities</a></li>
                            <li><a href="#intellectual-property" className="hover:text-blue-600 transition-colors">7. Intellectual Property</a></li>
                            <li><a href="#privacy-protection" className="hover:text-blue-600 transition-colors">8. Privacy & Data Protection</a></li>
                            <li><a href="#third-party" className="hover:text-blue-600 transition-colors">9. Third-Party Services & Links</a></li>
                            <li><a href="#liability" className="hover:text-blue-600 transition-colors">10. Limitation of Liability</a></li>
                            <li><a href="#disclaimers" className="hover:text-blue-600 transition-colors">11. Disclaimers</a></li>
                            <li><a href="#consumer-rights" className="hover:text-blue-600 transition-colors">12. Consumer Rights (India)</a></li>
                            <li><a href="#dispute-resolution" className="hover:text-blue-600 transition-colors">13. Governing Law & Dispute Resolution</a></li>
                            <li><a href="#amendments" className="hover:text-blue-600 transition-colors">14. Amendments to These Terms</a></li>
                            <li><a href="#contact-us" className="hover:text-blue-600 transition-colors">15. Contact Us</a></li>
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
