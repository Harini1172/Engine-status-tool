import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    designation: "",
    companyWebsite: "",
    email: "",
    mobile: "",
    username: "",
    password: ""
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpType, setOtpType] = useState<'email' | 'mobile'>('email');
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateUsername = () => {
    if (formData.fullName) {
      const name = formData.fullName.toLowerCase().replace(/\s+/g, '');
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const username = `${name}${randomNum}`;
      handleInputChange('username', username);
    }
  };

  const checkUsernameAvailability = () => {
    if (formData.username) {
      // Simulate API call
      setTimeout(() => {
        setUsernameAvailable(true);
        toast.success("Username is available!");
      }, 500);
    }
  };

  const verifyEmail = () => {
    if (formData.email) {
      setOtpType('email');
      setShowOtpDialog(true);
    }
  };

  const verifyMobile = () => {
    if (formData.mobile) {
      setOtpType('mobile');
      setShowOtpDialog(true);
    }
  };

  const handleOtpVerification = () => {
    if (otp === "1234") { // Mock OTP
      if (otpType === 'email') {
        setEmailVerified(true);
        toast.success("Email verified successfully!");
      } else {
        setMobileVerified(true);
        toast.success("Mobile number verified successfully!");
      }
      setShowOtpDialog(false);
      setOtp("");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const validatePassword = (password: string) => {
    const hasCapital = /[A-Z]/.test(password);
    const hasSmall = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    return hasCapital && hasSmall && hasNumber && hasSpecial && isLongEnough;
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.companyName &&
      formData.designation &&
      formData.email &&
      formData.mobile &&
      formData.username &&
      formData.password &&
      emailVerified &&
      mobileVerified &&
      usernameAvailable &&
      validatePassword(formData.password)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // Simulate account creation
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/customer-login");
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="p-0 h-auto">
              <Link to="/customer-login" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Customer Registration</CardTitle>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Create your account to access the portal
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input
                      id="companyWebsite"
                      type="url"
                      value={formData.companyWebsite}
                      onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button 
                      type="button" 
                      onClick={verifyEmail}
                      variant={emailVerified ? "secondary" : "outline"}
                      disabled={!formData.email || emailVerified}
                    >
                      {emailVerified ? "Verified" : "Verify Email"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button 
                      type="button" 
                      onClick={verifyMobile}
                      variant={mobileVerified ? "secondary" : "outline"}
                      disabled={!formData.mobile || mobileVerified}
                    >
                      {mobileVerified ? "Verified" : "Verify Mobile"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="flex-1"
                      placeholder="e.g., john1234"
                      required
                    />
                    <Button 
                      type="button" 
                      onClick={generateUsername}
                      variant="outline"
                    >
                      Generate
                    </Button>
                    <Button 
                      type="button" 
                      onClick={checkUsernameAvailability}
                      variant={usernameAvailable ? "secondary" : "outline"}
                      disabled={!formData.username}
                    >
                      {usernameAvailable ? "Available" : "Check"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>At least 1 capital letter</li>
                      <li>At least 1 small letter</li>
                      <li>At least 1 number</li>
                      <li>At least 1 special character</li>
                      <li>Minimum 8 characters</li>
                    </ul>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={!isFormValid()}
                >
                  Create Account
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* OTP Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Verify {otpType === 'email' ? 'Email' : 'Mobile Number'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter the OTP sent to your {otpType === 'email' ? 'email' : 'mobile number'}
            </p>
            <Input
              placeholder="Enter OTP (use 1234 for demo)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
            />
            <div className="flex gap-2">
              <Button onClick={handleOtpVerification} className="flex-1">
                Verify
              </Button>
              <Button variant="outline" onClick={() => setShowOtpDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Created Successfully!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Your account has been created successfully. Redirecting to login page...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerRegister;
