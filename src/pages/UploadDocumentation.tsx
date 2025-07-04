import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface DocumentItem {
  id: string;
  name: string;
  required: boolean;
  hasDocument: boolean;
  comment: string;
  file: File | null;
}

const UploadDocumentation = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: "repair-order", name: "Repair Order", required: true, hasDocument: false, comment: "", file: null },
    { id: "current-ad", name: "Current AD Status", required: true, hasDocument: false, comment: "", file: null },
    { id: "current-llp", name: "Current LLP Status", required: true, hasDocument: false, comment: "", file: null },
    { id: "non-incident", name: "Non-Incident Statement", required: true, hasDocument: false, comment: "", file: null },
    { id: "preservation", name: "Engine/Module Preservation Status", required: true, hasDocument: false, comment: "", file: null },
    { id: "technical-data", name: "Operator's Technical Data", required: true, hasDocument: false, comment: "", file: null },
    { id: "scope-work", name: "Scope of Work", required: true, hasDocument: false, comment: "", file: null },
    { id: "discrepancies", name: "Open Discrepancies", required: true, hasDocument: false, comment: "", file: null },
    { id: "tabletop", name: "Tabletop Inspection Items", required: true, hasDocument: false, comment: "", file: null },
    { id: "scrap-handling", name: "Scrap Handling Instructions", required: false, hasDocument: false, comment: "", file: null },
    { id: "service-bulletin", name: "Service Bulletin Status", required: false, hasDocument: false, comment: "", file: null },
    { id: "mini-pack", name: "Last Shop Visit Mini-Pack", required: false, hasDocument: false, comment: "", file: null },
    { id: "trend-data", name: "Trend Data", required: false, hasDocument: false, comment: "", file: null },
    { id: "lru-inventory", name: "LRU Accessories Inventory", required: false, hasDocument: false, comment: "", file: null },
    { id: "borescope", name: "Borescope Inspection Report", required: false, hasDocument: false, comment: "", file: null }
  ]);
  
  const [showSuccess, setShowSuccess] = useState(false);

  const updateDocument = (id: string, field: keyof DocumentItem, value: any) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, [field]: value } : doc
    ));
  };

  const handleFileChange = (id: string, file: File | null) => {
    updateDocument(id, 'file', file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required documents are provided
    const missingRequired = documents.filter(doc => 
      doc.required && doc.hasDocument && !doc.file
    );
    
    if (missingRequired.length > 0) {
      toast.error("Please upload all required documents that are marked as 'Yes'");
      return;
    }

    // Simulate upload
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 2000);
  };

  const mandatoryDocs = documents.filter(doc => doc.required);
  const optionalDocs = documents.filter(doc => !doc.required);

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
              <CardTitle className="text-2xl font-bold text-center">Upload Documentation</CardTitle>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Upload required documents for your repair order
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Mandatory Items */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Mandatory Items
                  </h3>
                  <div className="space-y-6">
                    {mandatoryDocs.map((doc) => (
                      <Card key={doc.id} className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">{doc.name}</Label>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">No</span>
                              <Switch
                                checked={doc.hasDocument}
                                onCheckedChange={(checked) => updateDocument(doc.id, 'hasDocument', checked)}
                              />
                              <span className="text-sm">Yes</span>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`comment-${doc.id}`} className="text-sm">Comments</Label>
                              <Textarea
                                id={`comment-${doc.id}`}
                                value={doc.comment}
                                onChange={(e) => updateDocument(doc.id, 'comment', e.target.value)}
                                placeholder="Add any comments or notes..."
                                rows={2}
                              />
                            </div>
                            
                            {doc.hasDocument && (
                              <div>
                                <Label htmlFor={`file-${doc.id}`} className="text-sm">Upload File</Label>
                                <Input
                                  id={`file-${doc.id}`}
                                  type="file"
                                  onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                  className="mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Optional Items */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Optional Items
                  </h3>
                  <div className="space-y-6">
                    {optionalDocs.map((doc) => (
                      <Card key={doc.id} className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">{doc.name}</Label>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">No</span>
                              <Switch
                                checked={doc.hasDocument}
                                onCheckedChange={(checked) => updateDocument(doc.id, 'hasDocument', checked)}
                              />
                              <span className="text-sm">Yes</span>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`comment-${doc.id}`} className="text-sm">Comments</Label>
                              <Textarea
                                id={`comment-${doc.id}`}
                                value={doc.comment}
                                onChange={(e) => updateDocument(doc.id, 'comment', e.target.value)}
                                placeholder="Add any comments or notes..."
                                rows={2}
                              />
                            </div>
                            
                            {doc.hasDocument && (
                              <div>
                                <Label htmlFor={`file-${doc.id}`} className="text-sm">Upload File</Label>
                                <Input
                                  id={`file-${doc.id}`}
                                  type="file"
                                  onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                  className="mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                >
                  Submit Documentation
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
            <DialogTitle>Documents Uploaded Successfully!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Your documents have been uploaded successfully. Our team will review them and contact you if any additional information is needed.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadDocumentation;
