import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const RegisterRepairOrder = () => {
  const [orderType, setOrderType] = useState("");
  const [formData, setFormData] = useState({
    repairOrder: "",
    engineSerial: "",
    engineModel: "",
    customerRef: "",
    description: "",
    priority: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderType) {
      toast.error("Please select an order type");
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setOrderType("");
        setFormData({
          repairOrder: "",
          engineSerial: "",
          engineModel: "",
          customerRef: "",
          description: "",
          priority: ""
        });
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="p-0 h-auto">
              <Link to="/customer-dashboard" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Register Repair Order</CardTitle>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Submit your engine maintenance and repair requests
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Order Type Selection */}
                <div className="space-y-2">
                  <Label>Order Type *</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="repair-order">Repair Order</SelectItem>
                      <SelectItem value="engine-serial">Engine Serial Number</SelectItem>
                      <SelectItem value="maintenance">Scheduled Maintenance</SelectItem>
                      <SelectItem value="inspection">Inspection Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditional Fields Based on Order Type */}
                {orderType && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {orderType === "repair-order" && (
                        <div className="space-y-2">
                          <Label htmlFor="repairOrder">Repair Order Number *</Label>
                          <Input
                            id="repairOrder"
                            value={formData.repairOrder}
                            onChange={(e) => handleInputChange('repairOrder', e.target.value)}
                            placeholder="RO-2024-001"
                            required
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="engineSerial">Engine Serial Number *</Label>
                        <Input
                          id="engineSerial"
                          value={formData.engineSerial}
                          onChange={(e) => handleInputChange('engineSerial', e.target.value)}
                          placeholder="Enter engine serial number"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="engineModel">Engine Model</Label>
                        <Input
                          id="engineModel"
                          value={formData.engineModel}
                          onChange={(e) => handleInputChange('engineModel', e.target.value)}
                          placeholder="e.g., CFM56-7B"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="customerRef">Customer Reference</Label>
                        <Input
                          id="customerRef"
                          value={formData.customerRef}
                          onChange={(e) => handleInputChange('customerRef', e.target.value)}
                          placeholder="Your internal reference"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe the issue or maintenance requirements..."
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={!orderType}
                >
                  Submit Repair Order
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Repair Order Registered Successfully!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your repair order has been submitted successfully. You will receive a confirmation email shortly.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reference Number: RO-{Date.now()}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterRepairOrder;
