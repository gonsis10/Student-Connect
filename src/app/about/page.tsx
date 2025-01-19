import Navbar from "@/components/ui/Navbar";
import React from "react";

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
            <Navbar />
            <div className="max-w-4xl mx-auto pt-16">
                <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
                <p className="text-lg leading-relaxed mb-6">
                    Welcome to our Peer-to-Peer Video Chat app! This project was born during <a
                    href="https://nwhacks.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500"
                ><u><strong>nwHacks</strong></u></a>
                    ,
                    where four passionate first-year students came together with the vision of making meaningful
                    connections more accessible. We recognize how daunting it can be to reach out, which is why we
                    crafted this platform to empower students with <strong>anxiety</strong> to connect with others in a
                    safe, supportive, and uplifting environment.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    At its core, our app facilitates one-on-one video chats while offering thoughtfully curated prompts
                    designed to spark <strong>genuine conversations</strong>. Whether it’s helping someone share their
                    thoughts or finding a friend who truly understands, our mission is to create an experience that
                    turns <strong>connection</strong> into a tool for growth and comfort.
                </p>
                <p className="text-lg leading-relaxed mb-8">
                    We believe in the power of authentic conversations to bring people closer, and we’re excited to
                    share this journey with you. Thank you for being part of our mission to bridge the gap between
                    isolation and community, one conversation at a time.
                </p>
                <h2 className="text-2xl font-semibold mb-4">Built with Purpose</h2>
                <ul className="list-disc list-inside text-lg mb-6">
                    <li>Created during an intense 2-day hackathon – fueled by coffee, collaboration, and a shared
                        vision.
                    </li>
                    <li>Designed to prioritize simplicity, accessibility, and meaningful interaction.</li>
                    <li>Focused on helping students overcome social barriers with thoughtful tools and empathetic
                        design.
                    </li>
                </ul>
                <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                <p className="text-lg leading-relaxed">
                    Built with love and determination by four first-year students during <a
                    href="https://nwhacks.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500"
                ><u><strong>nwHacks</strong></u></a>, this
                    app marks just the beginning of our adventure in tech. We’re grateful for the opportunity to share
                    what we&#39;ve built and look forward to growing this idea further. Together, we aim to inspire
                    connection, understanding, and community in an increasingly disconnected world.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;