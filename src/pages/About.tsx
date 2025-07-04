
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="p-0 h-auto">
              <Link to="/" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Global Engine
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Leading aircraft engine maintenance and repair services worldwide
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Global Engine Maintenance is a premier provider of aircraft engine maintenance, repair, and overhaul services. 
              With decades of experience and industry-leading expertise, we serve airlines, operators, and aviation companies worldwide.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              To provide exceptional aircraft engine maintenance services that ensure safety, reliability, and efficiency for our customers' operations.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Certified professionals with extensive industry experience</li>
              <li>State-of-the-art facilities and equipment</li>
              <li>Comprehensive maintenance solutions</li>
              <li>24/7 customer support</li>
              <li>Industry-leading turnaround times</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
