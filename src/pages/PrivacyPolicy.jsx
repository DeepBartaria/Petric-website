import React from 'react';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <div className="mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10 text-black">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">Privacy Policy</h1>
                <div className="text-center text-xs sm:text-sm mb-6 sm:mb-8 text-gray-500">Effective Date: June 20, 2025</div>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">Welcome to PETRIC! We value your trust and are committed to protecting your privacy. This Privacy Policy describes how PETRIC Technologies Private Limited ("Petric", "we", "us", or "our") collects, uses, processes, and discloses your personal information when you use our mobile application, website www.petric.in, and all related services (collectively, the "Platform").</p>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">By accessing or using the Platform, you agree to the terms of this Privacy Policy and our Terms of Use. If you do not agree, please do not use our services.</p>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">1. Applicability</h2>
                <p className="mb-2 text-sm sm:text-base">This Privacy Policy applies to:</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Users ("you") who access our Platform to avail pet healthcare services, grooming services, pet product deliveries, or any other services.</li>
                    <li>Service providers (such as vets, groomers, clinics, and stores) listed on our Platform.</li>
                </ul>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">2. Information We Collect</h2>
                <p className="mb-2 font-semibold text-sm sm:text-base">a. Personal Information:</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Name, phone number, email address, location</li>
                    <li>Address(es) for product delivery or home visits</li>
                    <li>Pet details (e.g., pet name, age, breed, medical history)</li>
                    <li>Profile photos or documents shared voluntarily</li>
                </ul>
                <p className="mb-2 font-semibold text-sm sm:text-base">b. Transaction Information:</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Appointment booking details, service availed, order history</li>
                    <li>Payment method (we do not store card details but may receive masked card/UPI IDs via third-party gateways)</li>
                </ul>
                <p className="mb-2 font-semibold text-sm sm:text-base">c. Technical Information:</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>IP address, browser type, device type, operating system</li>
                    <li>App usage behavior, pages viewed, time spent, search terms</li>
                </ul>
                <p className="mb-2 font-semibold text-sm sm:text-base">d. Communication Data:</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Chat history with Petric or service providers</li>
                    <li>Support requests, queries, and feedback</li>
                </ul>
                <p className="mb-2 font-semibold text-sm sm:text-base">e. Location Data (if permitted):</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Real-time GPS-based location to enable vet visits or express deliveries</li>
                </ul>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Create and manage your Petric account</li>
                    <li>Enable bookings, payments, and home services</li>
                    <li>Match you with the right vets, groomers, or partners</li>
                    <li>Deliver products and services efficiently</li>
                    <li>Communicate updates, promotions, and reminders</li>
                    <li>Improve our Platform's features and user experience</li>
                    <li>Comply with applicable laws and legal obligations</li>
                </ul>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">4. Sharing Your Information</h2>
                <p className="mb-2 text-sm sm:text-base">We may share your data with:</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Vets, clinics, groomers, or stores you engage with</li>
                    <li>Third-party payment processors (e.g., Razorpay)</li>
                    <li>Logistics partners and customer support vendors</li>
                    <li>Legal or regulatory authorities, as required</li>
                    <li>Our affiliated companies for internal operations</li>
                    <li>Analytics, marketing, and infrastructure providers (in anonymized form when possible)</li>
                </ul>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">We do <span className="font-bold">not</span> sell your personal data to third parties.</p>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">5. Data Security</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">We implement industry-standard security practices, including:</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Encrypted connections (SSL)</li>
                    <li>Secure cloud hosting and firewalls</li>
                    <li>Role-based access control for employees</li>
                    <li>Regular audits and security reviews</li>
                </ul>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">However, no online transmission is fully secure, and we encourage you to keep your credentials confidential.</p>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">6. Cookies and Tracking Technologies</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">We use cookies and similar tools to:</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Recognize returning users</li>
                    <li>Store your preferences</li>
                    <li>Analyze usage patterns</li>
                    <li>Deliver personalized content and ads</li>
                </ul>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">You can control cookies through your browser settings.</p>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">7. Your Rights</h2>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Access or update your account details via the app</li>
                    <li>Request deletion of your data by writing to <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a></li>
                    <li>Opt out of promotional communications</li>
                    <li>Request a copy of your data (where applicable under law)</li>
                </ul>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">8. Retention of Data</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">We retain your personal data only as long as necessary to fulfill the purposes outlined in this Policy and to comply with legal, accounting, or reporting requirements.</p>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">10. Third-Party Links</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">Our Platform may contain links to third-party services (e.g., vet clinics, labs). Their privacy policies may differ, and we do not assume responsibility for their data practices.</p>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">11. Changes to This Policy</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">We may update this Privacy Policy periodically. If there are material changes, we will notify you via app or email. Continued use of the Platform constitutes acceptance of those changes.</p>
                <hr className="my-4 sm:my-6" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">12. Contact Us</h2>
                <p className="mb-2 text-sm sm:text-base">For questions, feedback, or grievances regarding this Privacy Policy, please contact:</p>
                <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <li>Email: <a href="mailto:team@petric.in" className="text-blue-600 underline">team@petric.in</a></li>
                    <li>Phone: <a href="tel:+918295756962">+91 8295756962</a></li>
                </ul>
                <hr className="my-4 sm:my-6" />
                <p className="text-center mt-6 sm:mt-8 text-sm sm:text-base">Thank you for trusting PETRIC. We're here to make pet care simpler and safer for every pet parent.</p>
            </div>
            <Footer />
        </>
    );
} 