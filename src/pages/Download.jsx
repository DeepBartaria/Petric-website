import { useDialog } from "../context/DialogContext";
import useIsMobile from "../useIsMobile";
import { useEffect } from "react";

import Footer from "../components/Footer";

import headerbg from "../assets/Homedesktop.jpg";
import headerbgMobile from "../assets/homemobile.jpg";

import StatsBar from "../components/StatsBar";

import appstore1 from "../assets/appstore.png";
import playstore1 from "../assets/playstore.png";

export default function Download() {
    const { showDialog } = useDialog();
    const isMobile = useIsMobile();

    useEffect(() => {
        function openApp() {
            console.log("hello download!!!")
            const userAgent = navigator.userAgent || navigator.vendor;

            // Android
            if (/android/i.test(userAgent)) {
                window.location.href = "petric://home";

                setTimeout(() => {
                    window.location.href =
                        "https://play.google.com/store/apps/details?id=com.petric.app";
                }, 2000);
            }

            // iOS
            else if (/iPad|iPhone|iPod/.test(userAgent)) {
                window.location.href = "petric://home";

                setTimeout(() => {
                    window.location.href =
                        "https://apps.apple.com/us/app/petric-pet-care-app/id6752010764";
                }, 2000);
            }
        }

        openApp();
    }, []);

    return (
        <>
            <section
                className="w-full bg-white bg-cover bg-center bg-no-repeat min-h-[60vh] sm:h-[70vh] md:h-[80vh] flex flex-col md:block"
                style={{
                    backgroundImage: `url(${isMobile ? headerbgMobile : headerbg})`,
                }}
            >
                <div
                    className="mx-auto flex flex-col sm:px-8 md:px-20 md:flex-row md:items-center justify-between pt-5 md:pt-0 h-full rounded overflow-hidden"
                    style={{ minHeight: "340px" }}
                >
                    {/* Left: Text */}
                    <div className="flex flex-col md:justify-center px-4 sm:px-8 sm:py-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl balsamiq-sans-bold primary-color mb-3 sm:mb-4 leading-tight">
                            Pet Care,
                            <br />
                            <span className="text-[#FF5757]">In Minutes !!</span>
                        </h1>
                        <p className="text-black mb-4 sm:mb-6 sm:max-w-md md:max-w-lg text-sm sm:text-base md:text-lg font-medium">
                            Premium food, vital supplements & on-demand experienced vets - fast, reliable and app exclusive savings.
                        </p>
                        {!isMobile && (
                            <>
                                <p className="text-base text-black font-medium">
                                    Get Up to <span className="font-bold">50% OFF</span> on every
                                    order on Petric App.
                                </p>
                                <div className="flex justify-start items-center gap-4 mt-2">
                                    <a
                                        href="https://apps.apple.com/us/app/petric-pet-care-app/id6752010764"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={appstore1} alt="iOS" className="h-12 sm:h-10" />
                                    </a>
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.petric.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={playstore1}
                                            alt="Android"
                                            className="h-12 sm:h-10"
                                        />
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {isMobile && (
                <div
                    className=" text-black text-center px-2 py-2"
                    style={{ backgroundImage: `url(${headerbgMobile})` }}
                >
                    <p className="text-base  outfit-medium font-semibold">
                        Get Up to <span className="font-bold">50% OFF</span>
                        <br /> on every order on Petric App.
                    </p>
                    <div className="flex justify-center items-center gap-4 mt-2">
                        <a
                            href="https://apps.apple.com/us/app/petric-pet-care-app/id6752010764"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={appstore1} alt="iOS" className="h-12 sm:h-10" />
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.petric.app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={playstore1} alt="Android" className="h-12 sm:h-10" />
                        </a>
                    </div>
                </div>
            )}
            <StatsBar />
            <Footer />
        </>
    );
}
