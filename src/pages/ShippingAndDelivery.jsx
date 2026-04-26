import React, { useEffect } from 'react';
import Footer from '../components/Footer';

export default function ShippingAndDelivery() {
    useEffect(() => {
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
                <h1 className="text-4xl md:text-6xl text-black font-normal balsamiq-sans-bold tracking-tight mb-4">Shipping & Delivery Policy</h1>
                <p className="text-black text-lg">Last Updated: 10 March 2026</p>
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 md:py-16 flex flex-col lg:flex-row gap-12">
                
                {/* Left Content */}
                <div className="flex-1 text-black font-medium text-base md:text-lg leading-relaxed space-y-6">
                    <p>
                        Speed is in our name. But we care more about being there exactly when you need us. Whether it is 3 PM on a Tuesday or 11 PM when you have just run out of food, Petric's delivery model is built entirely around serving Gurugram's pet parents in real time.
                    </p>
                    <p>
                        This policy covers everything about how your order is processed, dispatched, and delivered. It applies to all orders placed via www.petric.in, the Petric app, WhatsApp, or phone.
                    </p>

                    <h2 id="how-delivery-works" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">1. How Petric Delivery Works</h2>
                    <p className="font-normal">Unlike traditional e-commerce or courier-based delivery, Petric operates as a hyperlocal, physical-store model. Here is what that means for you:</p>
                    
                    <div className="space-y-4 font-normal mt-4">
                        <div className="bg-[#FDE047] p-4 md:p-6 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-xl">🏪</span>
                            <span className="font-bold min-w-[220px]">Local store in Gurugram</span>
                            <span className="text-base md:text-lg">Your order is fulfilled from Petric's own local inventory and not a distant warehouse. Products are picked, packed, and handed to our delivery partner within minutes of your order being confirmed.</span>
                        </div>
                        <div className="bg-[#FDE047] p-4 md:p-6 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-xl">🛵</span>
                            <span className="font-bold min-w-[220px]">Dedicated delivery partners</span>
                            <span className="text-base md:text-lg">Orders are dispatched on two-wheelers by delivery partners assigned by the Petric team who know Gurugram's streets.</span>
                        </div>
                        <div className="bg-[#FDE047] p-4 md:p-6 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-xl">📲</span>
                            <span className="font-bold min-w-[220px]">Real-time updates</span>
                            <span className="text-base md:text-lg">You will be notified at every stage; order confirmed, being packed, out for delivery, and delivered via WhatsApp, app notification, or call.</span>
                        </div>
                        <div className="bg-[#FDE047] p-4 md:p-6 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-xl">🗣️</span>
                            <span className="font-bold min-w-[220px]">A real person you can call</span>
                            <span className="text-base md:text-lg">Unlike faceless platforms, you can WhatsApp or call us at any point during your delivery. We will give you a live update.</span>
                        </div>
                    </div>

                    <h2 id="delivery-coverage" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">2. Delivery Coverage - Where We Deliver</h2>
                    <p className="font-normal">
                        Petric currently delivers within Gurugram (Gurgaon) and select nearby localities. Delivery coverage is updated regularly as we expand.
                    </p>

                    <div className="overflow-x-auto mt-6 mb-6 border rounded-lg font-normal">
                      <table className="w-full text-sm sm:text-base text-left border-collapse">
                        <tbody>
                          <tr>
                            <td className="border p-3 font-semibold bg-gray-50 w-1/3">Current coverage</td>
                            <td className="border p-3">Gurugram (Gurgaon) active zones shown on the Platform at checkout</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-semibold bg-gray-50">Check availability</td>
                            <td className="border p-3">Enter your pin code or location at checkout or on www.petric.in</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-semibold bg-gray-50">Expanding soon</td>
                            <td className="border p-3">Follow @petric.in on Instagram or check the Platform for new area announcements</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>Orders placed from outside the active Service Area will not be confirmed. You will be notified if your pin code is not currently serviceable.</li>
                        <li>In some cases, Petric may be able to deliver to nearby areas not yet shown on the Platform (reach out to us on WhatsApp to check).</li>
                        <li>Petric does not currently offer pan-India or inter-city shipping. We are a hyperlocal service, and that is what makes us fast.</li>
                    </ul>

                    <h2 id="order-processing" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">3. Order Processing & Confirmation</h2>
                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>Orders are processed as soon as payment is confirmed or a Cash on Delivery order is accepted by our team.</li>
                        <li>You will receive an Order Confirmation via WhatsApp/app/SMS within a few minutes of placing your order.</li>
                        <li>If an item in your order is temporarily out of stock, our team will reach out immediately to offer an alternative or a partial fulfilment - you are never left wondering.</li>
                        <li>Orders placed outside operational hours will be queued and processed as soon as operations resume. Operational hours are listed on the Platform and may vary.</li>
                        <li>Petric reserves the right to decline or hold an order if the delivery address cannot be verified or if the order appears fraudulent.</li>
                    </ul>

                    <h2 id="delivery-timelines" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">4. Delivery Timelines</h2>
                    <p className="font-normal">Our core promise is in-minute delivery. Below is what you can expect depending on order type:</p>
                    
                    <div className="overflow-x-auto mt-6 mb-6 border rounded-lg font-normal">
                      <table className="w-full text-sm sm:text-base text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 font-semibold">Order Type</th>
                            <th className="border p-3 font-semibold">Typical Delivery Time</th>
                            <th className="border p-3 font-semibold">Coverage</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-3 font-medium">Standard In-Minute Order</td>
                            <td className="border p-3">Within 60 minutes of confirmation</td>
                            <td className="border p-3">Active zones in Gurugram</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Scheduled / Planned Order</td>
                            <td className="border p-3">At your chosen time slot</td>
                            <td className="border p-3">Active zones in Gurugram</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Special Sourcing Order</td>
                            <td className="border p-3">Communicated at time of order</td>
                            <td className="border p-3">Subject to product availability</td>
                          </tr>
                          <tr>
                            <td className="border p-3 font-medium">Bulk / Large-Format Items</td>
                            <td className="border p-3">Same day or next slot</td>
                            <td className="border p-3">Active zones — subject to confirmation</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="font-normal">All timelines are calculated from the point of Order Confirmation, not from payment. Delivery timelines are estimates and may vary based on real-time conditions.</p>

                    <div className="bg-[#FDE047] p-4 md:p-6 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4 font-normal">
                        <span className="text-xl">⚡</span>
                        <span className="font-bold min-w-[220px]">What 'in-minute' actually means</span>
                        <span className="text-base md:text-lg">For most standard orders within our active zones, we target delivery within 60 minutes. During peak hours or adverse conditions, this may extend and we will always communicate proactively.</span>
                    </div>

                    <h2 id="delivery-charges" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">5. Delivery Charges</h2>
                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>Petric's goal is zero delivery charges for all orders. Current delivery charge status is always displayed at checkout before you confirm your order.</li>
                        <li>A minimum order value may apply for free delivery. This threshold is shown on the Platform and may change from time to time.</li>
                        <li>Promotional free delivery offers may be available for specific campaigns, first orders, or subscription members. Details will be communicated on the Platform.</li>
                        <li>In cases where a delivery surcharge applies (e.g., late-night delivery, extended zones, or special conditions), this will always be shown transparently before you place your order and never added as a surprise.</li>
                    </ul>

                    <h2 id="tracking-your-order" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">6. Tracking Your Order</h2>
                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>Once your order is dispatched, you will receive a live delivery update via WhatsApp or app notification.</li>
                        <li>You can track your order status in real time through the Petric app under 'My Orders'.</li>
                        <li>You can also reach our team directly on WhatsApp or call at any point for a live status update - we will tell you exactly where your order is.</li>
                        <li>Petric believes in full transparency. If there is any delay, we will proactively contact you - you should never have to chase us.</li>
                    </ul>

                    <h2 id="receiving-your-order" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">7. Receiving Your Order</h2>

                    <h3 className="text-xl font-bold mt-6 mb-2">7.1 At the Door</h3>
                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>Our delivery partner will call or WhatsApp you when they are close. Please ensure your phone is reachable and someone is available to receive the order.</li>
                        <li>Please inspect your order at the time of delivery. If you notice a damaged or incorrect item, flag it immediately to the delivery partner and contact us within 24 hours with photos.</li>
                        <li>Proof of delivery may be recorded (photo of delivery at door or recipient acknowledgement).</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">7.2 Contactless Delivery</h3>
                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>If you prefer contactless delivery, let us know via WhatsApp before your order is dispatched. We will leave the order at your door and send a photo confirmation.</li>
                        <li>Petric is not responsible for orders that are tampered with or go missing after a confirmed contactless delivery.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-2">7.3 Failed Delivery Attempt</h3>
                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>If you are unavailable at the time of delivery, our delivery partner will attempt to contact you. If contact cannot be made within a reasonable time, the order may be held or returned to us.</li>
                        <li>A second delivery attempt will be made at no additional charge, subject to operational feasibility.</li>
                        <li>If delivery fails due to an incorrect address provided by you, re-delivery charges may apply and will be communicated before the second attempt.</li>
                        <li>Perishable items (fresh food, refrigerated products) that cannot be delivered after two attempts may be disposed of. Refunds in such cases will be issued as Petric Credits.</li>
                    </ul>

                    <h2 id="special-order-types" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">8. Special Order Types</h2>

                    <h3 className="text-xl font-bold mt-6 mb-2">8.1 Scheduled / Planned Orders</h3>
                    <p className="font-normal mt-4">Want something delivered at a specific time? You can place a Scheduled Order via the app or WhatsApp, and we will deliver within your preferred time window. Scheduled orders are subject to availability and operational hours.</p>

                    <h3 className="text-xl font-bold mt-8 mb-2">8.2 Special Sourcing Orders</h3>
                    <p className="font-normal mt-4">Can't find a product on the Platform? We'll source it for you. For special sourcing orders, our team will confirm estimated delivery time based on the product and supplier. This is usually communicated within a few hours of your request.</p>

                    <h3 className="text-xl font-bold mt-8 mb-2">8.3 Prescription Medicine Orders</h3>
                    <p className="font-normal mt-4">Orders containing prescription medicines require a valid prescription from a registered veterinarian to be submitted before fulfillment. Delivery timelines for prescription orders may be slightly longer to allow for verification. Please refer to our Terms & Conditions for full details.</p>

                    <h3 className="text-xl font-bold mt-8 mb-2">8.4 Bulk Orders</h3>
                    <p className="font-normal mt-4">For large or bulk orders, delivery may require advance scheduling. Please contact us via WhatsApp before placing a bulk order so we can ensure smooth fulfilment.</p>

                    <h2 id="packaging" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">9. Packaging</h2>
                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>All orders are packed with care to ensure products arrive safely and in full condition.</li>
                        <li>We use packaging that is appropriate for the product type. Dry goods, liquids, fragile items, and medicines are all handled differently.</li>
                        <li>Petric is committed to reducing unnecessary packaging waste. We use right-sized packaging and are working towards more sustainable options.</li>
                        <li>If you receive an order with damaged outer packaging, please photograph it before opening and notify us within 24 hours.</li>
                    </ul>

                    <h2 id="delays" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">10. Delays & Exceptional Circumstances</h2>
                    <p className="font-normal">While we are deeply committed to our in-minute delivery promise, certain circumstances may cause delays outside our control:</p>
                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>Severe weather conditions (heavy rain, fog, storms)</li>
                        <li>Traffic disruptions, road closures, or police restrictions in Gurugram</li>
                        <li>Public holidays or local events causing congestion</li>
                        <li>Government-mandated restrictions or curfews</li>
                        <li>Technical issues with the Platform or payment systems</li>
                        <li>Sudden surge in order volume beyond operational capacity</li>
                    </ul>
                    <p className="font-normal mt-4">In any of these cases, we will: (a) notify you proactively via WhatsApp or call; (b) give you a revised estimated delivery time; and (c) offer you the option to cancel for a full refund if the delay is significant. We will never just go silent.</p>

                    <h2 id="non-delivery" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">11. Non-Delivery & Lost Orders</h2>
                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>If your order has not arrived within a reasonable time beyond the estimated delivery window, contact us immediately on WhatsApp or call.</li>
                        <li>We will investigate with our delivery partner and provide an update within 2 hours.</li>
                        <li>If an order is confirmed as lost, we will reship immediately (subject to product availability) or issue a full refund.</li>
                        <li>Petric takes full accountability for orders confirmed as lost in transit. You will not be asked to prove loss or follow a lengthy claims process.</li>
                    </ul>

                    <h2 id="updates" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">12. Updates to This Policy</h2>
                    <ul className="list-disc pl-6 space-y-2 font-normal mt-4">
                        <li>This Shipping & Delivery Policy may be updated from time to time to reflect changes in our operations, service area, or delivery model.</li>
                        <li>Any material changes will be communicated via the Platform, app notification, or WhatsApp.</li>
                        <li>The 'Last Updated' date at the top of this document reflects the most recent revision.</li>
                        <li>Your continued use of Petric after any policy update constitutes acceptance of the revised terms.</li>
                    </ul>

                    <h2 id="contact-us" className="text-2xl md:text-3xl font-bold mt-16 mb-4 scroll-mt-32">13. Contact Us</h2>
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
                            <li><a href="#how-delivery-works" className="hover:text-blue-600 transition-colors">1. How Petric Delivery Works</a></li>
                            <li><a href="#delivery-coverage" className="hover:text-blue-600 transition-colors">2. Delivery Coverage - Where We Deliver</a></li>
                            <li><a href="#order-processing" className="hover:text-blue-600 transition-colors">3. Order Processing & Confirmation</a></li>
                            <li><a href="#delivery-timelines" className="hover:text-blue-600 transition-colors">4. Delivery Timelines</a></li>
                            <li><a href="#delivery-charges" className="hover:text-blue-600 transition-colors">5. Delivery Charges</a></li>
                            <li><a href="#tracking-your-order" className="hover:text-blue-600 transition-colors">6. Tracking Your Order</a></li>
                            <li><a href="#receiving-your-order" className="hover:text-blue-600 transition-colors">7. Receiving Your Order</a></li>
                            <li><a href="#special-order-types" className="hover:text-blue-600 transition-colors">8. Special Order Types</a></li>
                            <li><a href="#packaging" className="hover:text-blue-600 transition-colors">9. Packaging</a></li>
                            <li><a href="#delays" className="hover:text-blue-600 transition-colors">10. Delays & Exceptional Circumstances</a></li>
                            <li><a href="#non-delivery" className="hover:text-blue-600 transition-colors">11. Non-Delivery & Lost Orders</a></li>
                            <li><a href="#updates" className="hover:text-blue-600 transition-colors">12. Updates to This Policy</a></li>
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
