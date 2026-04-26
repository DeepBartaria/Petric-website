import React, { useEffect } from 'react';
import Footer from '../components/Footer';

export default function RefundCancellation() {
    useEffect(() => {
        // Only scroll to top if there is no hash in the URL
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full flex flex-col min-h-screen bg-white">
            {/* Header */}
            <div className="w-full bg-[#FFD000] py-12 px-4 text-center">
                <h1 className="text-4xl md:text-6xl text-black font-normal balsamiq-sans-bold tracking-tight mb-4">Refund & Cancellation Policy</h1>
                <p className="text-black text-lg">Last Updated: 10 March 2026</p>
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 md:py-16 flex flex-col lg:flex-row gap-12">
                
                {/* Left Content */}
                <div className="flex-1 text-black font-medium text-base md:text-lg leading-relaxed space-y-6">
                    <p>
                        We get it - sometimes plans change, orders go wrong, or things just don't arrive the way they should. We're real people, and we treat every issue the same way we'd want our own to be handled: quickly, fairly, and without the runaround.
                    </p>
                    <p>
                        This policy covers cancellations and refunds for all orders placed via www.petric.in, the Petric app, WhatsApp, or phone. Please note: Petric does not currently offer returns or exchanges. All sales are final once an order is delivered, except in the specific circumstances described below.
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4">The Quick Version</h2>
                    <div className="space-y-4">
                        <div className="bg-[#FDE047] p-4 md:p-6 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-xl">⚡</span>
                            <span className="font-bold min-w-[220px]">Cancel before dispatch</span>
                            <span className="font-normal text-base md:text-lg">Full refund. No questions asked.</span>
                        </div>
                        <div className="bg-[#FDE047] p-4 md:p-6 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-xl">📦</span>
                            <span className="font-bold min-w-[220px]">Wrong or damaged item</span>
                            <span className="font-normal text-base md:text-lg">Full refund or credit. Report within 24 hours with a photo.</span>
                        </div>
                        <div className="bg-[#FDE047] p-4 md:p-6 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-xl">🚫</span>
                            <span className="font-bold min-w-[220px]">Item out of stock</span>
                            <span className="font-normal text-base md:text-lg">Auto-refund within 5–7 business days.</span>
                        </div>
                        <div className="bg-[#FDE047] p-4 md:p-6 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-xl">🕐</span>
                            <span className="font-bold min-w-[220px]">Significant delay by Petric</span>
                            <span className="font-normal text-base md:text-lg">Refund or credit at your choice.</span>
                        </div>
                        <div className="bg-[#FDE047] p-4 md:p-6 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-xl">✅</span>
                            <span className="font-bold min-w-[220px]">Delivered correctly</span>
                            <span className="font-normal text-base md:text-lg">Final sale. No refund applicable.</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mt-12 mb-4">Definitions</h2>
                    <ul className="list-disc pl-6 space-y-2 font-normal">
                        <li><span className="font-bold">"Order"</span> - A confirmed purchase placed through any Petric channel (website, app, WhatsApp, or phone).</li>
                        <li><span className="font-bold">"Dispatched"</span> - The point at which your order has been packed and handed over to our delivery partner for fulfillment.</li>
                        <li><span className="font-bold">"Delivered"</span> - The point at which the order has been physically handed to you or left at the specified delivery location.</li>
                        <li><span className="font-bold">"Refund"</span> - A return of payment to your original payment method or as Petric Credits.</li>
                    </ul>

                    {/* Section 1 */}
                    <h2 id="cancellations" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">1. Cancellations</h2>
                    
                    <h3 className="text-xl font-bold mt-6 mb-2">1.1 Cancellation Before Dispatch - By You</h3>
                    <p className="font-normal">Changed your mind? No problem. You can cancel any order free of charge, provided it has not yet been dispatched.</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>To cancel, contact us immediately via WhatsApp, phone, or the Petric app.</li>
                        <li>Once cancellation is confirmed by our team, a full refund will be issued to your original payment method or whichever you prefer.</li>
                        <li>We aim to process pre-dispatch cancellations within 1 hour of your request during operational hours.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">1.2 Cancellation After Dispatch - By You</h3>
                    <p className="font-normal">Once an order has been dispatched, it cannot be cancelled. Our delivery partners are already on their way to you.</p>
                    <p className="mt-4 font-normal">If you no longer need the order, please refuse delivery at the door. In this case, a refund will be processed only after the order is confirmed as returned to us. Delivery charges, if any, are non-refundable in this scenario.</p>

                    <h3 className="text-xl font-bold mt-8 mb-2">1.3 Cancellation by Petric</h3>
                    <p className="font-normal">In rare cases, Petric may need to cancel your order. This can happen due to:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Product being out of stock after Order confirmation</li>
                        <li>Pricing or listing errors on the Platform</li>
                        <li>Delivery not feasible to your location at that time</li>
                        <li>Suspected fraudulent or invalid order</li>
                        <li>Force majeure events (weather, government restrictions, etc.)</li>
                    </ul>
                    <p className="mt-4 font-normal">In all such cases, you will receive a full refund to your original payment method within 5–7 business days. We will proactively notify you as soon as possible.</p>

                    {/* Section 2 */}
                    <h2 id="when-eligible" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">2. When Are You Eligible for a Refund?</h2>
                    <p className="font-normal">Since Petric does not accept returns or exchanges, refunds are issued only in the specific situations below. We believe in being completely transparent about this upfront.</p>
                    
                    <div className="overflow-x-auto mt-6 mb-6 border rounded-lg font-normal">
                      <table className="w-full text-sm sm:text-base text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 font-semibold w-1/3">Scenario</th>
                            <th className="border p-3 font-semibold w-1/4">Eligible for Refund?</th>
                            <th className="border p-3 font-semibold">How</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-3 font-medium">Order cancelled before dispatch</td>
                            <td className="border p-3 text-green-700 font-medium">Yes - Full Refund</td>
                            <td className="border p-3">To original payment method or Petric Credits</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Order cancelled by Petric (stock/error)</td>
                            <td className="border p-3 text-green-700 font-medium">Yes - Full Refund</td>
                            <td className="border p-3">To original payment method, 5–7 business days</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Wrong item delivered</td>
                            <td className="border p-3 text-green-700 font-medium">Yes - Full Refund</td>
                            <td className="border p-3">Report within 24 hrs with photo; refund or credits</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Item delivered damaged/defective</td>
                            <td className="border p-3 text-green-700 font-medium">Yes - Full Refund</td>
                            <td className="border p-3">Report within 24 hrs with photo; refund or credits</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Item expired at time of delivery</td>
                            <td className="border p-3 text-green-700 font-medium">Yes - Full Refund</td>
                            <td className="border p-3">Report within 24 hrs with photo evidence</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Significant delay caused by Petric</td>
                            <td className="border p-3 text-green-700 font-medium">Yes - Full or Partial</td>
                            <td className="border p-3">At Petric's discretion; refund or credits offered</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Order not received (confirmed lost)</td>
                            <td className="border p-3 text-green-700 font-medium">Yes - Full Refund</td>
                            <td className="border p-3">After courier confirms loss; reshipped or refunded</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Order refused at door (post-dispatch)</td>
                            <td className="border p-3 text-green-700 font-medium">Yes - Full or Partial</td>
                            <td className="border p-3">Delivery charges non-refundable</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Correct order delivered, no issue</td>
                            <td className="border p-3 text-red-600 font-medium">No</td>
                            <td className="border p-3">All sales final on correct delivery</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Changed mind after delivery</td>
                            <td className="border p-3 text-red-600 font-medium">No</td>
                            <td className="border p-3">We do not accept returns or exchanges</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Pet disliked the product</td>
                            <td className="border p-3 text-red-600 font-medium">No</td>
                            <td className="border p-3">We recommend samples for first-time purchases</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <p className="mt-4 font-normal">If you are unsure whether your situation qualifies, please reach out to us - we'll always try to find a fair solution.</p>

                    {/* Section 3 */}
                    <h2 id="how-to-raise" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">3. How to Raise a Refund Request</h2>
                    
                    <h3 className="text-xl font-bold mt-6 mb-2">3.1 For Wrong, Damaged, or Expired Items</h3>
                    <p className="font-normal">Time matters here: please reach out to us within 24 hours of delivery.</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Contact us via WhatsApp or call (numbers on the Platform) or email team@petric.in.</li>
                        <li>Share your Order ID, a brief description of the issue, and clear photos of the item received.</li>
                        <li>Our team will review and respond within 4 business hours during operational hours.</li>
                        <li>Once approved, your refund will be processed within 5–7 business days.</li>
                    </ul>
                    <p className="mt-4 font-normal">Requests raised after 24 hours of delivery will be reviewed on a case-by-case basis, but Petric cannot guarantee approval beyond this window.</p>

                    <h3 className="text-xl font-bold mt-8 mb-2">3.2 For Pre-Dispatch Cancellations</h3>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Contact us immediately via WhatsApp, phone, or app.</li>
                        <li>Once confirmed, refund is processed within 5–7 business days to your original payment method, or instantly as Petric Credits.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">3.3 For Undelivered / Lost Orders</h3>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>If your order has not arrived within the estimated delivery window, contact us with your Order ID.</li>
                        <li>We will check with our delivery partner. If the order is confirmed lost, we will reship or issue a full refund; your choice.</li>
                    </ul>

                    {/* Section 4 */}
                    <h2 id="refund-methods" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">4. Refund Methods & Timelines</h2>
                    
                    <div className="overflow-x-auto mt-6 mb-6 border rounded-lg font-normal">
                      <table className="w-full text-sm sm:text-base text-left border-collapse">
                        <tbody>
                          <tr>
                            <td className="border p-3 font-semibold bg-gray-50 w-1/3">Original payment method</td>
                            <td className="border p-3">5–7 business days (subject to your bank's processing time)</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-semibold bg-gray-50">Cash on Delivery orders</td>
                            <td className="border p-3">Refund via UPI/bank transfer within 5–7 business days (bank details required)</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-semibold bg-gray-50">Failed transaction refund</td>
                            <td className="border p-3">5–7 business days (if your bank was debited for a failed payment)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 font-normal">If your refund has not been reflected after 7 business days, please first check with your bank. If the issue persists, contact us at team@petric.in with your Order ID and we'll investigate promptly.</p>

                    {/* Section 5 */}
                    <h2 id="special-category" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">5. Special Category: Medicines & Prescription Products</h2>
                    <p className="font-normal">Pet medicines and prescription products are subject to additional guidelines:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>Prescription medicines cannot be cancelled after they have been sourced or dispensed, due to regulatory and safety requirements under the Drugs and Cosmetics Act, 1940.</li>
                        <li>Refunds for prescription medicines are available only in cases of: wrong product dispensed, damaged packaging, or expiry at time of delivery — with photo evidence.</li>
                        <li>For non-prescription OTC pet medicines, standard cancellation and refund rules apply.</li>
                    </ul>

                    {/* Section 6 */}
                    <h2 id="delays" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">6. Delays & Force Majeure</h2>
                    <p className="font-normal">Petric's in-minute delivery is a commitment we take seriously. However, certain circumstances are beyond our control; including severe weather, road closures, natural disasters, or government-imposed restrictions.</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>In such cases, Petric will proactively notify you of the delay via WhatsApp or call.</li>
                        <li>You will be given the option to wait or cancel for a full refund with a goodwill gesture.</li>
                        <li>Petric is not liable for delays directly caused by force majeure events, but we will always communicate and offer a fair resolution.</li>
                    </ul>

                    {/* Section 7 */}
                    <h2 id="statutory" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">7. Your Statutory Rights (India)</h2>
                    <p className="font-normal">This policy does not limit or override your rights as a consumer under the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020. If you feel your complaint has not been resolved fairly:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 font-normal">
                        <li>You may escalate to Petric's Grievance Officer at team@petric.in; we will acknowledge within 48 hours and aim to resolve within 15 business days.</li>
                        <li>You may also file a complaint with the Consumer Disputes Redressal Commission at the appropriate forum.</li>
                    </ul>

                    {/* Section 8 */}
                    <h2 id="contact" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">8. Contact Us</h2>
                    <p className="font-normal">We are always here for you. If you have any questions, concerns, or feedback about these Terms or any Order, please reach out:</p>
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
                            <li><a href="#cancellations" className="hover:text-blue-600 transition-colors">1. Cancellations</a></li>
                            <li><a href="#when-eligible" className="hover:text-blue-600 transition-colors">2. When Are You Eligible for a Refund?</a></li>
                            <li><a href="#how-to-raise" className="hover:text-blue-600 transition-colors">3. How to Raise a Refund Request?</a></li>
                            <li><a href="#refund-methods" className="hover:text-blue-600 transition-colors">4. Refund Methods & Timelines</a></li>
                            <li><a href="#special-category" className="hover:text-blue-600 transition-colors">5. Special Category: Medicines & Prescription Products</a></li>
                            <li><a href="#delays" className="hover:text-blue-600 transition-colors">6. Delays & Force Majeure</a></li>
                            <li><a href="#statutory" className="hover:text-blue-600 transition-colors">7. Your Statutory Rights (India)</a></li>
                            <li><a href="#contact" className="hover:text-blue-600 transition-colors">8. Contact Us</a></li>
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
