import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-orange-600 text-white ">
            <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-5 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-4">WowWraps</h2>
                    <p>Download the KIYORA app today.</p>
                    <div className="flex mt-4">
                        <Link href={"/"}>
                            <Image
                                objectFit="contain"
                                src={"/"}
                                alt="App Store"
                                width={120}
                                height={40}
                            />
                        </Link>
                        <Link href={"/"}>
                            <Image
                                objectFit="contain"
                                src={"/"}
                                alt="Google Play"
                                width={120}
                                height={40}
                            />
                        </Link>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Useful Link</h4>
                    <ul>
                        {/* Replace with your actual paths */}
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/"}>About Us</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Services</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Booking</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Menu</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Contact Info</h4>
                    <div>
                        Silk St, Barbican, London
                        <br />
                        EC2Y 8DS, UK
                        <br />
                        info@example.com
                        <br />
                        800-123-456-78
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Follow us</h4>
                    <ul>
                        <li>
                            <Link href={"/"}>Facebook</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Instagram</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Linkedin</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Twitter</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Legal</h4>
                    <p>Website Made By Tanne</p>
                    <p>©2022. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
