
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LoginSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Button variant="ghost" asChild className="p-0 h-auto">
              <Link to="/" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Access Portal
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Choose your login type to continue
            </p>
          </div>

          <div className="space-y-4">
            <Card className="ge-hover-effect cursor-pointer">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Customer Login</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Access your repair orders, upload documentation, and track service status
                </p>
                <Button asChild className="w-full" size="lg">
                  <Link to="/customer-login">Login as Customer</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="ge-hover-effect opacity-60">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">CSM Login</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Customer Service Manager portal for handling customer requests
                </p>
                <Button 
                  disabled 
                  className="w-full" 
                  size="lg"
                  variant="secondary"
                >
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need help? <a href="/contact" className="text-primary hover:underline">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
